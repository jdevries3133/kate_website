import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.$connect();

export default client;
