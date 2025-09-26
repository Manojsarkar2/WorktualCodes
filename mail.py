import smtplib
from email.mime.text import MIMEText

def send_email(sender, password, recipient, subject, body):
    
    msg = MIMEText(body)
    print(msg)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient
    print(msg)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())

send_email(
    sender="manojbarbatos@gmail.com",
    password="tnlm yxfx vlrh ltlk", 
    recipient="manojmassradan@example.com",
    subject="Hello",
    body="I am "
)
