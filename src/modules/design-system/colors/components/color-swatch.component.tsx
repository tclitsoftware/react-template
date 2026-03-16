import { ColorShade } from "_interfaces/colors-component.interfaces";
import Typography from "components/typography";

const ColorSwatch = ({ label, value }: ColorShade) => (
  <div className="rounded-2xl border border-border shadow-sm overflow-hidden">
    <div
      className="h-16"
      style={{
        backgroundColor: value,
      }}
    />
    <div className="flex justify-between items-center px-3 py-2 bg-white">
      <Typography variant="bodySmall" tone="muted">
        {label}
      </Typography>
      <Typography
        variant="bodyExtraSmall"
        tone="muted"
        weight="light"
        className="font-mono"
      >
        {value}
      </Typography>
    </div>
  </div>
);

export default ColorSwatch;