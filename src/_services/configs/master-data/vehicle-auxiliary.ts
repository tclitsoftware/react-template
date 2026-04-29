import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile:
    "https://api-magang.tcl-it.tech/kresna-master-data/kresna-master-data/swagger/kresna_master_data_v1.swagger.json",
  apiFile: "../../api.ts",
  apiImport: "Api",
  outputFile: "../../modules/masterDataVehicleAuxiliaryApi.ts",
  exportName: "masterDataVehicleAuxiliaryApi",
  hooks: true,
};

export default config;