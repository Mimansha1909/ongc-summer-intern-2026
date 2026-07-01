import re

def parse_report(text):

    data = {}

    patterns = {

        "inspection_id":
        r"Inspection\s*ID\s*[:\-]?\s*([A-Za-z0-9-]+)",

        "severity":
        r"Severity\s*[:\-]?\s*(High|Medium|Low)",

        "location":
        r"Location\s*[:\-]?\s*([A-Za-z ]+)"

    }

    for key, pattern in patterns.items():

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:

            data[key] = match.group(1).strip()

    return data