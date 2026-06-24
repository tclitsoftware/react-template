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
import VehicleTypePage, { vehicleTypePageRouteName } from "modules/master-data/vehicle-type/list/index.page";
import VehicleModelPage, { vehicleModelPageRouteName } from "modules/master-data/vehicle-model/list/index.page";
import FreezerModelPage, { freezerModelPageRouteName } from "modules/master-data/freezer-model/list/index.page";
import VehicleAuxiliaryPage, { vehicleAuxiliaryPageRouteName } from "modules/master-data/vehicle-auxiliary/list/index.page";
import FuelTypePage, { fuelTypePageRouteName } from "modules/config/fuel-type/index.page";
import TripTypePage, { tripTypePageRouteName } from "modules/config/trip-type/index.page";
import DistanceTypePage, { distanceTypePageRouteName } from "modules/config/distance-type/index.page";
import TripDaysThresholdPage, { tripDaysThresholdPageRouteName } from "modules/config/trip-days-threshold/index.page";
import WaitingTimeRatePage, { waitingTimeRatePageRouteName } from "modules/config/waiting-time-rate/index.page";
import VehicleOperationConfigPage, { vehicleOperationConfigPageRouteName } from "modules/config/vehicle-operation-config/index.page";
import DriverAllowancePage, { driverAllowancePageRouteName } from "modules/config/driver-allowance/index.page";
import DriverTripCalculatorPage, { driverTripCalculatorPageRouteName } from "modules/driver-trip-calculator/index.page";


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
      { path: vehicleTypePageRouteName, element: <VehicleTypePage /> },
      { path: vehicleModelPageRouteName, element: <VehicleModelPage /> },
      { path: freezerModelPageRouteName, element: <FreezerModelPage /> },
      { path: vehicleAuxiliaryPageRouteName, element: <VehicleAuxiliaryPage /> },
      { path: fuelTypePageRouteName, element: <FuelTypePage /> },
      { path: tripTypePageRouteName, element: <TripTypePage /> },
      { path: distanceTypePageRouteName, element: <DistanceTypePage /> },
      { path: tripDaysThresholdPageRouteName, element: <TripDaysThresholdPage /> },
      { path: waitingTimeRatePageRouteName, element: <WaitingTimeRatePage /> },
      { path: vehicleOperationConfigPageRouteName, element: <VehicleOperationConfigPage /> },
      { path: driverAllowancePageRouteName, element: <DriverAllowancePage /> },
      { path: driverTripCalculatorPageRouteName, element: <DriverTripCalculatorPage /> },
    ],
  },
]

export { publicRoutes };
