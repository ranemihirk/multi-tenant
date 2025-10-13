"use server";

import { NextRequest } from "next/server";
import { Op, fn, col, InferAttributes } from "sequelize";

import db from "@/models/index";

const User = db.user;
const Role = db.role;

export const findUserByEmail = async (
  email: string
): Promise<InferAttributes<typeof User>> => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      user.userRole = (await fetchUserRoleByUserId(user.id)) || "";
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Database error fetching user by email");
  }
};

export const fetchUserRoleByUserId = async (
  userId: string
): Promise<string> => {
  try {
    const parseUuserId = Number(userId);
    const role = await Role.findOne({
      include: [
        {
          model: User,
          where: { id: parseUuserId },
          attributes: [], // don’t return user fields
          through: { attributes: [] },
        },
      ],
    });

    return role.name;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
