import json
from flask import Flask
from models import db, Distribution

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def seed():
    # 1. Load the JSON data
    with open('distros.json', 'r') as f:
        distros_data = json.load(f)

    with app.app_context():
        # 2. Optional: Clear the table so you don't get duplicates while testing
        # db.drop_all() 
        # db.create_all()

        for item in distros_data:
            # Check if distro already exists to avoid errors
            exists = Distribution.query.filter_by(name=item.get('name')).first()
            if not exists:
                new_distro = Distribution(
                    name=item.get('name'),
                    os_type=item.get('OS Type'),
                    based_on=item.get('Based on'),
                    origin=item.get('Origin'),
                    architecture=item.get('Architecture'),
                    desktop=item.get('Desktop'),
                    category=item.get('Category'),
                    status=item.get('Status'),
                    popularity=item.get('Popularity'),
                    description=item.get('description'),
                    price=item.get('Price (US$)'),
                    image_size=item.get('Image Size (MB)'),
                    download_url=item.get('Download'),
                    beginner_friendly=item.get('Beginner-friendly', False)
                )
                db.session.add(new_distro)
        
        # 3. Save everything to the database
        db.session.commit()
        print(f"Successfully added {len(distros_data)} distros to the database!")

if __name__ == "__main__":
    seed()