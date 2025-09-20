// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTenantFromRequest } from "@/lib/tenant";

export async function GET(req: NextRequest) {
  const org = await getTenantFromRequest(req);

  if (!org) {
    return NextResponse.json(
      { error: "Tenant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    tenant: org.slug,
    plan: org.plan,
  });
}
