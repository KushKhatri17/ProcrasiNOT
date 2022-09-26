from email.policy import default
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Member(db.Model, UserMixin):
    __tablename__ = 'member'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    lists = db.relationship('List', backref='member')
    
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

class List(db.Model):
    __tablename__ = 'list'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.String(50), nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('member.id'))
    tasks = db.relationship('Task', backref='list')
    modal_id = db.Column(db.String(32), nullable=False)
    bg_img = db.Column(db.String(7), nullable=False)
    
    def __init__(self, title, created_at, completed, owner_id, modal_id, bg_img):
        self.title = title
        self.created_at = created_at
        self.completed = completed
        self.owner_id = owner_id
        self.modal_id = modal_id
        self.bg_img = bg_img
    
class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    task_desc = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    
    def __init__(self, task_desc, completed, list_id):
        self.task_desc = task_desc
        self.completed = completed
        self.list_id = list_id

def dbinit():
    db.session.commit()