from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))

# Database
db = client["evaluation_system"]

# Collections
exams_collection = db["exams"]
students_collection = db["students"]