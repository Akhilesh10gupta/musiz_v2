import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Missing Google Drive file ID', { status: 400 });
  }

  const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  try {
    const response = await fetch(googleDriveUrl, {
      headers: {
        // It can be helpful to mimic a standard browser user agent
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    if (!response.ok || !response.body) {
      // If Google returns an error or an empty body, forward the error
      return new Response(response.statusText, { status: response.status });
    }

    // Stream the audio content back to the client
    const headers = new Headers({
      'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Length': response.headers.get('Content-Length') || '',
    });

    return new Response(response.body, { headers });

  } catch (error) {
    console.error('Error fetching from Google Drive:', error);
    return new Response('Error fetching audio from Google Drive', { status: 500 });
  }
}
