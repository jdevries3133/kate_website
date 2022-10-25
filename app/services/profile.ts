import { getSession } from "~/sessions";
import prisma from "~/prisma.server";
import { LoaderArgs } from "remix";
import { UserProfile } from "@prisma/client";

export type ProfileLoaderData = UserProfile | null;
export type ProfileLoader = (
  a: LoaderArgs
) => Promise<{ profile: ProfileLoaderData }>;

export const profileLoader = async (
  request: Request
): Promise<ProfileLoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("profileId")) {
    return await prisma.userProfile.findUnique({
      where: { id: session.get("profileId") },
    });
  }
  return null;
};
