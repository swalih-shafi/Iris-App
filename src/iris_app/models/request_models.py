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

class IrisInput(BaseModel):
    sepal_length: float = Field(..., ge=4.0, le=8.0, description="Sepal length in cm")
    sepal_width: float = Field(..., ge=2.0, le=5.0, description="Sepal width in cm")
    petal_length: float = Field(..., ge=1.0, le=7.0, description="Petal length in cm")
    petal_width: float = Field(..., ge=0.1, le=3.0, description="Petal width in cm")