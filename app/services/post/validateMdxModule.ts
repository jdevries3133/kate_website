import { doesStaticFileExist } from "~/utils";
import type { ValidMdxModule } from "./types";

/**
 * Blog post modules in this project must follow these rules:
 *
 * 1. They must contain these attributes:
 *    {title: string; description: string; created: Date}
 * 2. They may optionally contain a `lastUpdated` date, but that date must be
 *    later than `created`.
 * 3. They may contain a thumbnail, but it must be a valid path in the `public`
 *    folder
 */
export const validateMdxModule = (mod: any): ValidMdxModule => {
  // rule #1: must contain `title`, `description`, and `created`.
  if (
    !(
      typeof mod?.attributes?.title === "string" &&
      typeof mod?.attributes?.description === "string" &&
      // rough duck typing for the date
      typeof mod?.attributes?.created?.getMonth === "function"
    )
  ) {
    throw new Error(
      `${mod.filename} is invalid: missing title, description, or created attributes`
    );
  }
  // rule #2: may contain lastUpdated; lastUpdated must be after `created`
  if (
    mod?.attributes?.lastUpdated !== undefined &&
    mod?.attributes?.lastUpdated.getTime() < mod?.attributes?.created?.getTime()
  ) {
    throw new Error(
      `${mod.filename} is invalid: lastUpdated cannot be before created`
    );
  }
  // rule #3: thumbnail, if present, must be a valid path in `/public`
  if (
    mod?.attributes?.thumbnail &&
    !doesStaticFileExist(mod.attributes.thumbnail, {
      clientIgnore: typeof process === "undefined",
    })
  ) {
    throw new Error(
      `${mod.filename} is invalid: thumbnail of ${mod.attributes.thumbnail} was provided but it does not exist`
    );
  }

  // module is valid, now we'll perform some transformations
  const newModule = { ...mod };

  // only typed attributes stay in the top-level attributes property
  const typedKeys = [
    "created",
    "lastUpdated",
    "lastMod",
    "title",
    "description",
    "thumbnail",
  ];
  const oldAttributes = { ...mod.attributes };
  newModule.attributes = {};
  typedKeys.forEach((key) => (newModule.attributes[key] = mod.attributes[key]));
  newModule.attributes.extra = {};
  Object.keys(oldAttributes)
    .filter((key) => !typedKeys.includes(key))
    .forEach((key) => (newModule.attributes.extra[key] = mod.attributes[key]));

  // lastMod is created or lastUpdated
  newModule.attributes.lastMod =
    mod.attributes.lastUpdated || mod.attributes.created;

  return newModule as ValidMdxModule;
};
