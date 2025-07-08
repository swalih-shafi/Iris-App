from fastapi import FastAPI
from iris_app.api import router



app = FastAPI(
    title="Iris Classifier API",
    version="0.1.0",
    description="API for predicting Iris flower species"
)

app.include_router(router)