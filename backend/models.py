from datetime import datetime

import dateutil
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
    youtube_link = db.Column(db.String(500), nullable=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.column(db.String(200), nullable=False)
    content = db.column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', backref=db.backref('posts', lazy=True))

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.now())

    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    author = db.relationship('User', backref=db.backref('comments', lazy=True))
    post = db.relationship('Post', backref='comments', lazy=True)