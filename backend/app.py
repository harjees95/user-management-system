from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from config import mongo
from routes.admin_routes import admin
from routes.auth_routes import auth
from routes.user_routes import user

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://your-vercel-url.vercel.app"])
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo.init_app(app)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(admin, url_prefix="/admin")
app.register_blueprint(user, url_prefix="/user")

@app.route("/")
def home():
    return {"message": "User Management API Running"}

if __name__ == "__main__":
    app.run()
