from fastapi import FastAPI, UploadFile, File, HTTPException
from backend.ocr import extract_pdf_text, extract_image_text
from backend.parser import parse_report
from backend.database import engine, SessionLocal
from backend.models import InspectionReport
from backend.database import Base
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Inspection Report Management & Analysis System"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = ""
    parsed_data = {}

    if file.filename.lower().endswith(".pdf"):

        extracted_text = extract_pdf_text(
            file_path
        )

        parsed_data = parse_report(
            extracted_text
        )

    elif file.filename.lower().endswith(
        (".png", ".jpg", ".jpeg")
    ):

        extracted_text = extract_image_text(
            file_path
        )

        parsed_data = parse_report(
            extracted_text
        )

    db = SessionLocal()

    report = InspectionReport(

        filename=file.filename,

        inspection_id=parsed_data.get(
            "inspection_id"
        ),

        severity=parsed_data.get(
            "severity"
        ),

        location=parsed_data.get(
            "location"
        ),

        extracted_text=extracted_text

    )

    db.add(report)
    db.commit()
    db.close()

    return {
        "filename": file.filename,
        "status": "uploaded successfully",
        "extracted_text": extracted_text,
        "parsed_data": parsed_data
    }


@app.get("/reports")
def get_reports():

    db = SessionLocal()

    reports = db.query(
        InspectionReport
    ).all()

    result = []

    for report in reports:

        result.append({

            "id": report.id,

            "filename": report.filename,

            "inspection_id": report.inspection_id,

            "severity": report.severity,

            "location": report.location,

            "extracted_text": report.extracted_text

        })

    db.close()

    return result


@app.delete("/reports/{report_id}")
def delete_report(report_id: int):

    db = SessionLocal()

    report = db.query(
        InspectionReport
    ).filter(
        InspectionReport.id == report_id
    ).first()

    if not report:

        db.close()

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    db.delete(report)

    db.commit()

    db.close()

    return {
        "message": "Report deleted successfully"
    }