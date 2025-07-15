from fastapi import APIRouter
from iris_app.models.request_models import IrisInput
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

@router.post("/predict")
def predict_iris(data: IrisInput):
    input_data = np.array([
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width
    ]).reshape(1, -1)

    prediction = model.predict(input_data)[0]
    species_map = {0: "setosa", 1: "versicolor", 2: "virginica"}
    species = species_map.get(prediction, "unknown")

    return {"species": species}
