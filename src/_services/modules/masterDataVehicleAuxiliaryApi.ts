import { Api as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    kresnaMasterDataServiceV1HealthCheck: build.query<
      KresnaMasterDataServiceV1HealthCheckApiResponse,
      KresnaMasterDataServiceV1HealthCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-master-data/v1/health`,
        params: {
          source: queryArg.source,
        },
      }),
    }),
    kresnaMasterDataServiceV1GetVehicleAuxiliaryList: build.query<
      KresnaMasterDataServiceV1GetVehicleAuxiliaryListApiResponse,
      KresnaMasterDataServiceV1GetVehicleAuxiliaryListApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-master-data/v1/vehicle-auxiliary`,
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
    kresnaMasterDataServiceV1CreateVehicleAuxiliary: build.mutation<
      KresnaMasterDataServiceV1CreateVehicleAuxiliaryApiResponse,
      KresnaMasterDataServiceV1CreateVehicleAuxiliaryApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-master-data/v1/vehicle-auxiliary`,
        method: "POST",
        body: queryArg.kresnaMasterDataCreateVehicleAuxiliaryRequest,
      }),
    }),
    kresnaMasterDataServiceV1ActivateVehicleAuxiliary: build.mutation<
      KresnaMasterDataServiceV1ActivateVehicleAuxiliaryApiResponse,
      KresnaMasterDataServiceV1ActivateVehicleAuxiliaryApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-master-data/v1/vehicle-auxiliary/activate`,
        method: "PATCH",
        body: queryArg.kresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest,
      }),
    }),
    kresnaMasterDataServiceV1DeactivateVehicleAuxiliary: build.mutation<
      KresnaMasterDataServiceV1DeactivateVehicleAuxiliaryApiResponse,
      KresnaMasterDataServiceV1DeactivateVehicleAuxiliaryApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-master-data/v1/vehicle-auxiliary/deactivate`,
        method: "PATCH",
        body: queryArg.kresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest,
      }),
    }),
    kresnaMasterDataServiceV1GetVehicleAuxiliaryDetail: build.query<
      KresnaMasterDataServiceV1GetVehicleAuxiliaryDetailApiResponse,
      KresnaMasterDataServiceV1GetVehicleAuxiliaryDetailApiArg
    >({
      query: (queryArg) => ({ url: `/kresna-master-data/v1/vehicle-auxiliary/${queryArg.id}` }),
    }),
    kresnaMasterDataServiceV1UpdateVehicleAuxiliary: build.mutation<
      KresnaMasterDataServiceV1UpdateVehicleAuxiliaryApiResponse,
      KresnaMasterDataServiceV1UpdateVehicleAuxiliaryApiArg
    >({
      query: (queryArg) => ({
        url: `/kresna-master-data/v1/vehicle-auxiliary/${queryArg.id}`,
        method: "PUT",
        body: queryArg.kresnaMasterDataServiceV1UpdateVehicleAuxiliaryBody,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as masterDataVehicleAuxiliaryApi };
export type KresnaMasterDataServiceV1HealthCheckApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataHealthCheckResponse;
export type KresnaMasterDataServiceV1HealthCheckApiArg = {
  source: string;
};
export type KresnaMasterDataServiceV1GetVehicleAuxiliaryListApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataGetVehicleAuxiliaryListResponse;
export type KresnaMasterDataServiceV1GetVehicleAuxiliaryListApiArg = {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  status?: string;
  categoryId?: string;
  auxiliaryName?: string;
};
export type KresnaMasterDataServiceV1CreateVehicleAuxiliaryApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataCreateVehicleAuxiliaryResponse;
export type KresnaMasterDataServiceV1CreateVehicleAuxiliaryApiArg = {
  kresnaMasterDataCreateVehicleAuxiliaryRequest: KresnaMasterDataCreateVehicleAuxiliaryRequest;
};
export type KresnaMasterDataServiceV1ActivateVehicleAuxiliaryApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataBulkUpdateVehicleAuxiliaryStatusResponse;
export type KresnaMasterDataServiceV1ActivateVehicleAuxiliaryApiArg = {
  kresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest: KresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest;
};
export type KresnaMasterDataServiceV1DeactivateVehicleAuxiliaryApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataBulkUpdateVehicleAuxiliaryStatusResponse;
export type KresnaMasterDataServiceV1DeactivateVehicleAuxiliaryApiArg = {
  kresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest: KresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest;
};
export type KresnaMasterDataServiceV1GetVehicleAuxiliaryDetailApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataGetVehicleAuxiliaryDetailResponse;
export type KresnaMasterDataServiceV1GetVehicleAuxiliaryDetailApiArg = {
  id: string;
};
export type KresnaMasterDataServiceV1UpdateVehicleAuxiliaryApiResponse =
  /** status 200 A successful response. */ KresnaMasterDataUpdateVehicleAuxiliaryResponse;
export type KresnaMasterDataServiceV1UpdateVehicleAuxiliaryApiArg = {
  id: string;
  kresnaMasterDataServiceV1UpdateVehicleAuxiliaryBody: KresnaMasterDataServiceV1UpdateVehicleAuxiliaryBody;
};
export type KresnaMasterDataHealthCheckResponse = {
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
export type KresnaMasterDataVehicleAuxiliaryItem = {
  id?: string;
  category_id?: string;
  auxiliary_name?: string;
  status?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
};
export type KresnaMasterDataPaginationMetadata = {
  total?: number;
  current_page?: number;
  limit?: number;
  total_item?: number;
  total_page?: number;
  have_next_page?: boolean;
  have_previous_page?: boolean;
};
export type KresnaMasterDataGetVehicleAuxiliaryListResponse = {
  vehicle_auxiliary?: KresnaMasterDataVehicleAuxiliaryItem[];
  metadata?: KresnaMasterDataPaginationMetadata;
};
export type KresnaMasterDataCreateVehicleAuxiliaryResponse = {
  message?: string;
};
export type KresnaMasterDataCreateVehicleAuxiliaryPayload = {
  category_id: string;
  auxiliary_name: string;
  status: string;
};
export type KresnaMasterDataCreateVehicleAuxiliaryRequest = {
  vehicle_auxiliaries: KresnaMasterDataCreateVehicleAuxiliaryPayload[];
};
export type KresnaMasterDataBulkUpdateVehicleAuxiliaryStatusResponse = {
  message?: string;
  updated_count?: number;
};
export type KresnaMasterDataBulkUpdateVehicleAuxiliaryStatusRequest = {
  ids: string[];
};
export type KresnaMasterDataGetVehicleAuxiliaryDetailResponse = {
  id?: string;
  category_id?: string;
  auxiliary_name?: string;
  status?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
};
export type KresnaMasterDataUpdateVehicleAuxiliaryResponse = {
  message?: string;
};
export type KresnaMasterDataServiceV1UpdateVehicleAuxiliaryBody = {
  category_id: string;
  auxiliary_name: string;
};
export const {
  useKresnaMasterDataServiceV1HealthCheckQuery,
  useKresnaMasterDataServiceV1GetVehicleAuxiliaryListQuery,
  useKresnaMasterDataServiceV1CreateVehicleAuxiliaryMutation,
  useKresnaMasterDataServiceV1ActivateVehicleAuxiliaryMutation,
  useKresnaMasterDataServiceV1DeactivateVehicleAuxiliaryMutation,
  useKresnaMasterDataServiceV1GetVehicleAuxiliaryDetailQuery,
  useKresnaMasterDataServiceV1UpdateVehicleAuxiliaryMutation,
} = injectedRtkApi;
