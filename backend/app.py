from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from recommend_distros import recommend_distros
from load_distros import load_distros_from_db

app = Flask(__name__)
# Enable CORS so React app (usually port 3000) can talk to this port (3100)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

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
        return jsonify({
            "username": user.username,
            "message": "Login successful"
        }), 200
    
    return jsonify({"message": "Invalid username or password"}), 401


@app.route('/quiz/submit', methods=['POST'])
def handle_submit():
    data = request.get_json()

    user_answers = data.get('answers')
    all_distros = load_distros_from_db()

    recommendations = recommend_distros(user_answers, all_distros)

    return jsonify({
                    "status": "success",
                    "recommendations": recommendations
    })

if __name__ == "__main__":
    # Set port to 3100 to match React fetch URLs
    app.run(debug=True, port=3100)