import i18n from "./i18n";
import { AppNamespace } from "./resources";
import { NamespaceKeys } from "./types";

export const translate = <TNamespace extends AppNamespace>(
  namespace: TNamespace,
  key: NamespaceKeys<TNamespace>,
  options?: Record<string, unknown>,
): string => String(i18n.getFixedT(null, namespace)(key, options as never));
