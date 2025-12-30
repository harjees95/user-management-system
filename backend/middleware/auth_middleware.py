from flask import request, jsonify
import jwt, os
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"msg": "Token missing"}), 401

        try:
            data = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
            request.user = data
        except:
            return jsonify({"msg": "Invalid token"}), 401

        return f(*args, **kwargs)
    return decorated
