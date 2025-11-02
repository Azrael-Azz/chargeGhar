import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const secret = process.env.JWT_SECRET;

  // If the user is trying to access the login page and they have a valid token, redirect to dashboard
  if (token && request.nextUrl.pathname === '/login') {
    if (!secret) {
      console.error('JWT_SECRET is not set');
      return NextResponse.next(); // Or handle appropriately
    }
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(secret));
      // If token is valid, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token is invalid, allow access to login page
      return NextResponse.next();
    }
  }

  // If the user is trying to access a protected route (e.g., /dashboard)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!secret) {
      console.error('JWT_SECRET is not set');
      // Decide how to handle this - fail open or closed? For now, redirecting to login.
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the token
      await jose.jwtVerify(token, new TextEncoder().encode(secret));
      // If token is valid, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Clear the invalid cookies
      response.cookies.set('token', '', { maxAge: -1, path: '/' });
      response.cookies.set('refresh_token', '', { maxAge: -1, path: '/' });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};
