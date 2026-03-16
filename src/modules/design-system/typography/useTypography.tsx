import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useTypography = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGlobalComponent({ title: "Typography System", hasBackButton: false }));
  }, []);
  return {};
}

export default useTypography;