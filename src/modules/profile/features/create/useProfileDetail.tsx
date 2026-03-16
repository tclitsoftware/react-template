import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const useProfileDetail = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setGlobalComponent({
      title: "Profile Details",
      hasBackButton: true,
    }));
  }, []);

  return {};
}

export default useProfileDetail;