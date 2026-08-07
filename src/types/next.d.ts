declare module "next/types.js" {
  import type { ResolvingMetadata as RM, ResolvingViewport as RV } from "next";
  export type ResolvingMetadata = RM;
  export type ResolvingViewport = RV;
}

declare module "next/server";
