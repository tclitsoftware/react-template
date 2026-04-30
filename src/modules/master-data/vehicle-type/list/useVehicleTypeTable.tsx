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
  useMegaVehicleTypeServiceV1ListVehicleTypeTempTypesQuery,
} from "_services/modules/vehicleTypeApi";

const statusClasses: Record<NonNullable<VehicleTypeRow["status"]>, string> = {
  active: "bg-primary-600 border-2 border-primary-100",
  inactive: "bg-greyScale-60 border-2 border-greyScale-90",
  unknown: "bg-greyScale-60 border-2 border-greyScale-90",
};

const useVehicleTypeTable = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation("tables");
  const { t: tv } = useAppTranslation("vehicleType");
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [sortState, setSortState] = useState<TableSortState>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: categoryData } = useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery();
  const { data: tempTypeData } = useMegaVehicleTypeServiceV1ListVehicleTypeTempTypesQuery();

  const categoryOptions = useMemo(() => {
    const options = (categoryData?.vehicle_type_categories ?? []).map((cat) => ({
      label: cat.category_name ?? "--",
      value: cat.category_name ?? "", // Sending name because API expects 'vehicleCategoryName' string
    }));
    return [{ label: t("select-all"), value: "" }, ...options];
  }, [categoryData, t]);

  const tempTypeOptions = useMemo(() => {
    const options = (tempTypeData?.temp_types ?? []).map((type) => ({
      // Convert "Frozen" -> "temp-type-frozen"
      label: tv(`temp-type-${(type.name ?? "").toLowerCase()}` as any),
      value: type.id ?? "",
    }));
    return [{ label: t("select-all"), value: "" }, ...options];
  }, [tempTypeData, t, tv]);

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
        label: tv("field-name"),
        sortable: true,
        filterable: true,
      },
      {
        id: "vehicleCategoryName",
        fieldId: "category_name",
        label: tv("field-category"),
        sortable: true,
        filterable: true,
        filterId: "vehicleCategoryName",
        filterOptions: categoryOptions,
      },
      {
        id: "tempTypeId",
        fieldId: "temp_type_name",
        label: tv("field-temp-type"),
        sortable: true,
        filterable: true,
        filterId: "tempTypeId",
        filterOptions: tempTypeOptions,
        render: (row) => {
          if (row.temp_type_name === "Frozen") return tv("temp-type-frozen"); // this could be simpler by offloading all the rows translation to a global useMemo hook
          if (row.temp_type_name === "Dry") return tv("temp-type-dry");
          return row.temp_type_name ?? "---";
        },
      },
      {
        id: "status",
        fieldId: "status",
        label: t("column-status"),
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: t("select-all"), value: "" },
          { label: t("status-active"), value: "active" },
          { label: t("status-inactive"), value: "inactive" },
        ],
        render: (row) => {
          const statusKey = (row.status ?? "unknown") as keyof typeof statusClasses; // this is bad, should be separating all these into smaller renderer functions up there so it is easier to look at
          const dotClass = statusClasses[statusKey] ?? statusClasses.unknown;

          return (
            <div className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${dotClass}`} />
              <span className="capitalize">
                {row.status === "active" ? t("status-active") : t("status-inactive")}
              </span>
            </div>
          );
        },
      },
    ],
    [t, tv, categoryOptions, tempTypeOptions],
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
