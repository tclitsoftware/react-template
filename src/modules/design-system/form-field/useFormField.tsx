import { useEffect } from "react";
import { useAppTranslation } from "locale/useAppTranslation";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useFormField = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation("formField");

  useEffect(() => {
    dispatch(setGlobalComponent({ title: t("page-title"), hasBackButton: false }));
  }, [dispatch, t]);

  return {};
};

export default useFormField;
