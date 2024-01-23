# SQLalchemy import
from flask_sqlalchemy import SQLAlchemy

# Flaks cryption import 
import bcrypt

# instances 
db = SQLAlchemy()

def connect_db(app):
    """Starts from scratch and connect to database ."""
    db.app = app
    db.init_app(app)
    with app.app_context():
        db.drop_all()
        db.create_all()

class User(db.Model):
    
    """Create user"""
    __tablename__= 'users'
    username = db.Column(db.Text, primary_key=True, nullable=False, unique=True)
    # Saves password as bytes
    password = db.Column(db.LargeBinary, nullable=False)
    email = db.Column(db.Text, nullable=False) 
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)

    # class method register, cls is instance of class of user
    @classmethod
    def register(cls, username, password, first_name, last_name, email):
        """Register user w/hashed password & return user."""
        # password to bytes
        bytes = password.encode('utf8')
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(bytes, salt)
        # return instance of user w/username and hashed pwd
        return cls(username=username, password=hashed, first_name=first_name,
            last_name=last_name,
            email=email)

    @classmethod
    def authenticate(cls, username, pwd):
        """Validate that user exists & password is correct.
        Return user if valid; else return False.
        """
        # getting username
        u = User.query.filter_by(username=username).first()
        #sees if check_password_hash is true (takes input of hashed password and input password)
        if u and bcrypt.checkpw(pwd.encode('utf8'), u.password):
            # return user instance
            return u
        else:
            return False

class Feedback(db.Model):
    """Create feedback"""
    __tablename__ = 'feedback'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content= db.Column(db.Text, nullable=False)
    username= db.Column(db.Text, db.ForeignKey('users.username'))
    # Access to user model 
    user= db.Relationship('User', backref='feedback')


        
