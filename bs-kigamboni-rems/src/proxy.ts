// src/proxy.ts
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth: proxyAuth } = NextAuth(authConfig);

export default proxyAuth((req: any) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login');
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isLoggedIn && isAdminRoute && req.auth?.user?.role === 'TENANT') {
    return NextResponse.redirect(new URL('/tenant', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};