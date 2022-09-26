from db_schema import Member, List, Task, dbinit, db
from app import app

db.init_app(app)

with app.app_context():
    db.create_all()
    dbinit()
