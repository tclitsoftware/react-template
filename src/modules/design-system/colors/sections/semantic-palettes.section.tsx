import Typography from "components/typography";
import ColorSwatch from "../components/color-swatch.component";
import { semanticPalettes } from "../constants";

const SemanticPalettesSection = () => {
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">Semantic palettes</Typography>
      <Typography variant="bodySmall" tone="muted">
        Contextual colors for success, warning, info, and error states.
      </Typography>
      <div className="grid gap-6">
        {semanticPalettes.map((palette) => (
          <div key={palette.name} className="space-y-3">
            <Typography variant="heading5" weight="semibold">
              {palette.name}
            </Typography>
            {palette.description && (
              <Typography variant="bodySmall" tone="muted">
                {palette.description}
              </Typography>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

export default SemanticPalettesSection;