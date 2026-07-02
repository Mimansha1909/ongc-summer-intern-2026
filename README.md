# 🛢️ Inspection Report Management & Analysis System

## Overview

The Inspection Report Management & Analysis System is a web-based application developed during my summer internship at **ONGC**. The project was designed to simplify the process of managing inspection reports by allowing users to upload PDF or image files, extract important information, organize reports, and view them through an interactive dashboard.

The application combines document management with OCR-based data extraction to reduce manual effort and improve accessibility of inspection records.

---

## Features

### 📄 Report Upload
- Upload inspection reports in PDF or image format
- Support for multiple report types
- Secure file handling

### 🔍 OCR-Based Data Extraction
- Extract text from uploaded reports
- Automatically identify important information
- Reduce manual data entry

### 📂 Report Management
- Store inspection reports in a database
- View previously uploaded reports
- Search reports using keywords
- Filter reports for quick access

### 📊 Dashboard
- Overview of uploaded reports
- Report statistics
- Quick access to recent records
- User-friendly interface

### 🔎 Report Analysis
- Display extracted observations
- Highlight important findings
- Organize extracted information for easier review

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React.js |
| Backend | Python (FastAPI) |
| Database | MySQL |
| OCR | OCR library for text extraction |
| HTTP Client | Axios |
| Styling | CSS |
| Version Control | Git & GitHub |

---

## Project Structure

```
Inspection-Report-Management-System
│
├── backend/
│
├── frontend/
│
├── uploads/
│
├── requirements.txt
│
├── package.json
│
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mimansha1909/ongc-summer-intern-2026.git
```

---

### 2. Backend Setup

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend

```bash
uvicorn main:app --reload
```

---

### 3. Frontend Setup

Navigate to the frontend folder

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run React

```bash
npm run dev
```

---

### 4. Database Configuration

Create the required MySQL database and update the database connection settings in the backend configuration before running the application.

---

## How It Works

1. Upload an inspection report (PDF or image).
2. The backend processes the uploaded document.
3. OCR extracts relevant text from the report.
4. Extracted information is stored in the database.
5. Users can search, filter, and review reports through the dashboard.

---

## What I Learned

This project gave me practical experience with:

- Building a full-stack web application
- React component development
- REST API integration
- Backend development using Python
- OCR-based document processing
- Database design and CRUD operations
- Handling file uploads
- Managing frontend-backend communication
- Debugging and deployment using Git

---

## Future Improvements

Some features that can be added in future versions include:

- AI-based report summarization
- Automatic defect classification
- User authentication
- Role-based access control
- Advanced analytics dashboard
- Report export to PDF or Excel
- Email notifications
- Cloud deployment

---

## Internship

This project was developed as part of my **Summer Internship at ONGC**, where I worked on designing and implementing a digital solution for managing inspection reports using modern web technologies and OCR.

---

## Author

**Mimansha Chauhan**

GitHub:
https://github.com/Mimansha1909

---

## License

This project is shared for educational and portfolio purposes.
Some implementation details or sample data may have been modified to avoid including confidential organizational information.
