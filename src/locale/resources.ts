import en from "./en";
import id from "./id";

export const resources = {
  en,
  id,
} as const;

export type AppResources = typeof resources;
export type AppLanguage = keyof AppResources;
export type AppNamespace = keyof AppResources["en"];
