import { NextResponse } from 'next/server';

export function middleware(req) {
  const loginUrl = new URL('/', req.url);
  const channelUrl = new URL('/channel', req.url);

  // Check if the "accessToken" cookie exists
  const accessToken = req.cookies.get('accessToken');
  // //console.log(accessToken)

  if (req.nextUrl.pathname === '/') {
    // If the user is on "/" and has the "accessToken" cookie, redirect to "/channel"
    if (accessToken != undefined && accessToken) {
      return NextResponse.redirect(channelUrl);
    }
  } else {
    // If the user is on any other page and does NOT have the "accessToken" cookie, redirect to "/"
    if (accessToken == undefined || !accessToken) {
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed if token is valid
  return NextResponse.next();
}

export const config = {
  // Match all routes except static files, API routes, and the login page
  matcher: '/((?!_next/static|_next/image|favicon.ico|api/|login).*)',
};

