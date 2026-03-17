import { useCallback, useEffect, useState } from "react";
import Typography from "components/typography";
import Select from "components/select";
import { useAppTranslation } from "locale/useAppTranslation";
import {
  useCreateOptionMutation,
  useLazySearchOptionsQuery,
} from "_services/modules/select-example";

const SearchableSelectSection = () => {
  const { t } = useAppTranslation("formField");
  const [trigger, { data, isFetching }] = useLazySearchOptionsQuery();
  const [createOption] = useCreateOptionMutation();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    trigger("");
  }, [trigger]);

  const handleSearch = useCallback(
    async (term: string) => {
      const response = await trigger(term).unwrap();
      return response;
    },
    [trigger],
  );

  const handleCreate = useCallback(
    async (term: string) => {
      const createdOption = await createOption(term).unwrap();
      await trigger(term);
      return createdOption;
    },
    [createOption, trigger],
  );

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("searchable-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("searchable-description")}
      </Typography>
      <Select
        label={t("team-label")}
        helperText={t("searchable-helper")}
        options={data ?? []}
        multiple
        searchable
        loading={isFetching}
        onSearch={handleSearch}
        onCreateOption={handleCreate}
        createOptionLabel={(term) => `${t("searchable-add-prefix")} "${term}"`}
        value={selected}
        onValueChange={(next) =>
          setSelected(Array.isArray(next) ? next : next ? [next] : [])
        }
        noOptionsText={t("searchable-empty")}
      />
      <Typography variant="body" tone="muted">
        {`${t("searchable-selected")}: ${selected.length ? selected.join(", ") : t("searchable-none")}`}
      </Typography>
    </section>
  );
};

export default SearchableSelectSection;
