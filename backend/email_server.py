# Email server setup + send functionality

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_SERVER = "smtp.office365.com"
SMTP_PORT = 587
SMTP_USERNAME = "ferryreservationservice@outlook.com"
SMTP_PASSWORD = "frs1shair2umama3cole!!"


def send_email(email_address):
    try:
        message = MIMEMultipart()
        message["From"] = SMTP_USERNAME
        message["To"] = email_address
        message["Subject"] = "Test email 1"

        body = "Hello, this is a test email 1."
        message.attach(MIMEText(body, "plain"))

        session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        session.starttls()

        session.login(SMTP_USERNAME, SMTP_PASSWORD)

        email = message.as_string()
        session.sendmail(SMTP_USERNAME, email_address, email)

        session.quit()

    except Exception as e:
        raise e
