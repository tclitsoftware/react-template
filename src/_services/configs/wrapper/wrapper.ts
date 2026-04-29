import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile:
    "https://api-magang.tcl-it.tech/kresna-wrapper/kresna-wrapper/swagger/kresna_wrapper_v1.swagger.json",
  apiFile: "../../api.ts",
  apiImport: "Api",
  outputFile: "../../modules/wrapperApi.ts",
  exportName: "wrapperApi",
  hooks: true,
};

export default config;