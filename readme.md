# Structure
This Application is like a social media App where user can create and update new events.

The project structure is as follows

main
- #### apps -         contains all the project app code, views, urls
- #### frontend -     react folder contains all the javascript and component files
- #### myproject -    django settings, views and urls for the app
- .env -             env variables of the project
- .gitignore
- manage.py -        django manage.py
- readme.md
- requirements.txt -  python requirements

# Setup and installation
- install python 3.10
- install node 16.4 LTS
- install MySQL on your machine, let it run on default port 3306
- make changes to .env file as neccessary per your database name, password, schema etc.
- To run the app first clone this github respository in an empty directory using 'git clone https://github.com/CoderSleek/djint.git'
- Go to the myproject folder containing requirements.txt then install all python requirements via 'pip install -r requirements.txt'
- Then make migrations using 'python manage.py makemigrations', 'python manage.py makemigrations apps', 'python manage.py migrate'
- Run django app using 'python manage.py runserver' it will run on port 8000
- Go to fronted directory and install all the dependencies via 'node install'
- Run react app in dev mode using 'npm start' it will start on port 3000

# Features

In the app the user can login or signup via a username and password, Validation of data and error handling is performed in backend to ensure correctness of App. It uses JWT for authentication and maintain integrity of data. The user can log in and create new posts, view other people posts and like the events. All data is stored in database for persistence.


## Features yet to be implements
- user event like changes in database. database and methods are setup though
- logout feature
- fetching queries for specific user


This app uses JWT authentication via cookies which are setup in frontend and sent with every request to backend
the backend verifies the token and if the token is correct allows access to endpoints.
The JWT token and associated cookie both expire automatically after 30 minutes
