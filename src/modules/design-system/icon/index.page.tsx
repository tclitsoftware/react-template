import useIcon from "./useIcon";
import IconGallerySection from "./sections/gallery.section";
import IconOverviewSection from "./sections/overview.section";

export const iconPageRouteName = "/components/icons";

const IconPage = () => {
  useIcon();

  return (
    <div className="flex flex-col gap-8">
      <IconOverviewSection />
      <IconGallerySection />
    </div>
  );
};

export default IconPage;
