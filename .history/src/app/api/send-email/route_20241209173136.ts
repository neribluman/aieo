import { Resend } from 'resend';
import { NextResponse } from 'next/server';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, url } = await request.json();

    const data = await resend.emails.send({
      from: 'xfunnel.ai <onboarding@resend.dev>',
      to: email,
      subject: 'Your AI Visibility Analysis is in Progress',
      html: `
        <h1>Thanks for using xfunnel.ai!</h1>
        <p>We're analyzing the AI presence of: ${url}</p>
        <p>We'll process your request and send you the detailed analysis soon.</p>
        <p>Best regards,<br>The xfunnel.ai Team</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message }, 
      { status: 500 }
    );
  }
} 