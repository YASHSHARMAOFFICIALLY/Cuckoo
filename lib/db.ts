import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  adapter: PrismaPg | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({ 
    connectionString,
    connectionTimeoutMillis: 10000, 
    idleTimeoutMillis: 20000,
    max: 5, // Recommended for serverless/low-concurrency environments
  });
}

if (!globalForPrisma.adapter) {
  globalForPrisma.adapter = new PrismaPg(globalForPrisma.pool);
}

export const db = globalForPrisma.prisma || new PrismaClient({ adapter: globalForPrisma.adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
