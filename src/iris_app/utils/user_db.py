from tinydb import TinyDB, Query
from pathlib import Path
from iris_app.utils.security import hash_password, verify_password
import uuid
from datetime import datetime

# Ensure path to DB file
DB_PATH = Path(__file__).resolve().parent.parent / "data" / "users.json"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

db = TinyDB(DB_PATH)
User = Query()

def create_user(username: str, email: str, password: str):
    if db.search(User.username == username):
        return {"error": "Username already exists"}

    user_id = str(uuid.uuid4())
    created_at = datetime.utcnow().isoformat()
    hashed_pw = hash_password(password)

    db.insert({
        "id": user_id,
        "username": username,
        "email": email,
        "password": hashed_pw,
        "created_at": created_at
    })

    return {
        "message": f"User created successfully at {created_at}",
        "user_id": user_id
    }   

def authenticate_user(username: str, password: str):
    user = db.get(User.username == username)
    if user and verify_password(password, user["password"]):
        return {"message": "Login successful", "user": user}
    return {"error": "Invalid credentials"}

