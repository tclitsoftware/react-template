import { Api as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    megaVehicleTypeServiceV1ListVehicleTypeCategories: build.query<
      MegaVehicleTypeServiceV1ListVehicleTypeCategoriesApiResponse,
      MegaVehicleTypeServiceV1ListVehicleTypeCategoriesApiArg
    >({
      query: () => ({ url: `/v1/vehicle-type-categories` }),
    }),
    megaVehicleTypeServiceV1ListVehicleTypes: build.query<
      MegaVehicleTypeServiceV1ListVehicleTypesApiResponse,
      MegaVehicleTypeServiceV1ListVehicleTypesApiArg
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
    megaVehicleTypeServiceV1CreateVehicleTypes: build.mutation<
      MegaVehicleTypeServiceV1CreateVehicleTypesApiResponse,
      MegaVehicleTypeServiceV1CreateVehicleTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/vehicle-types`,
        method: "POST",
        body: queryArg.megaVehicleTypeV1MegaCreateVehicleTypesReq,
      }),
    }),
    megaVehicleTypeServiceV1ActivateVehicleTypes: build.mutation<
      MegaVehicleTypeServiceV1ActivateVehicleTypesApiResponse,
      MegaVehicleTypeServiceV1ActivateVehicleTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/vehicle-types/activate`,
        method: "PATCH",
        body: queryArg.megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq,
      }),
    }),
    megaVehicleTypeServiceV1DeactivateVehicleTypes: build.mutation<
      MegaVehicleTypeServiceV1DeactivateVehicleTypesApiResponse,
      MegaVehicleTypeServiceV1DeactivateVehicleTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/vehicle-types/deactivate`,
        method: "PATCH",
        body: queryArg.megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq,
      }),
    }),
    megaVehicleTypeServiceV1GetVehicleType: build.query<
      MegaVehicleTypeServiceV1GetVehicleTypeApiResponse,
      MegaVehicleTypeServiceV1GetVehicleTypeApiArg
    >({
      query: (queryArg) => ({ url: `/v1/vehicle-types/${queryArg.id}` }),
    }),
    megaVehicleTypeServiceV1UpdateVehicleType: build.mutation<
      MegaVehicleTypeServiceV1UpdateVehicleTypeApiResponse,
      MegaVehicleTypeServiceV1UpdateVehicleTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/vehicle-types/${queryArg.id}`,
        method: "PUT",
        body: queryArg.megaVehicleTypeServiceV1UpdateVehicleTypeBody,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as vehicleTypeApi };
export type MegaVehicleTypeServiceV1ListVehicleTypeCategoriesApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaListVehicleTypeCategoriesRes;
export type MegaVehicleTypeServiceV1ListVehicleTypeCategoriesApiArg = void;
export type MegaVehicleTypeServiceV1ListVehicleTypesApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaListVehicleTypesRes;
export type MegaVehicleTypeServiceV1ListVehicleTypesApiArg = {
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
export type MegaVehicleTypeServiceV1CreateVehicleTypesApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaCreateVehicleTypesRes;
export type MegaVehicleTypeServiceV1CreateVehicleTypesApiArg = {
  megaVehicleTypeV1MegaCreateVehicleTypesReq: MegaVehicleTypeV1MegaCreateVehicleTypesReq;
};
export type MegaVehicleTypeServiceV1ActivateVehicleTypesApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaVehicleTypeBulkStatusChangeRes;
export type MegaVehicleTypeServiceV1ActivateVehicleTypesApiArg = {
  megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: MegaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq;
};
export type MegaVehicleTypeServiceV1DeactivateVehicleTypesApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaVehicleTypeBulkStatusChangeRes;
export type MegaVehicleTypeServiceV1DeactivateVehicleTypesApiArg = {
  megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: MegaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq;
};
export type MegaVehicleTypeServiceV1GetVehicleTypeApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaGetVehicleTypeRes;
export type MegaVehicleTypeServiceV1GetVehicleTypeApiArg = {
  id: string;
};
export type MegaVehicleTypeServiceV1UpdateVehicleTypeApiResponse =
  /** status 200 A successful response. */ MegaVehicleTypeV1MegaUpdateVehicleTypeRes;
export type MegaVehicleTypeServiceV1UpdateVehicleTypeApiArg = {
  id: string;
  megaVehicleTypeServiceV1UpdateVehicleTypeBody: MegaVehicleTypeServiceV1UpdateVehicleTypeBody;
};
export type MegaVehicleTypeV1MegaVehicleTypeCategoriesRes = {
  id?: string;
  category_name?: string;
  has_temp_type?: boolean;
  has_chassis?: boolean;
  has_container?: boolean;
};
export type MegaVehicleTypeV1MegaListVehicleTypeCategoriesRes = {
  vehicle_type_categories?: MegaVehicleTypeV1MegaVehicleTypeCategoriesRes[];
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
export type MegaVehicleTypeV1MegaVehicleTypeRes = {
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
export type MegaVehicleTypeV1MegaVehicleTypePaginationMeta = {
  total?: number;
  current_page?: number;
  limit?: number;
  total_item?: number;
  total_page?: number;
  have_next_page?: boolean;
  have_previous_page?: boolean;
};
export type MegaVehicleTypeV1MegaListVehicleTypesRes = {
  vehicle_types?: MegaVehicleTypeV1MegaVehicleTypeRes[];
  metadata?: MegaVehicleTypeV1MegaVehicleTypePaginationMeta;
};
export type MegaVehicleTypeV1MegaCreateVehicleTypesRes = {
  message?: string;
};
export type MegaVehicleTypeV1MegaCreateVehicleTypesItem = {
  category_id: string;
  vehicle_type: string;
  temp_type_id?: string;
  is_chassis?: boolean;
  is_container?: boolean;
  status: string;
};
export type MegaVehicleTypeV1MegaCreateVehicleTypesReq = {
  items: MegaVehicleTypeV1MegaCreateVehicleTypesItem[];
};
export type MegaVehicleTypeV1MegaVehicleTypeBulkStatusChangeRes = {
  message?: string;
  updated_count?: number;
};
export type MegaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq = {
  ids: string[];
};
export type MegaVehicleTypeV1MegaGetVehicleTypeRes = {
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
export type MegaVehicleTypeV1MegaUpdateVehicleTypeRes = {
  message?: string;
};
export type MegaVehicleTypeServiceV1UpdateVehicleTypeBody = {
  vehicle_type: string;
};
export const {
  useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery,
  useMegaVehicleTypeServiceV1ListVehicleTypesQuery,
  useMegaVehicleTypeServiceV1CreateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1GetVehicleTypeQuery,
  useMegaVehicleTypeServiceV1UpdateVehicleTypeMutation,
} = injectedRtkApi;
