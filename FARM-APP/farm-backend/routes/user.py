from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime

from config.database import db
from models.user import User
from schemas.user import UserResponse

user_router = APIRouter(tags=["Users"])


@user_router.get("/users", response_model=list[UserResponse])
async def get_users():
    users = []

    async for user in db.users.find():
        user["id"] = str(user["_id"])
        users.append(user)

    return users


@user_router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid User ID")

    user = await db.users.find_one({"_id": ObjectId(user_id)})

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user["id"] = str(user["_id"])

    return user


@user_router.post("/users", response_model=UserResponse)
async def create_user(user: User):
    user_dict = user.model_dump()

    # Convert date to datetime for MongoDB
    user_dict["date_of_birth"] = datetime.combine(
        user.date_of_birth,
        datetime.min.time()
    )

    result = await db.users.insert_one(user_dict)

    created_user = await db.users.find_one(
        {"_id": result.inserted_id}
    )

    created_user["id"] = str(created_user["_id"])

    return created_user


@user_router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user: User):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid User ID")

    user_dict = user.model_dump()

    # Convert date to datetime for MongoDB
    user_dict["date_of_birth"] = datetime.combine(
        user.date_of_birth,
        datetime.min.time()
    )

    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": user_dict}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = await db.users.find_one(
        {"_id": ObjectId(user_id)}
    )

    updated_user["id"] = str(updated_user["_id"])

    return updated_user


@user_router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid User ID")

    result = await db.users.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": "User deleted successfully"
    }