import { NextRequest, NextResponse } from "next/server";
import { rootDomain } from "@/lib/utils";
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

function extractSubdomain(request: NextRequest): string {
  const url = request.url;
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Local development environment
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes(".localhost")) {
      return hostname.split(".")[0];
    }

    return "default";
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(":")[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return parts.length > 0 ? parts[0] : "default";
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain
    ? hostname.replace(`.${rootDomainFormatted}`, "")
    : "default";
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const tenantSlug = extractSubdomain(req);

  // Start with a response with x-tenant
  const response = NextResponse.next();
  response.headers.set("x-tenant", tenantSlug);

  // Public pages → allow
  if (publicPages.includes(pathname))
    return tenantSlug == "default"
      ? response
      : NextResponse.rewrite(new URL(`/t/${tenantSlug}`, req.url));

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
