import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useColor = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGlobalComponent({ title: "Color Tokens", hasBackButton: false }));
  }, []);
  return {};
}

export default useColor;