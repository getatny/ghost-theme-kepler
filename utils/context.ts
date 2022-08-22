import type { Settings } from "@tryghost/content-api";
import { createContext } from "react";

export const blogSettingsContext = createContext<Settings>({});
