from datetime import datetime

def user_schema(fullName, email, password, role="user", status=False):
    return {
        "fullName": fullName,
        "email": email,
        "password": password,
        "role": role,
        "status": status,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
        "lastLogin": None
    }
