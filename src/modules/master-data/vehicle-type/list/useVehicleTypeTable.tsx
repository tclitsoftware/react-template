import {
  useMegaWrapperServiceV1ListVehicleTypesQuery,
  MegaWrapperWrapperVehicleTypeRes as VehicleTypeRow,
} from "_services/modules/vehicleTypeWrapper";
import Button from "components/button";
import Icon from "components/icon";
import Input from "components/input";
import { TableSortState, Columns } from "components/table";
import { useEffect, useMemo, useState } from "react";
import { useAppTranslation } from "locale/useAppTranslation";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";
import {
  useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery,
} from "_services/modules/vehicleTypeApi";

const statusClasses: Record<NonNullable<VehicleTypeRow["status"]>, string> = {
  active: "bg-primary-600 border-2 border-primary-100",
  inactive: "bg-greyScale-60 border-2 border-greyScale-90",
  unknown: "bg-greyScale-60 border-2 border-greyScale-90",
};

const useVehicleTypeTable = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation("tables");
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [sortState, setSortState] = useState<TableSortState>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: categoryData } = useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery();

  const categoryOptions = useMemo(() => {
    const options = (categoryData?.vehicle_type_categories ?? []).map((cat) => ({
      label: cat.category_name ?? "--",
      value: cat.category_name ?? "", // Sending name because API expects 'vehicleCategoryName' string
    }));
    return [{ label: t("filter-all" as never), value: "" }, ...options];
  }, [categoryData, t]);

  useEffect(() => {
    setPage(1); // Reset to first page when filters change
  }, [filterValues, sortState]);

  const queryParams = useMemo(
    () => ({
      page: page,
      size: limit,
      sortBy: sortState?.columnId ?? undefined,
      sortOrder: sortState?.direction ?? undefined,
      ...filterValues,
    }),
    [filterValues, sortState, page],
  );
  const { data, isFetching, error } = useMegaWrapperServiceV1ListVehicleTypesQuery(queryParams);

  const [activate, { isLoading: isActivating }] =
    useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation();
  const [deactivate, { isLoading: isDeactivating }] =
    useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation();

  // this is the activate function
  const onBulkActivate = async () => {
    if (selectedKeys.length === 0) return;
    try {
      await activate({
        megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: {
          ids: selectedKeys.map(String), // let's do this for now, next we'll try yup
        },
      }).unwrap();
      setSelectedKeys([]); // clear selection
    } catch (err) {
      console.error("Bulk activation fail", err); // this is not good but it should be okay for now
    }
  };

  // the deactivate function, should be similar, what's different should be their payload only
  const onBulkDeactivate = async () => {
    if (selectedKeys.length === 0) return;
    try {
      await deactivate({
        megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: {
          ids: selectedKeys.map(String), // let's do this for now, next we'll try yup
        },
      }).unwrap();
      setSelectedKeys([]); // clear selection
    } catch (err) {
      console.error("Bulk deactivation fail", err); // this is not good but it should be okay for now
    }
  };

  useEffect(() => {
    dispatch(setGlobalComponent({ title: t("page-title"), hasBackButton: false }));
  }, [dispatch, t]);

  const columns: Columns<VehicleTypeRow>[] = useMemo(
    () => [
      {
        id: "vehicle-type",
        fieldId: "vehicle_type",
        label: t("vehicle-type" as never), // as never so it doesn't halt compilation
        sortable: true,
        filterable: true,
      },
      {
        id: "vehicleCategoryName",
        fieldId: "category_name",
        label: t("column-category" as never),
        sortable: true,
        filterable: true,
        filterId: "vehicleCategoryName",
        filterOptions: categoryOptions,
      },
      {
        id: "temp-type",
        fieldId: "temp_type_name",
        label: t("column-temp-type" as never),
        sortable: true,
        filterable: true,
        filterId: "tempTypeId",
      },
      {
        id: "status",
        fieldId: "status",
        label: t("column-status" as never),
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: t("filter-all" as never), value: "" },
          { label: t("status-active" as never), value: "active" },
          { label: t("status-inactive" as never), value: "inactive" },
        ],
        render: (row) => (
          <div className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${statusClasses[row.status ?? "unknown"]}`} />
            <span className="capitalize">{row.status}</span>
          </div>
        ),
      },
    ],
    [t],
  );

  return {
    page,
    setPage,
    limit,
    totalPage: data?.metadata?.total_page ?? 1,
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
    onBulkActivate,
    onBulkDeactivate,
    isBulkProcessing: isActivating || isDeactivating, // export this too so button state is easy to manage
  };
};

export default useVehicleTypeTable;
