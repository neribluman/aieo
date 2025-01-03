import { Resend } from 'resend';
import { NextResponse } from 'next/server';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  type: 'contact';
  name: string;
  email: string;
  subject: string;
  message: string;
};

type AnalysisRequestData = {
  type?: undefined;
  email: string;
  url: string;
};

type RequestData = ContactFormData | AnalysisRequestData;

export async function POST(request: Request) {
  try {
    const data = await request.json() as RequestData;

    if (data.type === 'contact') {
      // Handle contact form submission
      const { name, email, subject, message } = data;
      await resend.emails.send({
        from: 'xfunnel.ai <onboarding@resend.dev>',
        to: ['hello@xfunnel.ai'],
        reply_to: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      // Send confirmation email to user
      await resend.emails.send({
        from: 'xfunnel.ai <onboarding@resend.dev>',
        to: email,
        subject: 'We received your message',
        html: `
          <h1>Thanks for contacting xfunnel.ai!</h1>
          <p>We've received your message and will get back to you soon.</p>
          <p><strong>Your message details:</strong></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p>Best regards,<br>The xfunnel.ai Team</p>
        `,
      });
    } else {
      // Handle analysis request (existing functionality)
      const { email, url } = data;
      await resend.emails.send({
        from: 'xfunnel.ai <onboarding@resend.dev>',
        to: [email, 'hello@xfunnel.ai'],
        subject: 'Your AI Visibility Analysis is in Progress',
        html: `
          <h1>Thanks for using xfunnel.ai!</h1>
          <p>We're analyzing the AI presence of: ${url}</p>
          <p>We'll process your request and send you the detailed analysis soon.</p>
          <p>Best regards,<br>The xfunnel.ai Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message }, 
      { status: 500 }
    );
  }
} 