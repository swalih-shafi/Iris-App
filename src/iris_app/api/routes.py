from fastapi import APIRouter, Depends, Request
from iris_app.utils.token import decode_token
from iris_app.utils.history_db import save_prediction, get_user_history
from iris_app.models.request_models import IrisInput
from fastapi.responses import JSONResponse
import joblib
import numpy as np
import os

router = APIRouter()

@router.get("/hello")
def say_hello(name: str = "World"):
    return {"message": f"Hello {name}"}

@router.get("/sum")
def compute_sum(a: int, b: int):
    return {"result": a + b}

@router.get("/status")
def health_check():
    return {
        "status": "running",
        "message": "Iris Classifier API is healthy"
    }

@router.get("/ping")
def ping():
    return {
        "message": "pong"
    }


model_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "classifier", "xgb_model.pkl")
)
model = joblib.load(model_path)

from fastapi import Request, Header

@router.post("/predict")
def predict_iris(data: IrisInput, request: Request):
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    user_info = decode_token(token)

    input_data = np.array([
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width
    ]).reshape(1, -1)

    prediction = model.predict(input_data)[0]
    species_map = {0: "setosa", 1: "versicolor", 2: "virginica"}
    species = species_map.get(prediction, "unknown")

    if user_info:
        save_prediction(
            username=user_info["username"],
            input_data=data.dict(),
            prediction=species
        )

    return {"species": species}

@router.get("/history")
async def fetch_history(request: Request):
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    user_info = decode_token(token)

    if not user_info:
        return JSONResponse(status_code=401, content={"error": "Unauthorized"})

    history = get_user_history(user_info["username"])
    return history
