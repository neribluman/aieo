import { Resend } from 'resend';
import { NextResponse } from 'next/server';

if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY is missing from environment variables');
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

console.log('📧 Initializing Resend with API key:', process.env.RESEND_API_KEY.slice(0, 8) + '...');
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
    console.log('🔄 Received new email request');
    const data = await request.json() as RequestData;
    console.log('📝 Request data:', { ...data, email: data.email ? '***@***.***' : undefined });

    if (data.type === 'contact') {
      console.log('📨 Processing contact form submission');
      const { name, email, subject, message } = data;
      
      console.log('📤 Sending email to hello@xfunnel.ai');
      const adminEmailResult = await resend.emails.send({
        from: 'xfunnel.ai <hello@xfunnel.ai>',
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
      console.log('📬 Admin email result:', adminEmailResult);

      console.log('📤 Sending confirmation to user');
      const userEmailResult = await resend.emails.send({
        from: 'xfunnel.ai <hello@xfunnel.ai>',
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
      console.log('📬 User confirmation email result:', userEmailResult);
    } else {
      console.log('🔍 Processing analysis request');
      const { email, url } = data;
      
      console.log('📤 Sending analysis confirmation email');
      const result = await resend.emails.send({
        from: 'xfunnel.ai <hello@xfunnel.ai>',
        to: [email, 'hello@xfunnel.ai', 'neri@xfunnel.ai'],
        subject: '🚀 Your AI Visibility Analysis is Starting!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2E0854; margin-bottom: 24px;">🎯 Exciting News from xfunnel.ai! 🎉</h1>
            
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              We're thrilled to start analyzing the AI presence of: <strong style="color: #9400D3;">${url}</strong> 🔍
            </p>
            
            <div style="background: linear-gradient(to right, #2E0854, #9400D3); padding: 20px; border-radius: 10px; color: white; margin: 24px 0;">
              <h2 style="margin-top: 0;">What's Happening Now:</h2>
              <ul style="list-style-type: none; padding-left: 0;">
                <li style="margin-bottom: 8px;">✨ Running deep analysis across major AI platforms</li>
                <li style="margin-bottom: 8px;">📊 Gathering competitive intelligence</li>
                <li style="margin-bottom: 8px;">🎯 Identifying optimization opportunities</li>
                <li style="margin-bottom: 8px;">📈 Preparing actionable insights</li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              <strong>⏰ Expected Delivery:</strong> Within the next 24 hours, you'll receive a comprehensive analysis of your AI presence.
            </p>

            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
              Get ready to discover how AI perceives your brand and learn actionable steps to enhance your visibility! 🚀
            </p>

            <p style="font-size: 16px; line-height: 1.5; color: #666;">
              Best regards,<br>
              The xfunnel.ai Team 💜
            </p>
          </div>
        `,
      });
      console.log('📬 Analysis email result:', result);
    }

    console.log('✅ Email sent successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // Log additional error details if available
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { success: false, error: (error as Error).message }, 
      { status: 500 }
    );
  }
} 