from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional, Dict
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Nigerian States for validation
NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 
    'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 
    'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
]

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class EmailSignupCreate(BaseModel):
    nickname: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    state: str
    utm_source: Optional[str] = None
    utm_campaign: Optional[str] = None

    @validator('nickname')
    def validate_nickname(cls, v):
        # Remove any potentially harmful characters
        v = re.sub(r'[<>\"\'&]', '', v.strip())
        if len(v) < 2:
            raise ValueError('Nickname must be at least 2 characters long')
        return v

    @validator('state')
    def validate_state(cls, v):
        if v not in NIGERIAN_STATES:
            raise ValueError('Invalid Nigerian state')
        return v

class EmailSignupResponse(BaseModel):
    id: str
    nickname: str
    email: str
    state: str
    createdAt: datetime
    utm_source: Optional[str] = None
    utm_campaign: Optional[str] = None

class Product(BaseModel):
    id: str
    name: str
    variant: str
    color: str
    features: List[str]
    description: str

class StoreLocation(BaseModel):
    state: str
    stores: List[str]

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Fire Condom API Endpoints

@api_router.post("/signup")
async def create_signup(signup_data: EmailSignupCreate):
    try:
        # Check if email already exists
        existing_signup = await db.email_signups.find_one({"email": signup_data.email})
        if existing_signup:
            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "message": "Email already registered for Fire Club updates"
                }
            )
        
        # Create signup document
        signup_dict = signup_data.dict()
        signup_dict['id'] = str(uuid.uuid4())
        signup_dict['createdAt'] = datetime.utcnow()
        
        # Insert into database
        result = await db.email_signups.insert_one(signup_dict)
        
        if result.inserted_id:
            # Return success response
            response_data = EmailSignupResponse(**signup_dict)
            return {
                "success": True,
                "message": "Welcome to the Fire Club! 🔥 You'll receive exclusive tips and offers soon.",
                "data": response_data.dict()
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save signup")
            
    except ValueError as e:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": str(e)
            }
        )
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Something went wrong. Please try again."
            }
        )

@api_router.get("/signups")
async def get_signups():
    try:
        signups = await db.email_signups.find().sort("createdAt", -1).to_list(1000)
        
        # Convert ObjectId to string for each signup
        for signup in signups:
            signup['_id'] = str(signup['_id'])
            
        return {
            "success": True,
            "message": "Signups retrieved successfully",
            "data": signups
        }
    except Exception as e:
        logger.error(f"Get signups error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Failed to retrieve signups"
            }
        )

@api_router.get("/products")
async def get_products():
    """Get Fire Condom product information"""
    try:
        products = [
            {
                "id": "xtra",
                "name": "Fire Xtra",
                "variant": "Longer Lasting Pleasure",
                "color": "blue",
                "features": [
                    "Super-dotted texture",
                    "Flavored for enhanced taste", 
                    "Extra time lubricant",
                    "3 condoms per pack"
                ],
                "description": "Designed for extended pleasure with super-dotted texture and extra time lubricant."
            },
            {
                "id": "xtacy", 
                "name": "Fire Xtacy",
                "variant": "Greater Stimulation",
                "color": "green",
                "features": [
                    "Contoured design",
                    "Flavored for pleasure",
                    "Ribbed & studded", 
                    "3 condoms per pack"
                ],
                "description": "Contoured design with ribbed and studded texture for maximum stimulation."
            },
            {
                "id": "xotica",
                "name": "Fire Xotica", 
                "variant": "More Intensity",
                "color": "red",
                "features": [
                    "Contoured design",
                    "Strawberry flavored",
                    "Ribbed texture",
                    "Super dotted"
                ],
                "description": "Strawberry flavored with super dotted and ribbed texture for intense pleasure."
            }
        ]
        
        return {
            "success": True,
            "message": "Products retrieved successfully",
            "data": products
        }
    except Exception as e:
        logger.error(f"Get products error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Failed to retrieve products"
            }
        )

@api_router.get("/stores")
async def get_all_stores():
    """Get all store locations by state"""
    try:
        stores_data = {
            'Lagos': [
                'Shoprite Ikeja',
                'Justrite Pharmacy VI', 
                'Mega Plaza Pharmacy',
                'HealthPlus Pharmacy',
                'All major pharmacies'
            ],
            'Abuja': [
                'Sahad Stores',
                'Next Cash & Carry',
                'Justrite Pharmacy',
                'All convenience stores'
            ],
            'Port Harcourt': [
                'Shop N Save',
                'Major pharmacies',
                'Convenience stores'
            ],
            'Kano': [
                'Selected pharmacies',
                'Major retail outlets'
            ],
            'Ibadan': [
                'Major pharmacies',
                'Convenience stores'
            ]
        }
        
        return {
            "success": True,
            "message": "Store locations retrieved successfully",
            "data": stores_data
        }
    except Exception as e:
        logger.error(f"Get stores error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Failed to retrieve store locations"
            }
        )

@api_router.get("/stores/{state}")
async def get_stores_by_state(state: str):
    """Get store locations for a specific state"""
    try:
        stores_data = {
            'Lagos': [
                'Shoprite Ikeja',
                'Justrite Pharmacy VI',
                'Mega Plaza Pharmacy', 
                'HealthPlus Pharmacy',
                'All major pharmacies'
            ],
            'Abuja': [
                'Sahad Stores',
                'Next Cash & Carry',
                'Justrite Pharmacy',
                'All convenience stores'
            ],
            'Port Harcourt': [
                'Shop N Save',
                'Major pharmacies',
                'Convenience stores'
            ],
            'Kano': [
                'Selected pharmacies',
                'Major retail outlets'
            ],
            'Ibadan': [
                'Major pharmacies', 
                'Convenience stores'
            ]
        }
        
        state_stores = stores_data.get(state)
        if not state_stores:
            return {
                "success": True,
                "message": f"No specific stores listed for {state}, but Fire Condoms are available at major pharmacies nationwide",
                "data": ["Available at major pharmacies and convenience stores"]
            }
            
        return {
            "success": True,
            "message": f"Store locations for {state} retrieved successfully",
            "data": state_stores
        }
    except Exception as e:
        logger.error(f"Get stores by state error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Failed to retrieve store locations"
            }
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
