# WTWR (What to Wear?): Back End Server

This repository contains the back end server for WTWR (What To Wear?), a weather-based clothing recommendation application. The server provides a RESTful API and database integration to support secure user authentication, management of clothing items, and associated user data for the WTWR system.

## Features

- RESTful API structure.
- User registration and authentication support.
- Endpoints for managing clothing items and user profiles.
- Database MongoDB.

## Technologies Used

Node.js-Runtime environment
Express.js-Server framework
MongoDB NoSQL-database
Mongoose ODM for schema + validation
GitHub Actions-CI testing pipeline

## API Endpoints

### Users

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /users         | Get all users     |
| GET    | /users/:userId | Get user by ID    |
| POST   | /signup        | Create a new user |

---

### CLohing Items

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| GET    | /items   | Get all items     |
| POST   | /items   | Create a new item |

---

## C.R.U.D
<img width="1920" height="1020" alt="Screenshot 2026-04-03 155638" src="https://github.com/user-attachments/assets/057e3dae-9560-498d-a348-44a8c021cff4" />

