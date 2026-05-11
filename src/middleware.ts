import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {


  const { pathname } = request.nextUrl;

  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          response.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )


  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role === 'user') {

      if (pathname) {
        return NextResponse.redirect(new URL('/', request.url))
      }
      return response;
    }

    if (profile?.role === 'admin') {

      if (pathname !== '/login' && pathname !== '/signup') {
        return response;
      }
      else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    return response;
  }
  else {
    if (pathname !== '/login' && pathname !== '/signup') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }
}

export const config = {
  matcher: ['/Admin/:path*', '/login', '/signup'],
}