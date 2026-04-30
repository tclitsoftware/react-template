import { vehicleTypeApi as api } from "./modules/vehicleTypeApi";

// This is big bad, we're not supposed to do this in the first place,
// but for some reason the temp-type get endpoint addition doesn't trigger the swagger json rebuilding
export const vehicleTypeTempApi = api.injectEndpoints({
  endpoints: (build) => ({
    listVehicleTypeTempTypes: build.query<{ temp_types: { id: string; name: string }[] }, void>({
      query: () => ({
        url: `/v1/vehicle-type-temp-types`,
      }),
    }),
  }),
});

export const { useListVehicleTypeTempTypesQuery } = vehicleTypeTempApi;
