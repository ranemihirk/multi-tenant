// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const baseDomain =
    process.env.NODE_ENV === "development"
      ? "lvh.me:3000"
      : process.env.ROOT_DOMAIN!;

  // Root domain → allow
  if (host === baseDomain) return NextResponse.next();

  // Extract subdomain (tenant slug)
  const tenantSlug = host.replace(`.${baseDomain}`, "");

  // Attach tenant slug into request headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant", tenantSlug);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next|api|auth|favicon.ico).*)"],
};
