"use server";

// lib/tenant.ts
import { NextRequest } from "next/server";
import { Organization } from "@/models/Organization";

export async function getTenantFromRequest(req: NextRequest) {
  const slug = req.headers.get("x-tenant");

  if (!slug) return null;

  const org = await Organization.findOne({ where: { slug } });
  return org;
}
