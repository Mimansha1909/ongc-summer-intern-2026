from sqlalchemy import Column, Integer, String, Text
from backend.database import Base

class InspectionReport(Base):

    __tablename__ = "inspection_reports"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    inspection_id = Column(String)

    severity = Column(String)

    location = Column(String)

    extracted_text = Column(Text)