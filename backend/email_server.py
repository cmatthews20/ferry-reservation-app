# Email server setup + send functionality

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_SERVER = "smtp.office365.com"
SMTP_PORT = 587
SMTP_USERNAME = "ferryreservationservice@outlook.com"
SMTP_PASSWORD = "frs1shair2umama3cole!!"


def send_email(
    email_address,
    name,
    booking_id,
    arrive_port,
    depart_port,
    time,
    passengers,
    vehicle,
):
    try:
        message = MIMEMultipart()
        message["From"] = SMTP_USERNAME
        message["To"] = email_address
        message["Subject"] = "Your Booking Info"

        body = f"Hello, {name}! \n\nSee below your booking info for your trip from {depart_port} to {arrive_port}: \n\nBooking ID (use this ID on the website to see update about your booking, or to cancel/edit your booking): {booking_id} \n\nDeparture Date/Time: {time} \n\nTotal passengers: {passengers} \n\nVehicle?: {vehicle} \n\nThank you and Bon Voyage!"
        message.attach(MIMEText(body, "plain"))

        session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        session.starttls()

        session.login(SMTP_USERNAME, SMTP_PASSWORD)

        content = message.as_string()
        session.sendmail(SMTP_USERNAME, email_address, content)

        session.quit()

    except Exception as e:
        raise e
