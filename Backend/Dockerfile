# Use an official Python runtime as a parent image
FROM python:3.8.5

# Set environment variables:
# PYTHONDONTWRITEBYTECODE: Prevents Python from writing .pyc files to disc (equivalent to python -B option)
# PYTHONUNBUFFERED: Ensures that Python output is sent straight to the terminal (useful for logging)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application's code
COPY rateMyCourse/ .

# Collect static files
# NOTE: Customize this command based on your static files settings in Django (if applicable)
RUN python manage.py collectstatic --noinput

# Make port 8000 available for the app
EXPOSE 8000

# Define the command to run the app using Gunicorn (adjust the number of workers as necessary)
# Make sure to replace 'your_project.wsgi:application' with the correct application reference
CMD ["gunicorn", "--workers=3", "--bind", "0.0.0.0:8000", "rateMyCourse.wsgi:application"]
