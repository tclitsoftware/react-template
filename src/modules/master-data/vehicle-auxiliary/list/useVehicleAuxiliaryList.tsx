import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "components/button";
import Icon from "components/icon";
import { Columns, TableSortState } from "components/table";

import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";
import { useAppTranslation } from "locale/useAppTranslation";

import {
  KresnaWrapperKresnaWrapperVehicleAuxiliaryItem,
  KresnaWrapperServiceV1GetVehicleAuxiliaryListApiArg,
  useKresnaWrapperServiceV1GetVehicleAuxiliaryListQuery,
} from "_services/modules/wrapperApi";

import {
  useKresnaMasterDataServiceV1ActivateVehicleAuxiliaryMutation,
  useKresnaMasterDataServiceV1DeactivateVehicleAuxiliaryMutation,
} from "_services/modules/masterDataVehicleAuxiliaryApi";

type VehicleAuxiliaryRow =
  KresnaWrapperKresnaWrapperVehicleAuxiliaryItem;

type LocationState = {
  shouldRefetch?: boolean;
};

const useVehicleAuxiliaryList = () => {
  const { t } = useAppTranslation("vehicleAuxiliary");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState<
    Array<string | number>
  >([]);
  const [sortState, setSortState] =
    useState<TableSortState>(null);
  const [filterValues, setFilterValues] = useState<
    Record<string, string>
  >({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [activateVehicleAuxiliary, { isLoading: isActivating }] =
    useKresnaMasterDataServiceV1ActivateVehicleAuxiliaryMutation();

  const [deactivateVehicleAuxiliary, { isLoading: isDeactivating }] =
    useKresnaMasterDataServiceV1DeactivateVehicleAuxiliaryMutation();

  const queryParams: KresnaWrapperServiceV1GetVehicleAuxiliaryListApiArg =
    useMemo(
      () => ({
        page,
        size,
        sort: sortState?.columnId ?? undefined,
        order: sortState?.direction ?? undefined,
        auxiliaryName: filterValues.auxiliary_name || undefined,
        categoryId: filterValues.category_id || undefined,
        status: filterValues.status || undefined,
      }),
      [filterValues, page, size, sortState],
    );

  const { data, isFetching, error, refetch } =
    useKresnaWrapperServiceV1GetVehicleAuxiliaryListQuery(queryParams);

  useEffect(() => {
    dispatch(
      setGlobalComponent({
        title: t("title"),
        hasBackButton: false,
      }),
    );
  }, [dispatch, t]);

  useEffect(() => {
    const state = location.state as LocationState | null;

    if (state?.shouldRefetch) {
      refetch();
    }
  }, [location.state, refetch]);

  const rows: VehicleAuxiliaryRow[] = useMemo(() => {
    return data?.vehicle_auxiliary ?? [];
  }, [data]);

  const categoryOptions = useMemo(() => {
    const uniqueCategoryIds = Array.from(
      new Set(
        rows
          .map((item) => item.category_id)
          .filter(Boolean),
      ),
    );

    return uniqueCategoryIds.map((id) => ({
      value: id!,
      label: id!,
    }));
  }, [rows]);

  const metadata = data?.metadata;

  const handleSortStateChange = (next: TableSortState) => {
    setSortState(next);
    setPage(1);
  };

  const handleFilterValuesChange = (
    next: Record<string, string>,
  ) => {
    setFilterValues(next);
    setPage(1);
  };

  const handleEdit = useCallback(
    (id?: string) => {
      if (!id) return;

      navigate(`/master-data/vehicle-auxiliary/edit/${id}`);
    },
    [navigate],
  );

  const handleBulkStatusUpdate = useCallback(
    async (type: "activate" | "deactivate") => {
      if (!selectedKeys.length) {
        toast(t("selectAtLeastOne"));
        return;
      }

      try {
        const payload = {
          kresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest: {
            ids: selectedKeys.map(String),
          },
        };

        if (type === "activate") {
          await activateVehicleAuxiliary(payload).unwrap();
          toast(t("activateSuccess"));
        } else {
          await deactivateVehicleAuxiliary(payload).unwrap();
          toast(t("deactivateSuccess"));
        }

        setSelectedKeys([]);
        refetch();
      } catch (error) {
        console.log(error);
        toast(t("bulkActionFailed"));
      }
    },
    [
      activateVehicleAuxiliary,
      deactivateVehicleAuxiliary,
      refetch,
      selectedKeys,
      t,
    ],
  );

  const columns: Columns<VehicleAuxiliaryRow>[] = useMemo(
    () => [
      {
        id: "auxiliary_name",
        fieldId: "auxiliary_name",
        label: t("auxiliaryName"),
        sortable: true,
        filterable: true,
        filterPlaceholder: t("searchByAuxiliaryName"),
      },
      {
        id: "category_id",
        fieldId: "category_id",
        label: t("categoryId"),
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: t("allData"), value: "" },
          ...categoryOptions,
        ],
      },
      {
        id: "status",
        fieldId: "status",
        label: t("status"),
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: t("allData"), value: "" },
          { label: t("active"), value: "active" },
          { label: t("inactive"), value: "inactive" },
        ],
        render: (row) => {
          if (row.status === "active") {
            return <span>{t("active")}</span>;
          }

          if (row.status === "inactive") {
            return <span>{t("inactive")}</span>;
          }

          return <span>-</span>;
        },
      },
      {
        id: "created_at",
        fieldId: "created_at",
        label: t("createdAt"),
        sortable: true,
        render: (row) => (
          <span>
            {row.created_at
              ? new Date(row.created_at).toLocaleString()
              : "-"}
          </span>
        ),
      },
      {
        id: "action",
        fieldId: "id",
        label: t("action"),
        width: "220px",
        dragDisabled: true,
        render: (row) => (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              color="primary"
              size="small"
              iconLeft={<Icon name="frame" size={14} />}
              className="min-w-[72px]"
              onClick={() => handleEdit(row.id)}
            >
              {t("edit")}
            </Button>
          </div>
        ),
      },
    ],
    [categoryOptions, handleEdit, t],
  );

  return {
    columns,
    data: rows,
    categoryOptions,
    isFetching,
    error,
    refetch,
    queryParams,
    metadata,
    page,
    size,
    setPage,
    setSize,
    selectedKeys,
    setSelectedKeys,
    sortState,
    setSortState: handleSortStateChange,
    filterValues,
    setFilterValues: handleFilterValuesChange,
    handleBulkStatusUpdate,
    isActivating,
    isDeactivating,
  };
};

export default useVehicleAuxiliaryList;