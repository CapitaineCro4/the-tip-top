import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_KEY } from '@/shared/constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY);
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
