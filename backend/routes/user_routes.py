from flask import Blueprint, request, jsonify
from config import mongo
from middleware.auth_middleware import token_required
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
user = Blueprint("user", __name__)

@user.route("/me", methods=["GET"])
@token_required
def get_profile():
    u = mongo.db.users.find_one({"_id": ObjectId(request.user["id"])}, {"password":0})
    u["_id"] = str(u["_id"])
    return jsonify(u)

@user.route("/update", methods=["PUT"])
@token_required
def update_profile():
    data = request.get_json()
    mongo.db.users.update_one(
        {"_id": ObjectId(request.user["id"])},
        {"$set": {"fullName": data["fullName"], "email": data["email"]}}
    )
    return jsonify({"msg":"Profile updated"})

@user.route("/password", methods=["PUT"])
@token_required
def change_password():
    data = request.get_json()
    hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    mongo.db.users.update_one(
        {"_id": ObjectId(request.user["id"])},
        {"$set": {"password": hashed}}
    )
    return jsonify({"msg":"Password updated"})
