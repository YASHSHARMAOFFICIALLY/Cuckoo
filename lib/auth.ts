import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

// Remove runtime exports — they don't belong here
// export const runtime = "nodejs";  ← DELETE THIS

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  trustedOrigins: [
    "http://localhost:3000",
    "https://finnanceflow.buildwithyash.com",
  ],

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  advanced: {
    useSecureCookies: true,
    // Explicitly set cookie attributes for production
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});