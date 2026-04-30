import { VehicleTypeItemValue } from "../types";

export interface ExcelRow {
  "Vehicle Type"?: string;
  Category?: string;
  "Temp Type"?: string;
  "Is Chassis"?: string;
  "Is Container"?: string;
  "Is Active"?: string;
  [key: string]: any;
}

export const mapExcelToVehicleType = (
  rows: ExcelRow[],
  categories: { id: string; name: string }[],
  tempTypes: { id: string; name: string }[],
): Partial<VehicleTypeItemValue>[] => {
  return rows.map((row) => {
    const category = categories.find(
      (c) => c.name.toLowerCase() === row["Category"]?.toLowerCase(),
    );
    const tempType = tempTypes.find(
      (t) => t.name.toLowerCase() === row["Temp Type"]?.toLowerCase(),
    );
    const toBool = (val?: string) => val?.toLowerCase() === "yes" || val === "true";

    return {
      vehicle_type: row["Vehicle Type"] || "",
      category_id: category?.id || "",
      temp_type_id: tempType?.id || "",
      is_chassis: toBool(row["Is Chassis"]),
      is_container: toBool(row["Is Container"]),
      is_active: toBool(row["Is Active"]),
    };
  });
};
