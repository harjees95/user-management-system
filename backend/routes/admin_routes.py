from flask import Blueprint, jsonify
from config import mongo
from middleware.admin_middleware import admin_required
from middleware.auth_middleware import token_required
from bson.objectid import ObjectId
from flask import request, jsonify

admin = Blueprint("admin", __name__)

@admin.route("/users", methods=["GET"])
@admin_required
def get_users():
    users = list(mongo.db.users.find({}, {"password":0}))
    for u in users:
        u["_id"] = str(u["_id"])
    return jsonify(users)

@admin.route("/activate/<id>", methods=["PUT"])
@admin_required
def activate_user(id):
    mongo.db.users.update_one({"_id": ObjectId(id)}, {"$set": {"status": True}})
    return jsonify({"msg":"User activated"})

@admin.route("/deactivate/<id>", methods=["PUT"])
@admin_required
def deactivate_user(id):
    mongo.db.users.update_one({"_id": ObjectId(id)}, {"$set": {"status": False}})
    return jsonify({"msg":"User deactivated"})

@admin.route("/role/<id>", methods=["PUT"])
@admin_required
def change_role(id):
    if request.user["role"] != "admin":
        return jsonify({"msg": "Unauthorized"}), 403

    new_role = request.json.get("role")

    mongo.db.users.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"role": new_role}}
    )

    return jsonify({"msg": "Role updated successfully"})
