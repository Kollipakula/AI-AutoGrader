# from pymongo import MongoClient

# # 🔥 Replace with your actual Atlas connection string
# # client = MongoClient("mongodb://localhost:27017")

# db = client["evaluation_db"]
# collection = db["results"]


from pymongo import MongoClient

# 🔥 Replace with your MongoDB Atlas connection string
client = MongoClient("mongodb+srv://test-1:123@cluster0.fuwlpob.mongodb.net/")

db = client["evaluation_system"]

exams_collection = db["exams"]
students_collection = db["students"]
