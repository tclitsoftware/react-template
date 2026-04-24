import general from "./general.json";
import menu from "./menu.json";
import translation from "./translation.json";
import button from "./button.json";
import colors from "./colors.json";
import formField from "./form-field.json";
import icon from "./icon.json";
import tables from "./tables.json";
import typography from "./typography.json";
import login from "./login.json";
import historyPanel from "./history-panel.json";

export const id = {
  button,
  colors,
  formField,
  general,
  icon,
  menu,
  tables,
  translation,
  typography,
  login,
  historyPanel,
} as const;

export default id;
