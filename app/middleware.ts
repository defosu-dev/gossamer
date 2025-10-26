// app/middleware.ts
import { supabaseServer } from '@/utils/supabase/supabaseServer'
import { NextResponse } from 'next/server'

export async function middleware(req: Request) {
  const res = NextResponse.next()
  const supabase = await supabaseServer() 
  await supabase.auth.getUser()
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
