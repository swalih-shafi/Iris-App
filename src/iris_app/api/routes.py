from fastapi import APIRouter

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
