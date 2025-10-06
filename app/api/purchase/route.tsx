import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/ContactEmail';
import { MusicSample } from '@/lib/data/beats';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, beats } = body;

    if (!name || !email || !beats || beats.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const beatsDetails = beats.map((beat: MusicSample) => `${beat.title} - Price: ₹${beat.price}`).join('\n');
    const totalPrice = beats.reduce((total: number, beat: MusicSample) => total + beat.price, 0);

    const message = `New purchase:\n\n${beatsDetails}\n\nTotal Price: ₹${totalPrice}`;

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: 'New Beat Purchase',
      react: <ContactEmail name={name} email={email} message={message} />,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}