# import re
# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity

# model = SentenceTransformer("all-MiniLM-L6-v2")


# def normalize_text(text):

#     text = text.lower()

#     text = text.replace("\n"," ")

#     text = re.sub(r"[^a-z0-9\s]","",text)

#     text = re.sub(r"\s+"," ",text)

#     return text.strip()


# def evaluate_single_answer(student_ans, solution_ans, max_marks=5):

#     student_ans = normalize_text(student_ans)

#     solution_ans = normalize_text(solution_ans)

#     emb1 = model.encode(student_ans)

#     emb2 = model.encode(solution_ans)

#     similarity = cosine_similarity([emb1],[emb2])[0][0]

#     if similarity > 0.75:

#         marks = max_marks

#     elif similarity > 0.65:

#         marks = max_marks * 0.75

#     elif similarity > 0.45:

#         marks = max_marks * 0.5

#     else:

#         marks = 0

#     return {

#         "marks": round(marks,2),

#         "similarity": round(float(similarity),3)

#     }


# def evaluate_multiple(student_q, solution_q):

#     results = {}

#     total_marks = 0

#     obtained_marks = 0

#     for q in solution_q:

#         sol = solution_q[q]

#         stu = student_q.get(q,"")

#         res = evaluate_single_answer(stu, sol)

#         results[q] = res

#         total_marks += 5

#         obtained_marks += res["marks"]

#     percentage = (obtained_marks/total_marks)*100 if total_marks>0 else 0

#     return {

#         "question_results": results,

#         "obtained_marks": obtained_marks,

#         "total_marks": total_marks,

#         "percentage": round(percentage,2)

#     }
import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")


def normalize_text(text):

    text = text.lower()

    text = text.replace("\n"," ")

    text = re.sub(r"[^a-z0-9\s]","",text)

    text = re.sub(r"\s+"," ",text)

    return text.strip()


def evaluate_single_answer(student_ans, solution_ans, max_marks=5):

    student_ans = normalize_text(student_ans)
    feedback = generate_feedback(student_ans, solution_ans)

    solution_ans = normalize_text(solution_ans)

    emb1 = model.encode(student_ans)

    emb2 = model.encode(solution_ans)

    similarity = cosine_similarity([emb1],[emb2])[0][0]

    if similarity > 0.75:

        marks = max_marks

    elif similarity > 0.65:

        marks = max_marks * 0.75

    elif similarity > 0.45:

        marks = max_marks * 0.5

    else:

        marks = 0

    return {

        "marks": round(marks,2),

        "similarity": round(float(similarity),3),
        "feedback": feedback,
        "student_answer": student_ans,
        "solution_answer": solution_ans

    }


def evaluate_multiple(student_q, solution_q):

    results = {}

    total_marks = 0

    obtained_marks = 0

    for q in solution_q:

        sol = solution_q[q]

        stu = student_q.get(q,"")

        res = evaluate_single_answer(stu, sol)

        results[q] = res

        total_marks += 5

        obtained_marks += res["marks"]

    percentage = (obtained_marks/total_marks)*100 if total_marks>0 else 0

    return {

        "question_results": results,

        "obtained_marks": obtained_marks,

        "total_marks": total_marks,

        "percentage": round(percentage,2)

    }
def generate_feedback(student_ans, solution_ans):

    student_words = set(student_ans.lower().split())
    solution_words = set(solution_ans.lower().split())

    missing = solution_words - student_words

    important_missing = list(missing)[:5]  # limit output

    feedback = []

    if important_missing:
        feedback.append("Missing concepts: " + ", ".join(important_missing))

    if len(student_words) < len(solution_words) * 0.5:
        feedback.append("Answer is too short, add more explanation")

    if not feedback:
        feedback.append("Good answer, well covered")

    return feedback


