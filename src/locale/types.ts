import { resources } from "./resources";

export type LocaleSchema = (typeof resources)["en"];
export type NamespaceKeys<TNamespace extends keyof LocaleSchema> = Extract<
  keyof LocaleSchema[TNamespace],
  string
>;
