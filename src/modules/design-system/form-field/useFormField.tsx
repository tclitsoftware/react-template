import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useFormField = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGlobalComponent({ title: "Form Field", hasBackButton: false }));
  }, []);

  return {};
};

export default useFormField;
