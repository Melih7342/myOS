import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Distribution, Post, Comment
from recommend_distros import recommend_distros
from load_distros import load_distros_from_db
from dotenv import load_dotenv
from googleapiclient.discovery import build
from datetime import timedelta, datetime, timezone
import secrets

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', secrets.token_hex(32))
# Enable CORS so React app (usually port 3000) can talk to this port (3100)
CORS(
        app,
        origins=["http://localhost:8080", "http://127.0.0.1:8080"],  # Add both common variants
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],  # Explicitly allow headers
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]  # Specify allowed methods
    )

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)
db.init_app(app)

YT_KEY = os.getenv("YOUTUBE_API_KEY")

def get_yt_link(distro_name):
    # 1. Look for the distro in the DB to check the 'youtube_link' column
    distro_obj = Distribution.query.filter_by(name=distro_name).first()
    
    if distro_obj and distro_obj.youtube_link:
        return distro_obj.youtube_link

    # 2. Not in DB? Search in YouTube
    try:
        youtube = build("youtube", "v3", developerKey=YT_KEY)
        search_query = f"{distro_name} installation tutorial"
        
        request = youtube.search().list(
            q=search_query,
            part="snippet",
            maxResults=1,
            type="video"
        )
        response = request.execute()

        if response['items']:
            video_id = response['items'][0]['id']['videoId']
            link = f"https://www.youtube.com/watch?v={video_id}"
            
            # 3. Save to DB if the object exists
            if distro_obj:
                distro_obj.youtube_link = link
                db.session.commit()
            return link
            
    except Exception as e:
        print(f"YouTube API Error for {distro_name}: {e}")
    
    return "https://www.youtube.com"

# Register route
@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)
    
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"username": username, "message": "User created successfully"}), 201

# Login route
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    # Check if user exists and password is correct
    if user and check_password_hash(user.password, password):
        session.clear()
        session["user_id"] = user.id
        session["username"] = user.username

        return jsonify({
            "username": user.username,
            "message": "Login successful"
        }), 200
    
    return jsonify({"message": "Invalid username or password"}), 401


@app.route('/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"}), 200

@app.route('/distros', methods=['GET'])
def get_all_distros():
    try:
        # Fetch all distros from the DB
        distros = Distribution.query.all()
        
        # Convert objects to a list of dictionaries
        output = []
        for d in distros:
            output.append({
                "id": d.id,
                "name": d.name,
                "os_type": d.os_type,
                "based_on": d.based_on,
                "desktop": d.desktop,
                "category": d.category,
                "description": d.description,
                "price": d.price,
                "beginner_friendly": d.beginner_friendly,
                "logo_name": d.logo_name,
                "youtube_link": d.youtube_link
            })
            
        return jsonify(output), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/quiz/submit', methods=['POST'])
def handle_submit():
    data = request.get_json()

    user_answers = data.get('answers')
    all_distros = load_distros_from_db()

    recommendations = recommend_distros(user_answers, all_distros)
    
    # Add YouTube links to each recommendation
    for distro in recommendations:
        distro['install_video'] = get_yt_link(distro['name'])
    
    return jsonify({
                    "status": "success",
                    "recommendations": recommendations
    })

@app.route('/auth/check', methods=['GET'])
def check_auth():
    if "user_id" in session:
        user = User.query.get(session["user_id"])
        if user:
            return jsonify({
                "loggedIn": True,
                "user": {
                    "username": user.username,
                    "id": user.id,
                    "favorite_os_name": user.favorite_distro.name if user.favorite_distro else None,
                    "favorite_distro_id": user.favorite_distro_id
                }
            }), 200

    return jsonify({
        "loggedIn": False,
        "user": None
    }), 200


@app.route('/api/user/favorite', methods=['POST'])
def toggle_favorite():
    if "user_id" not in session:
        return jsonify({"message": "Not authenticated"}), 401

    data = request.get_json()
    distro_id = data.get('distro_id')
    user = User.query.get(session["user_id"])

    if user.favorite_distro_id == distro_id:
        user.favorite_distro_id = None
        status = "removed"
    else:
        user.favorite_distro_id = distro_id
        status = "added"

    db.session.commit()
    return jsonify({"status": status})


@app.route('/auth/delete/<username>', methods=['DELETE'])
def delete_account(username):
    session.clear()
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting account"}), 500

# Get all posts
@app.route('/forum/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    output = []
    for post in posts:
        output.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "author": post.author.username,
            "date": post.timestamp.strftime("%Y-%m-%d %H:%M")
        })
    return jsonify(output)


# Create new post
@app.route('/forum/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    username = data.get('username')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    new_post = Post(
        title=data.get('title'),
        content=data.get('content'),
        user_id=user.id
    )

    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created!", "post_id": new_post.id}), 201


@app.route('/forum/users/<username>/posts', methods=['GET'])
def get_user_posts(username):
    user = User.query.filter_by(username=username).first_or_404()

    user_posts = Post.query.filter_by(user_id=user.id).order_by(Post.timestamp.desc()).all()

    output = []
    for post in user_posts:
        output.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "date": post.timestamp.strftime("%Y-%m-%d %H:%M"),
            "comment_count": len(post.comments)
        })

    return jsonify(output)

# Post a comment under a post
@app.route('/forum/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()

    if not user:
        return jsonify({"message": "Login required"}), 401

    new_comment = Comment(
        content=data.get('content'),
        post_id=post_id,
        user_id=user.id
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify({"message": "Reply sent!"}), 201


# Get all comments to a post
@app.route('/forum/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    post = Post.query.get_or_404(post_id)

    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.timestamp.asc()).all()

    output = []
    for comment in comments:
        output.append({
            "id": comment.id,
            "content": comment.content,
            "author": comment.author.username,
            "date": comment.timestamp.strftime("%Y-%m-%d %H:%M")
        })

    return jsonify({
        "post_title": post.title,
        "comments": output
    })

# Update post
@app.route('/forum/posts/<int:post_id>', methods=['PUT'])
def edit_post(post_id):
    data = request.get_json()
    post = Post.query.get_or_404(post_id)

    # Ownership Check
    if post.author.username != data.get('username'):
        return jsonify({"message": "You can only edit your own posts!"}), 403

    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()

    return jsonify({"message": "Post updated successfully"})

# Delete post
@app.route('/forum/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    data = request.get_json()
    post = Post.query.get_or_404(post_id)

    if post.author.username != data.get('username'):
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"})

# Delete comment
@app.route('/forum/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    data = request.get_json()
    comment = Comment.query.get_or_404(comment_id)

    if comment.author.username != data.get('username'):
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment removed"})


# Update comment
@app.route('/forum/comments/<int:comment_id>', methods=['PUT'])
def edit_comment(comment_id):
    data = request.get_json()
    comment = Comment.query.get_or_404(comment_id)

    if comment.author.username != data.get('username'):
        return jsonify({"message": "You can only edit your own comments!"}), 403

    new_content = data.get('content')
    if not new_content:
        return jsonify({"message": "Content cannot be empty"}), 400

    comment.content = new_content
    comment.edited_at = datetime.now(timezone.utc)
    db.session.commit()

    return jsonify({
        "message": "Comment updated successfully",
        "content": comment.content,
        "date": comment.edited_at.strftime("%Y-%m-%d %H:%M")
    }), 200

@app.route('/distros/<int:distro_id>', methods=['GET'])
def get_distro_by_id(distro_id):
    try:
        distro = Distribution.query.get_or_404(distro_id)
        return jsonify({
            "id": distro.id,
            "name": distro.name,
            "os_type": distro.os_type,
            "based_on": distro.based_on,
            "desktop": distro.desktop,
            "category": distro.category,
            "description": distro.description,
            "price": distro.price,
            "logo_name": distro.logo_name,
            "beginner_friendly": distro.beginner_friendly,
            "youtube_link": distro.youtube_link
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Set port to 3100 to match React fetch URLs
    app.run(debug=True, port=3100)