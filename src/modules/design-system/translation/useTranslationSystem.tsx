import { useEffect } from "react";
import { useAppTranslation } from "locale/useAppTranslation";

import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useTranslationSystem = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation("translation");

  useEffect(() => {
    dispatch(setGlobalComponent({ title: t("page-title"), hasBackButton: false }));
  }, [dispatch, t]);
};

export default useTranslationSystem;
