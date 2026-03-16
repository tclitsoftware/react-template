import { useGetCustomerTableQuery, CustomerRow } from "_services/modules/table-example";
import Button from "components/button";
import Icon from "components/icon";
import { TableSortState, Columns } from "components/table";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";

const statusClasses: Record<CustomerRow["status"], string> = {
  active: "bg-primary-600",
  pending: "bg-warning-500",
  inactive: "bg-greyScale-60",
};

const useTables = () => {
  const dispatch = useAppDispatch();
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
    dispatch(setGlobalComponent({ title: "Data Tables", hasBackButton: false }));
  }, []);

  const columns: Columns<CustomerRow>[] = useMemo(
    () => [
      {
        id: "customer",
        fieldId: "customer",
        label: "Customer",
        sortable: true,
        filterable: true,
        filterPlaceholder: "Search by",
      },
      {
        id: "quantity",
        fieldId: "quantity",
        label: "Quantity",
        sortable: true,
        filterable: true,
        filterPlaceholder: "Search by",
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
        label: "Status",
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: "All Data", value: "" },
          { label: "Active", value: "active" },
          { label: "Pending", value: "pending" },
          { label: "Inactive", value: "inactive" },
        ],
        width: "260px",
        render: (row) => (
          <div className="inline-flex items-center gap-2 text-base text-primary-600">
            <span
              className={`h-3 w-3 rounded-full ${statusClasses[row.status]}`}
            />
            <span className="capitalize">{row.status}</span>
          </div>
        ),
      },
      {
        id: "action",
        fieldId: "id",
        label: "Action",
        width: "260px",
        dragDisabled: true,
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
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              color="primary"
              size="small"
              iconLeft={<Icon name="frame" size={14} />}
              className="min-w-[72px]"
            >
              Edit
            </Button>
          </div>
        ),
      },
    ],
    [],
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
