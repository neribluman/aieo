import { NextResponse } from 'next/server';

const API_KEY = '9256cb2d96b444c398e8e0ccd7215526';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'Invalid URLs' }, { status: 400 });
    }

    const indexNowPayload = {
      host: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
      key: API_KEY,
      keyLocation: `${process.env.NEXT_PUBLIC_SITE_URL}/indexnow.txt`,
      urlList: urls
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (!response.ok) {
      throw new Error('Failed to submit URLs to IndexNow');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URLs' },
      { status: 500 }
    );
  }
} 
