import useColor from "./useColor";
import BrandPalettesSection from "./sections/brand-palettes.section";
import SemanticPalettesSection from "./sections/semantic-palettes.section";
import GrayScaleSection from "./sections/gray-scale.section";
import UtilityTokensSection from "./sections/utility-tokens.section";

export const colorsPageRouteName = "/components/colors";
const ColorsPage = () => {
  useColor();

  return (
    <div className="flex flex-col gap-8">
      <BrandPalettesSection />
      <SemanticPalettesSection />
      <GrayScaleSection />
      <UtilityTokensSection />
    </div>
  );
};

export default ColorsPage;
