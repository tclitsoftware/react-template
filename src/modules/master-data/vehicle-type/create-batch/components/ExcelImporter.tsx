import React, { useRef } from "react";
import Button from "components/button";
import Icon from "components/icon";
import { useAppTranslation } from "locale/useAppTranslation";

interface ExcelImporterProps {
  onImport: (file: File) => void;
}

export const ExcelImporter = ({ onImport }: ExcelImporterProps) => {
  const { t } = useAppTranslation("vehicleType");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset input so the same file can be uploaded again
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept=".xlsx, .xls, .csv"
        className="hidden"
      />
      <Button variant="outline" onClick={handleClick} iconLeft={<Icon name="import" size={16} />}>
        {t("button-import-excel")}
      </Button>
    </>
  );
};
