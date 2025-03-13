import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.icloud.com',
  port: 587,
  secure: false,
  auth: {
    user: 'crochets.puma2i@icloud.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { to, subject, content } = await request.json();

    await transporter.sendMail({
      from: 'crochets.puma2i@icloud.com',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      text: content,
      html: content.replace(/\n/g, '<br>'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
