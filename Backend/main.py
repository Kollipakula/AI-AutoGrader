# from fastapi import FastAPI, UploadFile, Form
# import shutil

# from fastapi.middleware.cors import CORSMiddleware

# from ocr import extract_text_from_pdf
# from evaluator import evaluate_multiple
# from question_splitter import split_questions, fallback_split

# from database import collection

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.post("/evaluate")

# def evaluate(

#     name: str = Form(...),
#     rollno: str = Form(...),

#     student_pdf: UploadFile = Form(...),
#     solution_pdf: UploadFile = Form(...)

# ):

#     with open("student.pdf","wb") as f:

#         shutil.copyfileobj(student_pdf.file,f)

#     with open("solution.pdf","wb") as f:

#         shutil.copyfileobj(solution_pdf.file,f)

#     student_text = extract_text_from_pdf("student.pdf")

#     solution_text = extract_text_from_pdf("solution.pdf")

#     print("STUDENT TEXT\n", student_text)

#     print("SOLUTION TEXT\n", solution_text)

#     student_q = split_questions(student_text)

#     solution_q = split_questions(solution_text)

#     if len(solution_q)==0:

#         solution_q = fallback_split(solution_text)

#     if len(student_q)==0:

#         student_q = fallback_split(student_text)

#     result = evaluate_multiple(student_q, solution_q)

#     collection.insert_one({

#         "name": name,

#         "rollno": rollno,

#         "result": result

#     })

#     return result


# @app.get("/results")
# def get_results():

#     data = []

#     for r in collection.find():

#         # NEW FORMAT (multi-question)
#         if "result" in r:
#             data.append({
#                 "name": r.get("name", ""),
#                 "rollno": r.get("rollno", ""),
#                 "result": r["result"]
#             })

#         # OLD FORMAT (single answer)
#         else:
#             data.append({
#                 "name": r.get("name", ""),
#                 "rollno": r.get("rollno", ""),
#                 "result": {
#                     "question_results": {
#                         "Q1": {
#                             "marks": r.get("marks", 0),
#                             "similarity": r.get("similarity", 0)
#                         }
#                     },
#                     "obtained_marks": r.get("marks", 0),
#                     "total_marks": 5,
#                     "percentage": round((r.get("marks", 0)/5)*100, 2)
#                 }
#             })

#     return data
from fastapi import FastAPI, UploadFile, Form, Body
import shutil
from fastapi.middleware.cors import CORSMiddleware
from ocr import extract_text_from_pdf
from evaluator import evaluate_multiple
from question_splitter import split_questions, fallback_split

from database import exams_collection, students_collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ===============================
# ✅ CREATE EXAM
# ===============================
@app.post("/create-exam")
def create_exam(
    exam_name: str = Form(...),
    solution_pdf: UploadFile = Form(...)
):
    with open("solution.pdf", "wb") as f:
        shutil.copyfileobj(solution_pdf.file, f)

    solution_text = extract_text_from_pdf("solution.pdf")

    solution_q = split_questions(solution_text)

    if len(solution_q) == 0:
        solution_q = fallback_split(solution_text)

    exams_collection.insert_one({
        "exam_name": exam_name,
        "solution": solution_q
    })

    return {"message": "Exam created successfully"}


# ===============================
# ✅ SUBMIT STUDENT
# ===============================
@app.post("/submit-student")
def submit_student(
    exam_name: str = Form(...),
    name: str = Form(...),
    rollno: str = Form(...),
    student_pdf: UploadFile = Form(...)
):
    exam = exams_collection.find_one({"exam_name": exam_name})

    if not exam:
        return {"error": "Exam not found"}

    with open("student.pdf", "wb") as f:
        shutil.copyfileobj(student_pdf.file, f)

    student_text = extract_text_from_pdf("student.pdf")

    student_q = split_questions(student_text)

    if len(student_q) == 0:
        student_q = fallback_split(student_text)

    result = evaluate_multiple(student_q, exam["solution"])

    students_collection.insert_one({
        "exam_name": exam_name,
        "name": name,
        "rollno": rollno,
        "result": result
    })

    return result


# ===============================
# ✅ GET ALL EXAMS
# ===============================
@app.get("/get-exams")
def get_exams():
    exams = []
    for e in exams_collection.find():
        exams.append(e["exam_name"])
    return exams


# ===============================
# ✅ GET STUDENTS BY EXAM
# ===============================
@app.get("/get-students/{exam_name}")
def get_students(exam_name: str):

    data = []

    for s in students_collection.find({"exam_name": exam_name}):

        data.append({
            "name": s["name"],
            "rollno": s["rollno"],
            "marks": s["result"]["obtained_marks"],
            "total": s["result"]["total_marks"],
            "percentage": s["result"]["percentage"],
            "result": s["result"]   # 🔥 ADD THIS LINE
        })

    return data


# ===============================
# 🔥 NEW: UPDATE MARKS (TEACHER EDIT)
# ===============================
@app.put("/update-marks")
def update_marks(data: dict = Body(...)):

    rollno = data.get("rollno")
    new_marks = float(data.get("marks"))

    student = students_collection.find_one({"rollno": rollno})

    if not student:
        return {"error": "Student not found"}

    total = student["result"]["total_marks"]

    # 🔥 Recalculate percentage
    percentage = (new_marks / total) * 100 if total > 0 else 0

    students_collection.update_one(
        {"rollno": rollno},
        {
            "$set": {
                "result.obtained_marks": round(new_marks, 2),
                "result.percentage": round(percentage, 2)
            }
        }
    )

    return {"message": "Marks updated successfully"}


# ===============================
# 🔥 NEW: GET RESULT BY ROLLNO (STUDENT VIEW)
# ===============================
@app.get("/get-result/{rollno}")
def get_result(rollno: str):

    student = students_collection.find_one({"rollno": rollno})

    if not student:
        return {"error": "Student not found"}

    return {
        "name": student["name"],
        "exam_name": student["exam_name"],
        "result": student["result"]
    }

@app.put("/update-question-marks")
def update_question_marks(data: dict = Body(...)):

    rollno = data.get("rollno")
    question = data.get("question")
    marks = float(data.get("marks"))

    student = students_collection.find_one({"rollno": rollno})

    if not student:
        return {"error": "Student not found"}

    # 🔥 Update specific question
    student["result"]["question_results"][question]["marks"] = marks

    # 🔥 Recalculate total
    total_marks = student["result"]["total_marks"]

    obtained = sum(
        q["marks"] for q in student["result"]["question_results"].values()
    )

    percentage = (obtained / total_marks) * 100 if total_marks > 0 else 0

    students_collection.update_one(
        {"rollno": rollno},
        {
            "$set": {
                "result.question_results": student["result"]["question_results"],
                "result.obtained_marks": obtained,
                "result.percentage": round(percentage, 2)
            }
        }
    )

    return {"message": "Question marks updated"}