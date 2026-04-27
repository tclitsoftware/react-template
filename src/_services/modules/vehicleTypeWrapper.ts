import { Api as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    megaWrapperServiceV1HealthCheck: build.query<
      MegaWrapperServiceV1HealthCheckApiResponse,
      MegaWrapperServiceV1HealthCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/health`,
        params: {
          source: queryArg.source,
        },
      }),
    }),
    megaWrapperServiceV1AsyncBatchCreateVehicleType: build.mutation<
      MegaWrapperServiceV1AsyncBatchCreateVehicleTypeApiResponse,
      MegaWrapperServiceV1AsyncBatchCreateVehicleTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/vehicle-type`,
        method: "POST",
        body: queryArg.megaWrapperAsyncBatchCreateVehicleTypeReq,
      }),
    }),
    megaWrapperServiceV1ListVehicleTypes: build.query<
      MegaWrapperServiceV1ListVehicleTypesApiResponse,
      MegaWrapperServiceV1ListVehicleTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/vehicle-types`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort_by: queryArg.sortBy,
          sort_order: queryArg.sortOrder,
          status: queryArg.status,
          temp_type_id: queryArg.tempTypeId,
          vehicle_type_name: queryArg.vehicleTypeName,
          vehicle_category_name: queryArg.vehicleCategoryName,
          created_by: queryArg.createdBy,
          updated_by: queryArg.updatedBy,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as vehicleTypeApi };
export type MegaWrapperServiceV1HealthCheckApiResponse =
  /** status 200 A successful response. */ MegaWrapperWrapperHealthCheckResponse;
export type MegaWrapperServiceV1HealthCheckApiArg = {
  source: string;
};
export type MegaWrapperServiceV1AsyncBatchCreateVehicleTypeApiResponse =
  /** status 200 A successful response. */ MegaWrapperAsyncBatchCreateVehicleTypeRes;
export type MegaWrapperServiceV1AsyncBatchCreateVehicleTypeApiArg = {
  megaWrapperAsyncBatchCreateVehicleTypeReq: MegaWrapperAsyncBatchCreateVehicleTypeReq;
};
export type MegaWrapperServiceV1ListVehicleTypesApiResponse =
  /** status 200 A successful response. */ MegaWrapperWrapperListVehicleTypesRes;
export type MegaWrapperServiceV1ListVehicleTypesApiArg = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  tempTypeId?: string;
  vehicleTypeName?: string;
  vehicleCategoryName?: string;
  createdBy?: string;
  updatedBy?: string;
};
export type MegaWrapperWrapperHealthCheckResponse = {
  status?: string;
  message?: string;
};
export type ProtobufAny = {
  "@type"?: string;
  [key: string]: any;
};
export type RpcStatus = {
  code?: number;
  message?: string;
  details?: ProtobufAny[];
};
export type MegaWrapperAsyncBatchCreateVehicleTypeRes = {
  message?: string;
};
export type MegaWrapperAsyncCreateVehicleTypesItem = {
  category_id: string;
  vehicle_type: string;
  temp_type_id?: string;
  is_chassis?: boolean;
  is_container?: boolean;
  status: string;
};
export type MegaWrapperAsyncBatchCreateVehicleTypeReq = {
  items: MegaWrapperAsyncCreateVehicleTypesItem[];
};
export type MegaWrapperWrapperVehicleTypeRes = {
  id?: string;
  category_id?: string;
  category_name?: string;
  vehicle_type?: string;
  temp_type_id?: string;
  temp_type_name?: string;
  is_chassis?: boolean;
  is_container?: boolean;
  status?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
};
export type MegaWrapperWrapperVehicleTypePaginationMeta = {
  total?: number;
  current_page?: number;
  limit?: number;
  total_item?: number;
  total_page?: number;
  have_next_page?: boolean;
  have_previous_page?: boolean;
};
export type MegaWrapperWrapperListVehicleTypesRes = {
  vehicle_types?: MegaWrapperWrapperVehicleTypeRes[];
  metadata?: MegaWrapperWrapperVehicleTypePaginationMeta;
};
export const {
  useMegaWrapperServiceV1HealthCheckQuery,
  useMegaWrapperServiceV1AsyncBatchCreateVehicleTypeMutation,
  useMegaWrapperServiceV1ListVehicleTypesQuery,
} = injectedRtkApi;
