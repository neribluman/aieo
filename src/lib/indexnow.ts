export async function submitUrlToIndexNow(urls: string[]) {
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit URL to IndexNow');
    }

    return true;
  } catch (error) {
    console.error('Error submitting URL to IndexNow:', error);
    return false;
  }
} 