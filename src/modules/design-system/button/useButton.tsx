import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useButton = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGlobalComponent({ title: "Button System", hasBackButton: false }));
  }, []);

  return {};
};

export default useButton;
