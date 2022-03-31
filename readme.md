# Django Website

## Project-
Django basics(including calculator basic app, HTML template importing, Database migration, Database fetching, Login and registration, admin panel(auto in django), contact form)

### main project is "django_website"
rest there are apps-
- geointeligence(a website)
- accounts(for login and logout)
- templates(for storing HTML pages)
- media(for saving uploaded images)
- static(for keeping static contact like img, csss and js)

### Database used-
postgres(with UI pgadmin)

### INFO-
all main fiels are inside django_website directory as it is main project
- urls.py- for all rotuing
- settings.py- for all settings

### Install
- python manage.py migrate
- python manage.py loaddata seed.json
- python manage.py createsuperuser
- python manage.py runserver

### running project-
- create a virtual env for django(I named it test)
- open cmd and goto project directory and type in cmd-
- for working on virtual env- workon test

### URLs-
- home- http://localhost:8000/
- contact- http://localhost:8000/contact
- login- http://localhost:8000/login
- register- http://localhost:8000/register

### Admin URL
- http://localhost:8000/admin/login

### Migrations-
- create a ModelClass in models.py with column description
- open cmd and goto project directory and type in cmd-
- for creating migration file- python manage.py makemigrations <app_name>
- for migrating - python manage.py migrate
