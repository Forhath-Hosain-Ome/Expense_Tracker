# Use official Python image
FROM python:3.12-slim

# Set work directory
WORKDIR /app

# Prevent .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Run server
CMD ["gunicorn", "Expense_Tracker.wsgi:application", "--bind", "0.0.0.0:8000"]
