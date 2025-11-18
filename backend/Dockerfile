# Build stage
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    gcc \
    libpq-dev \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Prevent .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install Python dependencies
COPY Pipfile Pipfile.lock ./
RUN pip install --upgrade pip && \
    pip install pipenv && \
    pipenv install --system --deploy --ignore-pipfile

# Copy project
COPY . .

# Create staticfiles directory
RUN mkdir -p /app/staticfiles

# Expose port
EXPOSE 8000

# Wait for DB, then migrate, collect static, and run gunicorn
CMD ["bash", "-c", "echo 'Waiting for database...' && while ! pg_isready -h db -U ${DB_USER:-postgres}; do sleep 1; done && echo 'Database ready!' && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn Expense_Tracker.wsgi:application --bind 0.0.0.0:8000"]
