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

# Copy and make entrypoint executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 8000

# Run entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
