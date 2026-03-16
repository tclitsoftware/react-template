import useButton from "./useButton";
import FillSection from "./sections/fill.section";
import IconSection from "./sections/icon.section";
import OutlineSection from "./sections/outline.section";
import SizeSection from "./sections/sizes.section";

export const buttonPageRouteName = "/components/buttons";

const ButtonPage = () => {
  useButton();

  return (
    <div className="flex flex-col gap-8">
      <FillSection />
      <OutlineSection />
      <SizeSection />
      <IconSection />
    </div>
  );
};

export default ButtonPage;
