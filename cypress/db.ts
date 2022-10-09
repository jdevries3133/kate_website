import { PrismaClient } from "@prisma/client";

// see ../docker-compose.yml for db connection setup
process.env.DATABASE_URL = "postgresql://app:app@localhost:4050/app";

const db = new PrismaClient();
db.$connect();

export default db;
