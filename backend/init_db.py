from flask import Flask
from models import db
import os

app = Flask(__name__)
# Tells SQLAlchemy where to create the file
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def setup_db():
    with app.app_context():
        # This command creates the database.db file based on your models
        db.create_all()
        print("Database file 'database.db' has been created successfully!")

if __name__ == "__main__":
    setup_db()