import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  //   if (request.nextUrl.pathname.startsWith('/')) { modify '/' accordingly
  const response = NextResponse.next({
      // New request headers
      headers: requestHeaders,
  })
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  return response
  //   }
}

export const config = {
  matcher: ['/download'],
}
