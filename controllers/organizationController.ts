"use server";

import { NextRequest } from "next/server";
import { Op, fn, col, InferAttributes } from "sequelize";

import db from "@/models/index";

const Organizations = db.organization;

export const fetchTenantFromTenantID = async (
  tenantId: number
): Promise<InferAttributes<typeof Organizations>> => {
  try {
    return await Organizations.findOne({ where: { id: tenantId } });
  } catch (error) {
    console.error(error);
    throw new Error("Database error fetching user by email");
  }
};
