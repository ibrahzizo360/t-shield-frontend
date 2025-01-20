# Authentication Frontend

## Description

This is the frontend of the authentication system that allows users to register, log in, and access their profiles. It communicates with the backend API for authentication using JWT.

## Features:

- **Login and Registration Pages** with form validation.
- **Profile Page** accessible only to authenticated users.
- **JWT token handling** via cookies.
- **Responsive Design** using Tailwind CSS.

### Setup Frontend Locally:

1. Clone the repository: `git clone https://github.com/ibrahzizo360/t-shield-frontend`
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the frontend app: `npm start`
5. Visit the frontend at `http://localhost:3000`

### API Integration:

This frontend communicates with the backend API using the following endpoints:

- `POST /users/register`: Register a new user.
- `POST /users/login`: Log in and receive a JWT token.
- `GET /users/me`: Fetch the logged-in user's profile.

### Hosted Link:

- Frontend: https://t-shield-frontend.vercel.app/

### Authentication Flow:

1. The user can register via the **/users/register** endpoint.
2. Upon successful login, the user receives a JWT token, which is stored in cookies.
3. The user can view their profile via the **/users/me** endpoint, which is protected by JWT authentication.
