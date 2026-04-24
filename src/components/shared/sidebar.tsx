import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar, {
  NavbarItemDefinition,
  NavbarSectionDefinition,
} from "components/navbar";
import { listProfilePageRouteName } from "modules/list-profile/index.page";
import { useAppDispatch } from "store";
import { toggleSideBar } from "store/global-components";
import { typographyPageRouteName } from "modules/design-system/typography/index.page";
import { colorsPageRouteName } from "modules/design-system/colors/index.page";
import { buttonPageRouteName } from "modules/design-system/button/index.page";
import { formFieldPageRouteName } from "modules/design-system/form-field/index.page";
import { iconPageRouteName } from "modules/design-system/icon/index.page";
import { tablesPageRouteName } from "modules/design-system/tables/index.page";
import { translationPageRouteName } from "modules/design-system/translation/index.page";
import { vehicleTypePageRouteName } from "modules/master-data/vehicle-type/list/index.page";
import { vehicleModelPageRouteName } from "modules/master-data/vehicle-model/list/index.page";
import { freezerModelPageRouteName } from "modules/master-data/freezer-model/list/index.page";
import { vehicleAuxiliaryPageRouteName } from "modules/master-data/vehicle-auxiliary/list/index.page";
import { fuelTypePageRouteName } from "modules/config/fuel-type/index.page";
import { tripTypePageRouteName } from "modules/config/trip-type/index.page";
import { distanceTypePageRouteName } from "modules/config/distance-type/index.page";
import { tripDaysThresholdPageRouteName } from "modules/config/trip-days-threshold/index.page";
import { waitingTimeRatePageRouteName } from "modules/config/waiting-time-rate/index.page";
import { vehicleOperationConfigPageRouteName } from "modules/config/vehicle-operation-config/index.page";
import { driverAllowancePageRouteName } from "modules/config/driver-allowance/index.page";
import { driverTripCalculatorPageRouteName } from "modules/driver-trip-calculator/index.page";
import { useAppTranslation } from "locale/useAppTranslation";

interface SidebarProps {
  active: boolean;
}

const navSections: NavbarSectionDefinition[] = [
  // {
  //   id: "components",
  //   title: "Components",
  //   items: [
  //     {
  //       id: "typography",
  //       title: "Typography",
  //       path: typographyPageRouteName,
  //     },
  //     {
  //       id: "colors",
  //       title: "Colors",
  //       path: colorsPageRouteName,
  //     },
  //     {
  //       id: "buttons",
  //       title: "Buttons",
  //       path: buttonPageRouteName,
  //     },
  //     {
  //       id: "form-fields",
  //       title: "Form Fields",
  //       path: formFieldPageRouteName,
  //     },
  //     {
  //       id: "icons",
  //       title: "Icons",
  //       path: iconPageRouteName,
  //     },
  //     {
  //       id: "translations",
  //       title: "Translations",
  //       path: translationPageRouteName,
  //     },
  //     {
  //       id: "tables",
  //       title: "Tables",
  //       path: tablesPageRouteName,
  //     },
  //   ],
  // },
  // {
  //   id: "main",
  //   title: "MAIN",
  //   items: [
  //     {
  //       id: `main-${listProfilePageRouteName}`,
  //       title: "User Management",
  //       path: listProfilePageRouteName,
  //     },
  //   ],
  // },
  {
    id: "master-data",
    title: "MASTER DATA",
    items: [
      {
        id: "vehicle-type",
        title: "Vehicle Type",
        path: vehicleTypePageRouteName,
      },
      {
        id: "vehicle-model",
        title: "Vehicle Model",
        path: vehicleModelPageRouteName,
      },
      {
        id: "freezer-model",
        title: "Freezer Model",
        path: freezerModelPageRouteName,
      },
      {
        id: "vehicle-auxiliary",
        title: "Vehicle Auxiliary",
        path: vehicleAuxiliaryPageRouteName,
      },
    ],
  },
  {
    id: "data-configuration",
    title: "DATA CONFIGURATION",
    items: [
      {
        id: "fuel-type",
        title: "Fuel Type",
        path: fuelTypePageRouteName,
      },
      {
        id: "trip-type",
        title: "Trip Type",
        path: tripTypePageRouteName,
      },
      {
        id: "distance-type",
        title: "Distance Type",
        path: distanceTypePageRouteName,
      },
      {
        id: "trip-days-threshold",
        title: "Trip Days Threshold",
        path: tripDaysThresholdPageRouteName,
      },
      {
        id: "waiting-time-rate",
        title: "Waiting Time Rate",
        path: waitingTimeRatePageRouteName,
      },
    ],
  },
  {
    id: "operation-configuration",
    title: "OPERATION CONFIGURATION",
    items: [
      {
        id: "vehicle-operation",
        title: "Vehicle Operation",
        path: vehicleOperationConfigPageRouteName,
      },
      {
        id: "driver-allowance",
        title: "Driver Allowance",
        path: driverAllowancePageRouteName,
      },
    ],
  },
  {
    id: "menu-calculator",
    title: "MENU CALCULATOR",
    items: [
      {
        id: "driver-trip-calculator",
        title: "Driver Trip Calculator",
        path: driverTripCalculatorPageRouteName,
      },
    ],
  },
];

const allNavItems = navSections.flatMap((section) => section.items);

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const { t } = useAppTranslation("menu");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const activeItemId = allNavItems.find((item) =>
    item.path ? location.pathname.startsWith(item.path) : false,
  )?.id;

  const handleItemClick = (item: NavbarItemDefinition) => {
    if (!item.path) {
      return;
    }
    if (window.innerWidth < 1024) {
      dispatch(toggleSideBar());
    }
    navigate(item.path);
  };

  return (
    <aside
      className={`z-[998] max-h-screen h-screen overflow-auto relative top-0 transition-all duration-300 bg-white border-r border-border shadow-lg ${active ? "left-0 w-[20%]" : "-left-[20%] w-[0%]"
        }`}
    >
      <Navbar
        sections={navSections.map((section) => ({
          ...section,
          title: t(`section-${section.id}` as any) || section.title,
          items: section.items.map((item) => ({
            ...item,
            title: t(`nav-${item.id}` as any) || item.title,
          })),
        }))}
        activeItemId={activeItemId}
        onItemClick={handleItemClick}
        className="h-full"
      />
    </aside>
  );
};

export default Sidebar;
