import { type NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line consistent-return
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  // regex for path ended with .png | .svg | .jpg | .jpeg
  if (/\/([^/]+\.(png|svg|jpeg|jpg|mp3|xlsx))$/.test(pathname)) {
    return NextResponse.next();
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if ((pathname === '/' || pathname.startsWith('/dashboard')) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
