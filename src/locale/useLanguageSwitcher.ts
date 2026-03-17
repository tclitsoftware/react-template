import { useCallback, useMemo } from "react";
import i18n from "i18next";

import { LANGUAGE_OPTIONS } from "./constants";
import { AppLanguage } from "./resources";

export const useLanguageSwitcher = () => {
  const currentLanguage = (i18n.resolvedLanguage ??
    i18n.language ??
    "en") as AppLanguage;

  const setLanguage = useCallback(async (language: AppLanguage) => {
    if (language === currentLanguage) {
      return;
    }

    await i18n.changeLanguage(language);
  }, [currentLanguage]);

  const languages = useMemo(
    () =>
      LANGUAGE_OPTIONS.map((language) => ({
        ...language,
        active: language.value === currentLanguage,
      })),
    [currentLanguage],
  );

  return {
    currentLanguage,
    languages,
    setLanguage,
  };
};
