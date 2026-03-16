import Typography from "components/typography";
import ColorSwatch from "../components/color-swatch.component";
import { utilityPalettes } from "../constants";

const UtilityTokensSection = () => {
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">Utility tokens</Typography>
      <Typography variant="bodySmall" tone="muted">
        Accessibility-focused tokens used for text, backgrounds, borders, and dividers.
      </Typography>
      <div className="grid gap-6">
        {utilityPalettes.map((palette) => (
          <div key={palette.name} className="space-y-3">
            <Typography variant="heading5" weight="semibold">
              {palette.name}
            </Typography>
            <Typography variant="bodySmall" tone="muted">
              {palette.description}
            </Typography>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {palette.shades.map((shade) => (
                <ColorSwatch
                  key={`${palette.name}-${shade.label}`}
                  label={shade.label}
                  value={shade.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UtilityTokensSection;