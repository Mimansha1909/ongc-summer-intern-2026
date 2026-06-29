import re

def parse_report(text):

    data = {}

    inspection_match = re.search(
        r"Inspection ID[:\s]*([A-Z0-9]+)",
        text,
        re.IGNORECASE
    )

    severity_match = re.search(
        r"Severity[:\s]*([A-Za-z]+)",
        text,
        re.IGNORECASE
    )

    location_match = re.search(
        r"Location[:\s]*([A-Za-z]+)",
        text,
        re.IGNORECASE
    )

    if inspection_match:
        data["inspection_id"] = inspection_match.group(1)

    if severity_match:
        data["severity"] = severity_match.group(1)

    if location_match:
        data["location"] = location_match.group(1)

    return data
