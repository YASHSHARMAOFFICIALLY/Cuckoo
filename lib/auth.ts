// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { db } from "../prisma/db";  // We'll set this up next

// export const auth = betterAuth({
//   database: prismaAdapter(db, {
//     provider: "postgresql",
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     },
//   },
// });


// import {betterAuth} from "better-auth"
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { db } from "./db";  // We'll set this up next

// export const auth = betterAuth({
//     database: prismaAdapter(db, {
//         provider: "postgresql",
//     }),
//     secret: process.env.BETTER_AUTH_SECRET,
//     emailAndPassword: {
//         enabled: true
//     },
//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//         },
//         github: {
//             clientId: process.env.GITHUB_CLIENT_ID || "",
//             clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//         },
//     }
// })


import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { db } from "./db"

// export const auth = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL,

//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://finveda-neon.vercel.app",
//     "https://*.vercel.app",
//   ],
//    cookies: {
//     sessionToken: {
//       attributes: {
//         secure: true,
//         sameSite: "lax",
//         path: "/"
//       }
//     }
//   },

//   database: prismaAdapter(db, {
//     provider: "postgresql",
//   }),

//   secret: process.env.BETTER_AUTH_SECRET,

//   emailAndPassword: {
//     enabled: true
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     },

//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     }
//   }
// })


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://finveda-neon.vercel.app",
    "https://*.vercel.app",
  ],

  // Essential for Vercel/Proxy environments
  advanced: {
    useSecureCookies: true,
  },

  cookies: {
    state: {
      attributes: {
        secure: true,
        sameSite: "none",
      }
    },
    sessionToken: {
      attributes: {
        secure: true,
        sameSite: "lax",
        path: "/"
      }
    }
  },

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
     
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }
  }
})