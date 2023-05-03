# Project situation

 Unfortunately I was unable to complete the project in the given time. During this. This is because while I was creating the project I faced a lot of issues and fixing these issues took too much time. Now the deadline is very near and I'll be unable to complete the project in the remaining time. I will still able to complete the project given additional time. In fact, the project is 60% completed. I just need a little more time to complete it. The issue that happened was. Django authentication and session based authentication were not working for me. This made it very difficult to authenticate and login users via Django. I took too much time trying to solve this issue. It took me upwards of 6 to 8 hours since I tried every possible solution but none of them seemed to work. At the very end I had to choose alternative methods like JWT authentication. Instead of regular session based authentication. This Alternative method took even more time since I had to. Perform and write JWT authentication code by myself. The result of this is. I have ran out of time and the deadline is near and the project is still not complete however given more time I will be able to complete the project.

The project structure is as follows

main
- #### apps          contains all the project app code, views, urls
- #### frontend      react folder contains all the javascript and component files
- #### myproject     django settings, views and urls for the app
- .env              env variables of the project
- .gitignore
- manage.py         django manage.py
- readme.md
- requirements.txt   python requirements

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


## Features yet to be implements
- user event like changes in database. database and methods are setup though
- logout feature
- fetching queries for specific user


The homepage, creating event, creating user and login should be working fine
This app uses JWT authentication via cookies which are setup in frontend and sent with every request to backend
the backend verifies the token and if the token is correct allows access to endpoints.
The JWT token and associated cookie both expire automatically after 30 minutes
