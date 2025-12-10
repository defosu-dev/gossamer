import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, to } from '@/config/routes';
import { supabaseServer } from '@/lib/supabase/supabaseServer';

/**
 * Protects routes based on authentication status.
 * @remarks
 * Redirects unauthenticated users from `protected` routes to `/login` with `redirect_to` param.
 * Uses centralized route configuration from `@/config/routes`.
 * Supports dynamic routes and is ready for future role-based access control.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const matchedRoute = Object.values(ROUTES).find((route) => {
    const regex = new RegExp('^' + route.path.replace(/\[.*?\]/g, '[^/]+') + '$');
    return regex.test(pathname);
  });

  if (matchedRoute?.auth === 'protected' && !user) {
    const loginUrl = new URL(to.login(), request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|public/|api/).*)'],
};
