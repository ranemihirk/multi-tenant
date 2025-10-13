import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  findUserByEmail,
  fetchUserRoleByUserId,
} from "@/controllers/userController";
import { fetchTenantFromTenantID } from "@/controllers/organizationController";
// import { refreshAccessToken } from '@/app/services/authenticationService';

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/core#authconfig

const expires_in = Number(process.env.NEXTAUTH_EXPIRES_IN);
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials.password) return null;

          const user = await findUserByEmail(credentials.email);
          if (!user) return null;

          if (
            !user.dataValues.password ||
            !(await user.validatePassword(credentials.password))
          ) {
            // Incorrect details - allow next-auth to handle fail with null.
            return null;
          } else {
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { maxAge: 60 * 60 * 24 * expires_in },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Called once JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = fetchUserRoleByUserId(user.id);
        token.tenantSlug = fetchTenantFromTenantID(user.tenantId);
      }
      return token;
    },

    // Called every time session is checked (client/server)
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.tenantSlug = token.tenantSlug as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
