#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt
echo "done installing requirements ....\n\n\n"
echo "now collecting static files..\n"
# Convert static asset files
# python manage.py collectstatic --no-input
echo "done collecting static files ...\n\n\n"
echo "now applying migrations "
# Apply any outstanding database migrations
python manage.py migrate
echo "your relations in database created "