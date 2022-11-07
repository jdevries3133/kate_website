/**
 * User Profiles!
 *
 * See /planning/profile_session_middleware.excalidraw for an overview of the
 * implementation of user profiles. Note that user profiles are currently
 * read-only. It is simply a mechanism behind user sessions, and we can also
 * start to build read-only profiles for users that they can view on the site
 */
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

/**
 * When we get some profile data in an action function, we will use it to
 * upsert the profile table, and return the id of the current user for use
 * throughout the session.
 */
export const handlyAnonymousProfileSubmission = async ({
  email,
  name,
}: Pick<UserProfile, "email" | "name">): Promise<Pick<UserProfile, "id">> => {
  return prisma.userProfile.upsert({
    select: { id: true },
    where: {
      email: email,
    },
    update: {
      name: name,
    },
    create: {
      email: email,
      name: name,
    },
  });
};
