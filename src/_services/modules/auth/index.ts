import {
  GetProfileResI,
  LoginReqI,
  LoginResI,
} from "_interfaces/auth-api.interfaces";
import { Api } from "_services/api";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        return {
          url: "/auth/admin/login",
          method: "POST",
          body,
        };
      },
    }),
    getProfile: build.query<GetProfileResI, undefined>({
      query: () => "/auth/admin/profile",
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetProfileQuery } = userApi;
