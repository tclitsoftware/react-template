import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useIcon = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGlobalComponent({ title: "Icon System", hasBackButton: false }));
  }, []);

  return {};
};

export default useIcon;
