from tinydb import TinyDB, Query
from pathlib import Path
from datetime import datetime

HISTORY_PATH = Path(__file__).resolve().parent.parent / "data" / "history.json"
db = TinyDB(HISTORY_PATH)
User = Query()

def save_prediction(username: str, input_data: dict, prediction: str):
    entry = {
        "username": username,
        "input": input_data,
        "prediction": prediction,
        "timestamp": datetime.utcnow().isoformat()
    }
    db.insert(entry)

def get_user_history(username: str):
    return db.search(User.username == username)
