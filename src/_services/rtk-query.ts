import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginReqI, LoginResI } from "_interfaces/auth-api.interfaces";
import { PagingDTO } from "_interfaces/pagination.interface";
import { GetUsersResI } from "_interfaces/user.interfaces";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.example.com",
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
    }),
    getUsers: build.query<GetUsersResI, PagingDTO>({
      query: (params) => {
        return {
          url: "/users",
          params,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery } = authApi;

