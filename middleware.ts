import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const publicPages = [
  "/",
  "/rough",
  "/login",
  "/book-appointment",
  "/reset-password",
  "/forgotten-password",
  "/account/verify",
];

const adminPages = ["/admin"];
const productionPages = ["/production"];
const crewPages = ["/crew"];

const publicApiEndpoints = [
  "/api/v1/contact-us",
  "/api/v1/user/.*/password-reset",
  "/api/v1/user/forgotten-password",
  "/api/v1/user/.*/verify",
  "/api/v1/mobile/login",
];

const adminApiEndpoints = ["/api/v1/admin"];

function matchAny(path: string, patterns: string[]) {
  return patterns.some((p) => new RegExp(`^${p}$`).test(path));
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always set tenant header
  const host = req.headers.get("host") || "";

  const parts = host.split(".");
  const tenantSlug = parts.length >= 2 ? parts[0] : "";

  // Start with a response with x-tenant
  const response = NextResponse.next();
  response.headers.set("x-tenant", tenantSlug);

  // Public pages → allow
  if (publicPages.includes(pathname)) return response;

  // Public API → allow
  if (
    matchAny(pathname, publicApiEndpoints) ||
    pathname.startsWith("/api/auth")
  ) {
    return response;
  }

  // JWT check for protected routes
  const authHeader = req.headers.get("Authorization") || "";
  const tokenString = authHeader.replace("Bearer ", "");
  let payload;

  try {
    payload = verifyToken(tokenString);
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid authentication" },
      { status: 401 }
    );
  }

  // Admin pages / APIs
  if (adminPages.includes(pathname) || matchAny(pathname, adminApiEndpoints)) {
    if (payload.role !== "super_admin" && payload.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }

  // Production pages
  if (productionPages.includes(pathname) && payload.role !== "production") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // Crew pages
  if (crewPages.includes(pathname) && payload.role !== "crew") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // Attach user info headers
  response.headers.set("x-user-id", String(payload.id));
  response.headers.set("x-user-role", payload.role);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api-doc|.*\\..*).*)"],
};
