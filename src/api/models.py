from flask_sqlalchemy import SQLAlchemy
from datetime import date
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'

#agregar ciudad y género
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    city = db.Column(db.String(120), nullable=True)
    gender = db.Column(db.String(15), nullable=True)
    password = db.Column(db.String(1000), unique=False, nullable=True)
    user_habit_list = db.relationship("User_habit_list", backref="user")
    habit_records = db.relationship("Habit_records", backref="user")
    google_id = db.Column(db.String, nullable=True)
    score = db.Column(db.Integer, unique=False, default=0)

    def __repr__(self):
        return '<User %r>' % self.first_name

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "city":self.city,
            "gender":self.gender,
            "score": self.score,
            "user_habit_list": [habit.serialize() for habit in self.user_habit_list],
            "habit_records": [habit.serialize() for habit in self.habit_records],

        }
    

class Habits(db.Model):
    __tablename__ = 'Habits'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1024), unique=True, nullable=False)
    description = db.Column(db.String(1024), unique=True, nullable=False)
    score = db.Column(db.Integer, unique=False)
    image= db.Column(db.String(1024), unique=True, nullable=True)
    

    def __repr__(self):
        return '<Habits %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "score": self.score,
            "image": self.image
        }
    
class Habit_records(db.Model):
    __tablename__ = 'habit_records'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=date.today)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"))   
    habits_id = db.Column(db.Integer, db.ForeignKey("Habits.id"))
    habits = db.relationship("Habits")
    

    def __repr__(self):
        return '<habit_records %r>' % self.habits_id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "user_id" : self.user_id,
            "habits_id": self.habits_id           
        }




class User_habit_list(db.Model):
    __tablename__ = 'User_habit_list'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))   
    habits_id = db.Column(db.Integer, db.ForeignKey(Habits.id))
    habits = db.relationship("Habits", backref="User_habit_list")
    

    def __repr__(self):
        return '<User_habit_list %r>' % self.habits_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "habits_id": self.habits_id,
            "habit": self.habits.serialize() if self.habits else None
             # do not serialize the password, its a security breach
        }
    

    