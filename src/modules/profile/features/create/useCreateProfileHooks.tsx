import { useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useCreateProfileHooks = () => {
  const dispatch = useAppDispatch();
  const [test] = useState(true);

  useEffect(() => {
    dispatch(setGlobalComponent({ hasBackButton: true, title: "List Profile" }));
  }, []);

  return { test }
}

export default useCreateProfileHooks;