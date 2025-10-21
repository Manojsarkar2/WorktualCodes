from email.message import EmailMessage
import smtplib

msg = EmailMessage()
msg["Subject"] = "Test"
msg["From"] = "support@worktual.tech"
msg["To"] = "manojbarbatos@gmail.com"
msg.set_content("")

server = smtplib.SMTP("mail.worktual.tech", 587)
server.starttls()
server.login("support@worktual.tech", "admin123")
server.send_message(msg)
server.quit()
