# import re


# def split_questions(text):

#     pattern = r"(Q\d+|[0-9]+\.)"

#     parts = re.split(pattern, text)

#     questions = {}

#     for i in range(1, len(parts), 2):

#         q = parts[i].strip()

#         ans = parts[i+1].strip()

#         questions[q] = ans

#     return questions


# def fallback_split(text):

#     paragraphs = text.split("\n\n")

#     questions = {}

#     for i, p in enumerate(paragraphs):

#         if len(p.strip()) > 20:

#             questions[f"Q{i+1}"] = p

#     return questions

import re

def split_questions(text):

    lines = text.split("\n")

    questions = {}
    current_q = None

    for line in lines:

        line = line.strip()

        # detect Q1, Q2 at start ONLY
        match = re.match(r"^[Qq][\s]*[0-9]", line, re.IGNORECASE)

        if match:
            current_q = match.group().replace(" ", "").upper()
            questions[current_q] = ""

        elif current_q:
            questions[current_q] += " " + line

    return questions


def fallback_split(text):

    paragraphs = text.split("\n\n")

    questions = {}

    for i, p in enumerate(paragraphs):
        if len(p.strip()) > 30:
            questions[f"Q{i+1}"] = p.strip()

    return questions