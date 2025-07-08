from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    identifier: str
    password: str

class UserPublic(BaseModel):
    id: str
    username: str
    email: EmailStr
