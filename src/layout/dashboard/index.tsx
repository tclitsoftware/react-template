import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { useState } from "react";
// import Header from "components/shared/header";
import Sidebar from "components/shared/sidebar";
import Container from "layout/container";
import "react-datetime/css/react-datetime.css";
import Header from "components/shared/header";
import { useAppTranslation } from "locale/useAppTranslation";
import { useAppSelector } from "store";

const DashboardLayout: React.FC = (): JSX.Element => {
  const { t } = useAppTranslation("menu");
  const { showSideBar } = useAppSelector(state => state.globalComponent);

  return (
    <>
      <Helmet>
        <title>{t("browser-title")}</title>
      </Helmet>
      <div className="flex">
        <Header className={`w-full transition-all`} />
        <Sidebar active={showSideBar!} />
        <Container className={`${showSideBar ? "w-[80%]" : "w-full"} transition-all`}>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default DashboardLayout;
