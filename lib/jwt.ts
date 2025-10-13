"use server";

import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { fetchUserRoleByUserId } from "@/controllers/userController";
import { fetchTenantFromTenantID } from "@/controllers/organizationController";

const SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Generate JWT for a user
 */
export function generateToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      role: fetchUserRoleByUserId(String(user.id)),
      tenantSlug: fetchTenantFromTenantID(Number(user.tenantId)),
    },
    SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Verify JWT token
 * @param token JWT string
 * @returns payload object { id, role, organizationId }
 * @throws if token is invalid or expired
 */
export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload as { id: number; role: string; tenantId: number };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
