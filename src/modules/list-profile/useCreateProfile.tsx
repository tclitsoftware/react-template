import { useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useCreateProfile = () => {
  const dispatch = useAppDispatch();
  const [test] = useState(true);

  useEffect(() => {
    dispatch(setGlobalComponent({ hasBackButton: false, title: "List Profile" }));
  }, []);

  return { test }
}

export default useCreateProfile;