# Endpoints

## GET /ping

- method: GET
- dev url: http://localhost:4000/ping
- prod url: https://isaias-malvar-final-project-back-202304.onrender.com/ping
- body:
- response: status: 200 OK, {
  "message": "Ping!"
  }

## POST /user/login

- method: POST
- dev url: http://localhost:4000/user/login
- prod url: https://isaias-malvar-final-project-back-202304.onrender.com/user/login
- body: {
  "username": "admin",
  "password": "admin"
  }
- response: status: 200 OK, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmOTM3NjJmMzIxNmVlMGYxZDRiOGQiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODU4Nzk0MzF9.TNTVNdFbvjSss1ICPchwYwuZ43AKL0oZKRfLbZo9jA4"
  }

## GET /micros

- method: GET
- dev url: http://localhost:4000/animals
- prod url: https://isaias-malvar-final-project-back-202304.onrender.com/animals
- body:
- Authorization: Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmOTM3NjJmMzIxNmVlMGYxZDRiOGQiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODU4Nzk0MzF9.TNTVNdFbvjSss1ICPchwYwuZ43AKL0oZKRfLbZo9jA4
- response: status: 200 OK, {
  "microstories": []
  }
