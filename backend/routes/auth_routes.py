from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from config import mongo
from models.user_model import user_schema
import jwt, datetime, os
from flask import current_app
bcrypt = Bcrypt()
auth = Blueprint("auth", __name__)

@auth.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    fullName = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    if not fullName or not email or not password:
        return jsonify({"msg": "All fields are required"}), 400

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"msg": "Email already registered"}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    user = user_schema(fullName, email, hashed)

    mongo.db.users.insert_one(user)
    return jsonify({"msg": "Signup successful. Wait for admin activation."}), 201



@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = mongo.db.users.find_one({"email": email})
    if not user:
        return jsonify({"msg": "Invalid credentials"}), 401

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    if not user["status"]:
        return jsonify({"msg": "Account not activated by admin"}), 403

    token = jwt.encode({
        "id": str(user["_id"]),
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, os.getenv("JWT_SECRET"), algorithm="HS256")

    mongo.db.users.update_one({"_id": user["_id"]}, {"$set": {"lastLogin": datetime.datetime.utcnow()}})

    return jsonify({"token": token}), 200
