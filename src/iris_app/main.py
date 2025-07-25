from fastapi import FastAPI
from iris_app.api import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse 



app = FastAPI(
    title="Iris Classifier API",
    version="0.1.0",
    description="API for predicting Iris flower species"
)

origins = [
    "http://localhost:8080",                    # for local frontend dev
    "https://iris-classify.netlify.app",        # for deployed Netlify site
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return JSONResponse(content={"message": "OK"})