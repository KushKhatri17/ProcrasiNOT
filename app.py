from urllib import response
from venv import create
from flask import Flask, redirect, render_template, request
from flask_login import current_user, login_required, login_user, LoginManager, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from db_schema import Member, List, Task, dbinit, db
import datetime
import string
import random

app = Flask(__name__)

ENV = 'prod'

if ENV =='dev':
    #development configs

else:
    #production configs


db.init_app(app)

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

modal_id_letters = string.ascii_letters

@login_manager.user_loader
def load_user(id):
    return Member.query.get(int(id))

resetdb = False
if resetdb:
    with app.app_context():
        db.drop_all()
        db.create_all()
        dbinit()

@app.route('/')
def index():
    users = Member.query.all()
    if current_user.is_authenticated:
        return render_template('index.html', users=users, user_id=current_user.get_id())
    return render_template('index.html', users=users)

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/verify-registration', methods=['POST'])
def verifyRegistration():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    password = request.form['password']
    
    user = Member.query.filter_by(email=email).first()
    
    # check if email is already in use
    if user:
        response = {'registered': False, 'message': 'Email is already in use'}
        return response
    else:
        new_user = Member(first_name=first_name, last_name=last_name, email=email, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        user_id = new_user.id
        response = {'registered': True, 'message': 'Registered', 'dashboard_url': 'userDashboard.html'+'?id='+str(user_id)}
        return response

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/verify-login', methods=['POST'])
def verifyLogin():
    email = request.form['email']
    password = request.form['password']
    
    user = Member.query.filter_by(email=email).first()
    
    if user:
        if check_password_hash(user.password, password):
            login_user(user, remember=True)
            response = {'logged_in': True, 'dashboard_url':'userDashboard.html'+'?id='+str(user.id)}
            return response
        else:
            response = {'logged_in': False, 'message': 'Incorrect password'}
            return response
    else:
        response = {'logged_in': False, 'message': 'No account found linked to the email'}
        return response

@app.route('/logout')

def logout():
    logout_user()
    return redirect('/')

@app.route('/login-status')
def login_status():
    if current_user.is_authenticated:
        response = {'logged_in': True, 'user_id': current_user.get_id()}
        return response
    
    response = {'logged_in': False}
    return response

@app.route('/userDashboard.html')

def userDashboard():
    user_lists = List.query.filter_by(owner_id=current_user.get_id()).all()
    return render_template('userDashboard.html', user=current_user, user_lists=user_lists)

@app.route('/newlist')

def newlist():
    return render_template('newlist.html', user_id=current_user.get_id())

@app.route('/create-new-list', methods=['POST'])
def createNewList():
    title = request.form['title']
    bg_img = request.form['bgImg']
    date = datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")
    modal_id = ''.join(random.choice(modal_id_letters) for i in range(32))
    new_list = List(title=title, created_at=date, completed=False, owner_id=current_user.get_id(), modal_id=modal_id, bg_img=bg_img)
    db.session.add(new_list)
    db.session.commit()    
    list_id = new_list.id
    response = {'created': True, 'message': 'List created', 'created_url': 'list' + '?list_id='+str(list_id)}
    return response

@app.route('/list')

def getList():
    list_id = request.args.get('list_id')
    list = List.query.filter_by(id=list_id).first()
    tasks = Task.query.filter_by(list_id=list_id).all()
    return render_template('list.html', list=list, tasks=tasks)

@app.route('/new-task', methods=['POST'])

def newTask():
    list_id = request.form['list_id']
    task_desc = request.form['task_desc']
    new_task = Task(task_desc=task_desc, completed=False, list_id=list_id)
    db.session.add(new_task)
    db.session.commit()
    response = {'task_added': True,'message': 'Task added','task_id': new_task.id}
    return response

@app.route('/comp-bttn-clicked', methods=['POST'])

def compBttnClicked():
    task_id = request.form['task_id']
    task = Task.query.filter_by(id=task_id).first()
    if not task.completed:
        task.completed = True
        db.session.commit()
        response = {'new_status': 'completed'}
        return response
    else:
        task.completed = False
        db.session.commit()
        response = {'new_status': 'not_completed'}
        return response

@app.route('/del-bttn-clicked', methods=['POST'])

def delBttnClicked():
    task_id = request.form['task_id']
    task = Task.query.filter_by(id=task_id).first()
    if task is None:
        response = {'task_id': task_id, 'deleted': False}
        return response
    
    db.session.delete(task)
    
    db.session.commit()
    response = {'task_id': task_id, 'deleted': True}
    return response
    
    
    
    
    
