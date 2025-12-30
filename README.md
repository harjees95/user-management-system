User Management System
Secure Role-Based User Management System using Flask, MongoDB & JWT

Introduction
The User Management System is a secure backend application developed using Flask and MongoDB that allows user authentication and admin-controlled user management.
It implements JWT authentication and role-based access control to ensure data protection and system integrity.

Objectives

 1. Build a secure authentication system
 2. Implement role-based access control
 3. Provide admin user management
 4. Protect APIs using JWT
 5. Store user data securely in MongoDB

Tech Stack
1. Technology	Purpose
2. Python	Backend
3. Flask	Web Framework
4. MongoDB	Database
5. JWT	Authentication
6. Flask-CORS	CORS Handling
7. Render	Deployment
8. Postman	API Testing

Features
1. User Registration & Login
2. JWT Token Authentication
3. Admin Role Authorization
4. Activate / Deactivate Users
5. Role Assignment
6. Secure Password Hashing
7. RESTful API Structure


Setup Instruction
Backend Deployment (Render)
1️⃣ Push Backend to GitHub
Make sure your Flask backend is pushed to GitHub.

2️⃣ Create Render Web Service
Go to https://render.com
Click New → Web Service
Connect your GitHub repository
Choose your backend repo

3️⃣ Render Settings
Field =	Value
Environment =	Python
Build Command =	pip install -r requirements.txt
Start Command =	gunicorn app:app

4️⃣ Add Environment Variables in Render
Key	Value
MONGO_URI	 =  your_mongodb_uri
JWT_SECRET =	your_secret_key


5️⃣ Deploy
Click Create Web Service → Wait for deployment →
Your backend API URL will look like:  https://your-backend.onrender.com

Frontend Deployment (Vercel)
1️⃣ Prepare Frontend
Make sure your frontend is using your Render backend URL in API calls:
const BASE_URL = "https://your-backend.onrender.com";

2️⃣ Push Frontend to GitHub
Push frontend folder to a separate GitHub repo.

3️⃣ Deploy on Vercel
Go to https://vercel.com
Click Add New → Project
Import your frontend GitHub repo
Click Deploy

4️⃣ After Deployment
Your frontend URL will be:
https://your-frontend.vercel.app

🔐 CORS Setup
Make sure your Flask app allows Vercel origin:
CORS(app,
     supports_credentials=True,
     resources={r"/*": {"origins": ["https://your-frontend.vercel.app"]}})

🔄 Final Flow
User Browser
     ↓
Vercel Frontend
     ↓
Render Backend API
     ↓
MongoDB Database

Environment Variables

1. MONGO_URI = MongoDB connection string
2. JWT_SECRET =	Secret key for signing JWT tokens
3. JWT_EXPIRE	= Token expiry time (example: 1d, 12h)
4. FLASK_ENV =	Set to production on Render
5. FRONTEND_URL =	Your Vercel frontend URL
6. PORT =	Render auto assigns (don’t set manually)



API DOCUMENATION
API Documentation – User Management System

Base URL (Backend Render): https://your-backend.onrender.com

Authentication APIs
1️⃣ Register User
POST /auth/register

Creates a new user account.
Request Body
{
  "name": "Harjee",
  "email": "harjee@gmail.com",
  "password": "123456"
}

Response
{
  "msg": "User registered successfully"
}

2️⃣ Login User
POST /auth/login
Authenticates user and returns JWT token.
Request Body
{
  "email": "harjee@gmail.com",
  "password": "123456"
}

Response
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Admin APIs (Admin Token Required)
Authorization Header
Authorization: Bearer <admin_token>


3️⃣ Get All Users
GET /admin/users
Returns list of all registered users.
Response
[
  {
    "_id": "65fd...",
    "name": "Harjee",
    "email": "harjee@gmail.com",
    "role": "user",
    "status": true
  }
]

4️⃣ Activate User
PUT /admin/activate/<user_id>
Activates a user account.
Response
{
  "msg": "User activated"
}

5️⃣ Deactivate User
PUT /admin/deactivate/<user_id>
Deactivates a user account.
Response
{
  "msg": "User deactivated"
}

6️⃣ Change User Role
PUT /admin/role/<user_id>
Change user role.
Request Body
{
  "role": "admin"
}

Response
{
  "msg": "Role updated successfully"
}

Protected User API
7️⃣ Test Protected Route
GET /user/dashboard
Headers
Authorization: Bearer <user_token>

Response
{
  "msg": "Welcome User"
}


❌ Error Responses
Status	Meaning
401	Unauthorized
403	Forbidden
404	Not Found
500	Server Error
🔄 Token Expiry

JWT tokens automatically expire based on JWT_EXPIRE


Thank you
