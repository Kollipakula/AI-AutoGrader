# import cv2
# import pytesseract
# from PIL import Image

# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# def preprocess_image(image_path):
#     img = cv2.imread(image_path)
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)[1]
#     return thresh

# def extract_text_from_image(image_path):
#     processed = preprocess_image(image_path)
#     temp_path = "temp.png"
#     cv2.imwrite(temp_path, processed)
#     text = pytesseract.image_to_string(Image.open(temp_path))
#     return text

import cv2
import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os

# ✅ Tesseract path (VERY IMPORTANT)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# ✅ Poppler path
POPPLER_PATH = r"C:\poppler\poppler-25.12.0\Library\bin"


def preprocess_image(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)[1]
    return thresh


def extract_text_from_image(image_path):

    img = cv2.imread(image_path)
    processed = preprocess_image(img)

    temp_path = "temp.png"
    cv2.imwrite(temp_path, processed)

    # 🔥 improved OCR
    text = pytesseract.image_to_string(
        Image.open(temp_path),
        config='--psm 6'
    )

    return text


def extract_text_from_pdf(pdf_path):

    # 🔥 THIS IS THE MAIN FIX
    images = convert_from_path(pdf_path, poppler_path=POPPLER_PATH)

    full_text = ""

    for i, img in enumerate(images):

        img_path = f"page_{i}.png"
        img.save(img_path)

        text = extract_text_from_image(img_path)

        text = text.replace("\r", "\n")

        full_text += text + "\n"

        # ✅ optional cleanup (good practice)
        if os.path.exists(img_path):
            os.remove(img_path)

    return full_text