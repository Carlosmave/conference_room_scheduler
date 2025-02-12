# How to run the applications

## Frontend

- In a terminal window, get into the "conference_room_scheduler_frontend" folder.
- Copy the "env_example" file, paste it in the same directory, and rename it as just ".env".
- Run "yarn install" to install the libraries needed for the project.
- Run "yarn dev" to start the project.

## Backend

- In a terminal window, get into the "conference_room_scheduler_backend" folder.
- Copy the "env_example" file, paste it in the same directory, and rename it as just ".env".
- Run "python -m venv venv" to create a virtual environment.
- Activate the "venv" virtual environment you just created by running "source venv/bin/activate".
- Run "pip install -r requirements.txt" to install the libraries needed for the project.
- The project comes with a sqlite database that has already many booking records in it.
- To run the tests run "python manage.py test".
- Run "python manage.py runserver" to start the project.

# Assumptions/Shortcuts

- The app does not have user authentication, as it is not required.
- Time slots are considered overlapping only if they intersect strictly (end time equal to another start time is allowed).
- Bookings can be created at any day and time in the calendar if they don't overlap with preexisting ones.
- The backend is set to use the UTC timezone.

# Bonus Features Implemented

- Backend tests.
- PUT method for the bookings API and related UI.
- DELETE method for the bookings API and related UI.
- Pagination logic for the booking results (10 bookings per page) and related UI.

# Ideas for future improvements

- Handle many conference rooms.
- Set up authentication to only allow authorized users to make bookings.
- Only allow the creation of bookings in the future, not in the past.
- Set up recurring bookings.
