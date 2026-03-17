import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_NAMESPACE } from "./constants";
import { AppNamespace } from "./resources";
import { NamespaceKeys } from "./types";

export const useAppTranslation = <
  TNamespace extends AppNamespace = typeof DEFAULT_NAMESPACE,
>(
  namespace?: TNamespace,
) => {
  const resolvedNamespace = (namespace ?? DEFAULT_NAMESPACE) as TNamespace;
  const translation = useTranslation(resolvedNamespace);

  const typedT = useMemo(
    () =>
      (
        key: NamespaceKeys<TNamespace>,
        options?: Record<string, unknown>,
      ): string => String(translation.t(key, options as never)),
    [translation],
  );

  return {
    ...translation,
    t: typedT,
  };
};
