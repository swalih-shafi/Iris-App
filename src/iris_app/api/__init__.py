from fastapi import APIRouter
from iris_app.api.routes import router as general_router
from iris_app.api.user_routes import userRouter

router = APIRouter()
router.include_router(general_router, tags=["General"])
router.include_router(userRouter, prefix="/auth", tags=["User Auth"])
