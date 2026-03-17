import { useGetCustomerTableQuery, CustomerRow } from "_services/modules/table-example";
import Button from "components/button";
import Icon from "components/icon";
import Input from "components/input";
import { TableSortState, Columns } from "components/table";
import { useEffect, useMemo, useState } from "react";
import { useAppTranslation } from "locale/useAppTranslation";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const statusClasses: Record<CustomerRow["status"], string> = {
  active: "bg-primary-600 border-2 border-primary-100",
  pending: "bg-warning-500 border-2 border-warning-100",
  inactive: "bg-greyScale-60 border-2 border-greyScale-90",
};

const useTables = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation("tables");
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [sortState, setSortState] = useState<TableSortState>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const queryParams = useMemo(
    () => ({
      sortBy: sortState?.columnId ?? null,
      sortDirection: sortState?.direction ?? null,
      filters: filterValues,
    }),
    [filterValues, sortState],
  );
  const { data, isFetching, error } = useGetCustomerTableQuery(queryParams);

  useEffect(() => {
    dispatch(setGlobalComponent({ title: t("page-title"), hasBackButton: false }));
  }, [dispatch, t]);

  const columns: Columns<CustomerRow>[] = useMemo(
    () => [
      {
        id: "customer",
        fieldId: "customer",
        label: t("column-customer"),
        sortable: true,
        filterable: true,
        filterPlaceholder: t("filter-search-by"),
      },
      {
        id: "quantity",
        fieldId: "quantity",
        label: t("column-quantity"),
        sortable: true,
        filterable: true,
        filterPlaceholder: t("filter-search-by"),
        render: (row) => (
          <div className="flex flex-col gap-1">
            <span className="text-[24px] leading-none text-text-secondary">
              {row.quantity}
            </span>
            <span className="text-sm text-text-tertiary">{row.unit}</span>
          </div>
        ),
      },
      {
        fieldId: "status",
        label: t("column-status"),
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: t("filter-all-data"), value: "" },
          { label: t("status-active"), value: "active" },
          { label: t("status-pending"), value: "pending" },
          { label: t("status-inactive"), value: "inactive" },
        ],
        width: "260px",
        render: (row) => (
          <div className="inline-flex items-center gap-2 text-base text-primary-600">
            <span
              className={`h-3.5 w-3.5 rounded-full ${statusClasses[row.status]}`}
            />
            <span>{t(`status-${row.status}` as never)}</span>
          </div>
        ),
      },
      {
        id: "action",
        fieldId: "id",
        label: t("column-action"),
        width: "260px",
        dragDisabled: true,
        renderFilter: ({ onChange }) => {
          return (
            <Input type="date" onChange={(e) => { onChange(e.target.value) }} />
          );
        },
        render: () => (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              color="primary"
              size="small"
              iconLeft={<Icon name="frame" size={14} />}
              className="min-w-[72px]"
            >
              {t("action-edit")}
            </Button>
            <Button
              type="button"
              variant="outline"
              color="primary"
              size="small"
              iconLeft={<Icon name="frame" size={14} />}
              className="min-w-[72px]"
            >
              {t("action-edit")}
            </Button>
          </div>
        ),
      },
    ],
    [t],
  );

  return {
    columns,
    sortState,
    filterValues,
    queryParams,
    data,
    isFetching,
    error,
    selectedKeys,
    setSelectedKeys,
    setSortState,
    setFilterValues,
  };
};

export default useTables;
