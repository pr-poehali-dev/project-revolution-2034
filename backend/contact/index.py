import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Обработка заявки с контактной формы сайта realgroup.pw"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    company = body.get("company", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "name, email and message are required"}),
        }

    contact_email = os.environ.get("CONTACT_EMAIL", "")

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #1a1a1a;">Новая заявка с сайта Real Group</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; color: #666; width: 120px;"><b>Имя:</b></td><td style="padding: 8px;">{name}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; color: #666;"><b>Компания:</b></td><td style="padding: 8px;">{company or '—'}</td></tr>
        <tr><td style="padding: 8px; color: #666;"><b>Email:</b></td><td style="padding: 8px;"><a href="mailto:{email}">{email}</a></td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; color: #666; vertical-align:top;"><b>Сообщение:</b></td><td style="padding: 8px;">{message}</td></tr>
      </table>
      <div style="margin-top: 24px;">
        <a href="mailto:{email}?subject=Re: Ваша заявка на сайте Real Group"
           style="display:inline-block; padding: 12px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px; border-radius: 4px;">
          Ответить клиенту
        </a>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Заявка с сайта: {name} ({company})" if company else f"Заявка с сайта: {name}"
    msg["From"] = "noreply@poehali.dev"
    msg["To"] = contact_email
    msg["Reply-To"] = email

    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP("smtp.poehali.dev", 587) as server:
        server.sendmail("noreply@poehali.dev", contact_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }