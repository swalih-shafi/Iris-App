from fastapi import APIRouter
from iris_app.models.request_models import UserCreate, UserLogin
from iris_app.utils.user_db import create_user, authenticate_user
from iris_app.utils.token import create_access_token

userRouter = APIRouter()

@userRouter.post("/register")
def register_user(user: UserCreate):
    return create_user(user.username, user.email, user.password)

@userRouter.post("/login")
def login(user: UserLogin):
    auth_result = authenticate_user(user.identifier, user.password)
    if "error" in auth_result:
        return auth_result
    token = create_access_token({"username": user.identifier})
    return {"access_token": token, "token_type": "bearer"}
