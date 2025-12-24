from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Distribution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    os_type = db.Column(db.String(50))
    based_on = db.Column(db.String(100))
    origin = db.Column(db.String(50))
    architecture = db.Column(db.String(100))
    desktop = db.Column(db.String(100))
    category = db.Column(db.String(100))
    status = db.Column(db.String(50))
    popularity = db.Column(db.String(50))
    description = db.Column(db.Text)
    price = db.Column(db.String(50))
    image_size = db.Column(db.String(50))
    download_url = db.Column(db.String(255))
    beginner_friendly = db.Column(db.Boolean, default=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)