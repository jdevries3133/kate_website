import type { ComponentType } from "react";

export type ValidSlug = string;

type ModuleAttributes = {
  [key: string]: any;
  created: Date;
  lastUpdated?: Date;
  lastMod: Date;
  title: string;
  description: string;
};

export type ValidMdxModule = {
  attributes: ModuleAttributes;
  filename: string;
  default: ComponentType;
};

export type PostMetadata = ModuleAttributes & {
  slug: string;
};
