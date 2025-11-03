import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token not found' }, { status: 401 });
  }

  try {
    const response = await axios.post('http://api/auth/refresh', {
      refresh: refreshToken,
    });

    const { access: newAccessToken } = response.data;

    if (!newAccessToken) {
      return NextResponse.json({ message: 'New access token not found in response' }, { status: 500 });
    }

    const clientResponse = NextResponse.json({ accessToken: newAccessToken });

    clientResponse.cookies.set('token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week, or match your backend's token lifetime
      path: '/',
    });

    return clientResponse;

  } catch (error) {
    console.error('Token refresh error:', error);

    const response = NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    response.cookies.set('token', '', { maxAge: -1, path: '/' });
    response.cookies.set('refresh_token', '', { maxAge: -1, path: '/' });
    return response;
  }
}
