import { UserProfile } from "@prisma/client";
import prisma from "cypress/db";
import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  experimentalInteractiveRunEvents: true,
  retries: {
    runMode: 3,
    openMode: 2
  },
  e2e: {
    setupNodeEvents(on) {
      on("task", {
        async getProfile(user: Partial<UserProfile>) {
          return await prisma.userProfile.findFirst({
            where: user,
          });
        },
        async getAllComments() {
          return await prisma.comment.findMany({});
        }
      });
      on('after:spec', async () => {
        // clear db
        await prisma.comment.deleteMany({});
        await prisma.contactInquiry.deleteMany({});
        await prisma.userProfile.deleteMany({});
      })
    },
    baseUrl: "http://localhost:8000",
  },
});
