import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) return true
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })
  const data = await res.json()
  return data.success === true
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, turnstileToken } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const valid = await verifyTurnstile(turnstileToken ?? '')
    if (!valid) {
      return NextResponse.json({ error: 'Spam check failed. Please try again.' }, { status: 400 })
    }

    const host = process.env.SMTP_HOST
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const port = parseInt(process.env.SMTP_PORT ?? '587', 10)
    const secure = process.env.SMTP_SECURE === 'true' || port === 465

    if (!host || !user || !pass) {
      console.error('[contact] SMTP not configured — missing SMTP_HOST, SMTP_USER, or SMTP_PASS in .env')
      return NextResponse.json({ error: 'Email service not configured on the server.' }, { status: 503 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"IQM Website" <${user}>`,
      to: process.env.CONTACT_EMAIL_TO ?? 'contact@iqm.org.my',
      replyTo: email,
      subject: `[IQM Contact] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><hr><p>${message.replace(/\n/g, '<br>')}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
