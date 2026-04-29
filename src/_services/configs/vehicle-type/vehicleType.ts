import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile:
    "https://api-magang.tcl-it.tech/mega-master-data/mega-master-data/swagger/mega_vehicle_type_v1.swagger.json",
  apiFile: "../../api.ts",
  apiImport: "Api",
  outputFile: "../../modules/vehicleTypeApi.ts",
  exportName: "vehicleTypeApi",
  hooks: true,
  tag: true,
};

export default config;
