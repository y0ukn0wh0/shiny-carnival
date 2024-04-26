# Note It

## Installation

clone repo and `cd` into root folder

**database**

```sh
docker-compose up
```

**backend**

make sure to create a virtual environment and `cd` into server

```sh
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

**frontend**

`cd` into client
make sure to add `VITE_BASE_URI="http://localhost:8000/api/"` in .env file

```
npm install
npm run dev
```
