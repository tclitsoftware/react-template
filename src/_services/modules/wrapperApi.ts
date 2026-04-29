import { Api as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    kresnaWrapperServiceV1HealthCheck: build.query<
      KresnaWrapperServiceV1HealthCheckApiResponse,
      KresnaWrapperServiceV1HealthCheckApiArg
    >({
      query: () => ({ url: `/kresna-wrapper/v1/health` }),
    }),
    kresnaWrapperServiceV1GetVehicleAuxiliaryList: build.query<
      KresnaWrapperServiceV1GetVehicleAuxiliaryListApiResponse,
      KresnaWrapperServiceV1GetVehicleAuxiliaryListApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-wrapper/v1/vehicle-auxiliary`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
          order: queryArg.order,
          status: queryArg.status,
          category_id: queryArg.categoryId,
          auxiliary_name: queryArg.auxiliaryName,
        },
      }),
    }),
    kresnaWrapperServiceV1CreateVehicleAuxiliary: build.mutation<
      KresnaWrapperServiceV1CreateVehicleAuxiliaryApiResponse,
      KresnaWrapperServiceV1CreateVehicleAuxiliaryApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-wrapper/v1/vehicle-auxiliary`,
        method: "POST",
        body: queryArg.kresnaWrapperKresnaWrapperCreateVehicleAuxiliaryRequest,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as wrapperApi };
export type KresnaWrapperServiceV1HealthCheckApiResponse =
  /** status 200 A successful response. */ KresnaWrapperKresnaWrapperHealthCheckResponse;
export type KresnaWrapperServiceV1HealthCheckApiArg = void;
export type KresnaWrapperServiceV1GetVehicleAuxiliaryListApiResponse =
  /** status 200 A successful response. */ KresnaWrapperKresnaWrapperGetVehicleAuxiliaryListResponse;
export type KresnaWrapperServiceV1GetVehicleAuxiliaryListApiArg = {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  status?: string;
  categoryId?: string;
  auxiliaryName?: string;
};
export type KresnaWrapperServiceV1CreateVehicleAuxiliaryApiResponse =
  /** status 200 A successful response. */ KresnaWrapperKresnaWrapperVehicleAuxiliaryMessageResponse;
export type KresnaWrapperServiceV1CreateVehicleAuxiliaryApiArg = {
  kresnaWrapperKresnaWrapperCreateVehicleAuxiliaryRequest: KresnaWrapperKresnaWrapperCreateVehicleAuxiliaryRequest;
};
export type KresnaWrapperKresnaWrapperHealthCheckResponse = {
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
export type KresnaWrapperKresnaWrapperVehicleAuxiliaryItem = {
  id?: string;
  category_id?: string;
  auxiliary_name?: string;
  status?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
};
export type KresnaWrapperKresnaWrapperPaginationMetadata = {
  total?: number;
  current_page?: number;
  limit?: number;
  total_item?: number;
  total_page?: number;
  have_next_page?: boolean;
  have_previous_page?: boolean;
};
export type KresnaWrapperKresnaWrapperGetVehicleAuxiliaryListResponse = {
  vehicle_auxiliary?: KresnaWrapperKresnaWrapperVehicleAuxiliaryItem[];
  metadata?: KresnaWrapperKresnaWrapperPaginationMetadata;
};
export type KresnaWrapperKresnaWrapperVehicleAuxiliaryMessageResponse = {
  message?: string;
};
export type KresnaWrapperKresnaWrapperCreateVehicleAuxiliaryItem = {
  category_id: string;
  auxiliary_name: string;
  status: string;
};
export type KresnaWrapperKresnaWrapperCreateVehicleAuxiliaryRequest = {
  vehicle_auxiliaries: KresnaWrapperKresnaWrapperCreateVehicleAuxiliaryItem[];
};
export const {
  useKresnaWrapperServiceV1HealthCheckQuery,
  useKresnaWrapperServiceV1GetVehicleAuxiliaryListQuery,
  useKresnaWrapperServiceV1CreateVehicleAuxiliaryMutation,
} = injectedRtkApi;
