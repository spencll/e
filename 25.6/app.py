# flask imports
from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
# other files import 
from werkzeug.exceptions import Unauthorized
from models import connect_db, db, User, Feedback
from forms import UserForm, FeedbackForm, DeleteForm, LoginForm
# SQL alchemy import 
from sqlalchemy import exc

# Setting up flask/SQL alchemy
app = Flask(__name__)
# location of database
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback"

# Gets rid of annoying message
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Shows the SQL alchemy commands 
app.config["SQLALCHEMY_ECHO"] = True

# Prevents cookie tampering or something, makes it unique 
app.config["SECRET_KEY"] = "abc123"

# Allows smooth route travel 
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Runs debug tool bar
toolbar = DebugToolbarExtension(app)

# Connects flask to database
connect_db(app)

@app.route('/')
def home():
    return redirect('/register')


@app.route('/register', methods = ['GET', 'POST'])
def register():

    # accessing form to render in HTML
    form = UserForm()

    # Post route 
    if form.is_submitted() and form.validate():
        # Form entry into model 
        username = form.username.data
        password = form.password.data
        first_name= form.first_name.data
        last_name = form.last_name.data
        email= form.email.data
        new_user = User.register(username, password, first_name, last_name, email)
        db.session.add(new_user)

        # If user exists, append error and reload form
        try:
            db.session.commit()
        except exc.IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register.html', form=form)
        
        # session holds logged in user now
        session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")

        return redirect(f"/users/{new_user.username}")

    # Get route 
    return render_template('register.html', form=form)


@app.route('/login', methods=['GET','POST'])
def login():
    # accessing form to render in HTML
    form = LoginForm()
    # Post route
    if form.is_submitted() and form.validate():
        username = form.username.data
        password = form.password.data

        # Runs class method authenticate with two parameters, returns true/false
        user = User.authenticate(username, password)
        # If false, create error to show up
        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session['username'] = user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ['Invalid username/password.']

    # Get route
    return render_template('login.html', form=form)

@app.route('/secret')
def secret():
    """Example hidden page for logged-in users only."""

    if "username" not in session:
        flash("You must be logged in to view!")
        return redirect("/")

        # alternatively, can return HTTP Unauthorized status:
        #
        # from werkzeug.exceptions import Unauthorized
        # raise Unauthorized()

    else:
        return render_template("secret.html")

@app.route('/users/<username>')
def info(username):
    # makes sure user is logged in first and checks if session username = logged in username
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    # Query select user based on user primary key, access user in HTML
    user = User.query.get(username)
    return render_template('show.html', user=user)

@app.route("/users/<username>/delete", methods=["POST"])
def remove_user(username):
    """Remove user nad redirect to login."""
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("username")
    return redirect("/login")

@app.route('/users/<username>/feedback/add', methods= ['GET','POST'])
def add_feedback(username):
    # makes sure user is logged in first, checks if session username = logged in username
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    # accessing form to render in HTML
    form = FeedbackForm()
    # POST route
    if form.is_submitted() and form.validate():
        title = form.title.data
        content = form.content.data
        feedback = Feedback(title=title,content=content,username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f"/users/{feedback.username}")
    # Get route
    else:
        return render_template("new_feedback.html", form=form)

@app.route('/feedback/<int:fid>/update', methods = ['GET','POST'])
def update(fid):
    feedback = Feedback.query.get(fid)

    # makes sure user is logged in first, checks if session username = logged in username
    if "username" not in session or feedback.username!= session['username']:
        raise Unauthorized()
    # accessing form to render in HTML
    form = FeedbackForm()

    if form.is_submitted() and form.validate():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f"/users/{feedback.username}")

    return render_template("edit_feedback.html", form=form, feedback=feedback)

@app.route('/feedback/<int:fid>/delete', methods = ['POST'])
def delete(fid):
    feedback = Feedback.query.get(fid)

    # makes sure user is logged in first, checks if session username = logged in username
    if "username" not in session or feedback.username!= session['username']:
        raise Unauthorized()
        # accessing form to render in HTML
    form = DeleteForm()

    if form.is_submitted():
        db.session.delete(feedback)
        db.session.commit()
    return redirect(f"/users/{feedback.username}")

@app.route('/logout')
def logout():
    session.pop("username")
    return redirect("/login")
