import type { Settings } from "@tryghost/content-api";
import { createContext } from "react";
import useMusic from "hooks/use-music";

export const blogSettingsContext = createContext<Settings>({});
export const audioPlayerContext = createContext<ReturnType<typeof useMusic>>(
  {} as any
);
