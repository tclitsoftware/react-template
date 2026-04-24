import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile:
    "https://api-dev.internal.tcl-it.tech/example/example/swagger/example_v1.swagger.json",
  apiFile: "../../api.ts",
  apiImport: "Api",
  outputFile: "../../modules/exampleApi.ts",
  exportName: "exampleApi",
  hooks: true,
};

export default config;
