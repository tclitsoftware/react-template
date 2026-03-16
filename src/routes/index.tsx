import "react-toastify/dist/ReactToastify.css";
import { publicRoutes } from "./routes";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const element = useRoutes(publicRoutes);

  return <div>{element}</div>;
};

export default AppRoutes;
