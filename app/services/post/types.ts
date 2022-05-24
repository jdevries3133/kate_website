import type { ComponentType } from "react";

// valid type can be gotten by passing a string through `validateSlug`
export type ValidSlug = string;

export type ValidMdxModule = {
  attributes: {
    [key: string]: any;
    created: Date;
    lastUpdated?: Date;
    title: string;
    description: string;
  };
  filename: string;
  default: ComponentType;
};

export type PostMetadata = { slug: string; [key: string]: any };
