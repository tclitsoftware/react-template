import { useCallback, useEffect, useState } from "react";
import Typography from "components/typography";
import Select from "components/select";
import {
  useCreateOptionMutation,
  useLazySearchOptionsQuery,
} from "_services/modules/select-example";

const SearchableSelectSection = () => {
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
      <Typography variant="heading3">Searchable select</Typography>
      <Typography variant="bodySmall" tone="muted">
        Multiselect dropdown can fetch search results and create missing options via RTK Query.
      </Typography>
      <Select
        label="Team"
        helperText="Type to search, and add a new option if no result is returned"
        options={data ?? []}
        multiple
        searchable
        loading={isFetching}
        onSearch={handleSearch}
        onCreateOption={handleCreate}
        createOptionLabel={(term) => `Add "${term}"`}
        value={selected}
        onValueChange={(next) =>
          setSelected(Array.isArray(next) ? next : next ? [next] : [])
        }
        noOptionsText="Try another keyword"
      />
      <Typography variant="body" tone="muted">
        Selected: {selected.length ? selected.join(", ") : "none"}
      </Typography>
    </section>
  );
};

export default SearchableSelectSection;
