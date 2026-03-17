import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useState } from "react";
// import Header from "components/shared/header";
import Sidebar from "components/shared/sidebar";
import Container from "layout/container";
import "react-datetime/css/react-datetime.css";
import Header from "components/shared/header";
import { useAppSelector } from "store";

const DashboardLayout: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { showSideBar } = useAppSelector(state => state.globalComponent);

  return (
    <>
      <Helmet>
        <title>{t("Admin Portal")}</title>
      </Helmet>
      <div className="flex">
        <Sidebar active={showSideBar!} />
        <Container className={`${showSideBar ? "w-[80%]" : "w-full"} transition-all`}>
          <Header className={`${showSideBar ? "w-[80%]" : "w-full"} transition-all`} />
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default DashboardLayout;
