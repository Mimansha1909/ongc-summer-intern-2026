import csv
from datetime import datetime

def validate_date(date_string):
    try:
        datetime.strptime(date_string, "%Y-%m-%d")
        return True
    except ValueError:
        return False

def validate_amount(amount):
    try:
        return float(amount) > 0
    except ValueError:
        return False

with open("sample_invoice.csv", "r") as file:
    reader = csv.DictReader(file)

    print("\nInvoice Validation Report\n")

    for row in reader:

        invoice_id = row["InvoiceID"]
        date = row["Date"]
        amount = row["Amount"]

        errors = []

        if not validate_date(date):
            errors.append("Invalid Date")

        if not validate_amount(amount):
            errors.append("Invalid Amount")

        if errors:
            print(f"{invoice_id} -> {', '.join(errors)}")
        else:
            print(f"{invoice_id} -> Valid")