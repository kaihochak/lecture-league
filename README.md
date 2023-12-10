# Rate_My_Course

## How to Run with Docker
Navigate to the root folder where the `docker-compose.yml` file is located.

Run the following commands: 
- `docker-compose build`
- `docker-compose up`

Access the application at `localhost`.

To run the application without Docker:
1. Open two terminals.
2. In the first terminal, navigate to `/Backend` and run: `python3 manage.py runserver`.
3. In the other terminal, navigate to `/Frontend/rate_my_course/` run: `npm start`.

### Admin Page
For the admin page, visit `localhost:8000`.

**Credentials:**
- Username: `admin`
- Password: `admin`

**Note:** From the admin page, you can manage users, reviews, add universities, add courses, and everything else.
