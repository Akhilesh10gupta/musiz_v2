
import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `New message from ${name} on your website`,
      react: <ContactEmail name={name} email={email} message={message} />,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
