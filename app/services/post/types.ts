import type { ComponentType } from "react";

export type ValidSlug = string;

type ModuleAttributes = {
  created: Date;
  lastUpdated?: Date;
  lastMod: Date;
  title: string;
  description: string;
  thumbnail?: string;
  extra: { [key: string]: any };
};

export type ValidMdxModule = {
  attributes: ModuleAttributes;
  filename: string;
  default: ComponentType;
  Component: ComponentType;
};
