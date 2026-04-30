import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile:
    "https://api-magang.tcl-it.tech/mega-wrapper/mega-wrapper/swagger/mega_wrapper_v1.swagger.json",
  apiFile: "../../wrapperApi.ts",
  apiImport: "WrapperApi",
  outputFile: "../../modules/vehicleTypeWrapper.ts",
  exportName: "vehicleTypeApi",
  hooks: true,
  tag: true,
};

export default config;
