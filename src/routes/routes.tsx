import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "layout/dashboard";
import NotFoundPage, { notFoundRouteName } from "modules/not-found/index.page";
import ListProfilePage, { listProfilePageRouteName } from "modules/list-profile/index.page";
import ProfilePage, { profilePageRouteName } from "modules/profile/features/create/index.page";
import ColorsPage, { colorsPageRouteName } from "modules/design-system/colors/index.page";
import TypographyPage, { typographyPageRouteName } from "modules/design-system/typography/index.page";
import ButtonPage, { buttonPageRouteName } from "modules/design-system/button/index.page";
import FormFieldPage, { formFieldPageRouteName } from "modules/design-system/form-field/index.page";
import IconPage, { iconPageRouteName } from "modules/design-system/icon/index.page";
import TablesPage, { tablesPageRouteName } from "modules/design-system/tables/index.page";
import TranslationPage, { translationPageRouteName } from "modules/design-system/translation/index.page";

const publicRoutes: Array<RouteObject> = [
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: listProfilePageRouteName, element: <ListProfilePage /> },
      { path: profilePageRouteName, element: <ProfilePage /> },
      { path: tablesPageRouteName, element: <TablesPage /> },
      {
        path: "/components",
        children: [
          { path: typographyPageRouteName, element: <TypographyPage /> },
          { path: colorsPageRouteName, element: <ColorsPage /> },
          { path: buttonPageRouteName, element: <ButtonPage /> },
          { path: formFieldPageRouteName, element: <FormFieldPage /> },
          { path: iconPageRouteName, element: <IconPage /> },
          { path: translationPageRouteName, element: <TranslationPage /> },
        ],
      },
      { path: notFoundRouteName, element: <NotFoundPage /> },
      { path: "*", element: <Navigate to={notFoundRouteName} /> },
    ],
  },
]

export { publicRoutes };
