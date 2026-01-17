import os
import json
from flask import Flask
from sqlalchemy import inspect
from models import db, Distribution

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


def setup_and_seed():
    with app.app_context():
        # Check if directory named instance exists
        if not os.path.exists('instance'):
            print("-> Directoy 'instance' is missing. Creating database...")
            db.create_all()
            print("✔ Database tables successfully created.")
        else:
            print("-> Info: Directory 'instance' already exists. Skipping initialization.")

        # 1. Check if table exists
        inspector = inspect(db.engine)
        if not inspector.has_table("distribution"):
            print("❌ Error: Table 'distribution' not found.")
            return

        # 2. Check if table distribution is empty
        if Distribution.query.first() is None:
            print("-> Table 'distribution' is empty. Starting Seeding...")

            if not os.path.exists('os.json'):
                print("❌ Error: os.json not found.")
                return

            with open('os.json', 'r') as f:
                distros_data = json.load(f)

            count = 0
            for item in distros_data:
                url = item.get('url', '')
                logo_name = url.strip('/').split('/')[-1]

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
                    beginner_friendly=item.get('Beginner-friendly', False),
                    logo_name=logo_name
                )
                db.session.add(new_distro)
                count += 1

            db.session.commit()
            print(f"✔ Success: {count} entries added.")
        else:
            print("-> Info: Table already filled. Skipping Seeding.")


if __name__ == "__main__":
    setup_and_seed()
    print("\nSetup finished.")