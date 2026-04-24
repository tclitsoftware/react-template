import { Api as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    exampleServiceV1UserPayment: build.mutation<
      ExampleServiceV1UserPaymentApiResponse,
      ExampleServiceV1UserPaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/payment`,
        method: "POST",
        params: {
          amount: queryArg.amount,
        },
      }),
    }),
    exampleServiceV1GetTotalUserTransaction: build.query<
      ExampleServiceV1GetTotalUserTransactionApiResponse,
      ExampleServiceV1GetTotalUserTransactionApiArg
    >({
      query: (queryArg) => ({ url: `/v1/user-transaction/${queryArg.userId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as exampleApi };
export type ExampleServiceV1UserPaymentApiResponse =
  /** status 200 A successful response. */ {};
export type ExampleServiceV1UserPaymentApiArg = {
  amount: number;
};
export type ExampleServiceV1GetTotalUserTransactionApiResponse =
  /** status 200 A successful response. */ ExampleUserTransactionRes;
export type ExampleServiceV1GetTotalUserTransactionApiArg = {
  userId: string;
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
export type ExampleUserTransactionRes = {
  email?: string;
  name?: string;
  amount?: number;
};
export const {
  useExampleServiceV1UserPaymentMutation,
  useExampleServiceV1GetTotalUserTransactionQuery,
} = injectedRtkApi;
