// src/app/guest-session/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  cookieStore.set('is_guest', 'true', { path: '/' })

  return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
}
