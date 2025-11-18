#!/bin/bash
set -e

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! pg_isready -h db -U ${DB_USER:-postgres}; do
  sleep 1
done

echo "Database is ready!"

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start gunicorn
exec gunicorn Expense_Tracker.wsgi:application --bind 0.0.0.0:8000
