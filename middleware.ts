import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server'
import { LOGIN_TERMINAL, PUBLIC_ROUTES } from './config/routes';
export async function middleware(request: NextRequest) {
  console.log(request.url)
  const url = request.nextUrl.clone();
  // Use next-auth to get the token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!token;

  if (PUBLIC_ROUTES.includes(url.pathname)) {
    return NextResponse.next();
  }
  
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_TERMINAL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
}
