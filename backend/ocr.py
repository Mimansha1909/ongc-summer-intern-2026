import easyocr
import fitz

reader = easyocr.Reader(['en'])


def extract_pdf_text(file_path):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:

        text += page.get_text()

    pdf.close()

    return text


def extract_image_text(file_path):

    result = reader.readtext(
        file_path,
        detail=0
    )

    return "\n".join(result)