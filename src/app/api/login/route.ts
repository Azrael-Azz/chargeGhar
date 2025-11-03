import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      'http://api/api/admin/login/', // Docker service name
      {email:email, password:password},
      { headers: { 'Content-Type': 'application/json' } }
    );
    const data = response.data;

    if (data.data?.access_token) {
      const responseWithCookie = NextResponse.json(data);
      responseWithCookie.cookies.set('token', data.data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      if (data.data?.refresh_token) {
        responseWithCookie.cookies.set('refresh_token', data.data.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });
      }
      return responseWithCookie;
    } else {
      return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login route error:', error);
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return NextResponse.json(axiosError.response.data, { status: axiosError.response.status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
