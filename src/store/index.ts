import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import CookieStorage from "./cookieStore";
import Cookies from "cookies-js";
import { Api } from "_services/api";
import { WrapperApi } from "_services/wrapperApi";
import example from "./example";
import auth from "./auth";
import globalComponent from "./global-components";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducers = combineReducers({
  example,
  auth,
  globalComponent,
  [Api.reducerPath]: Api.reducer,
  [WrapperApi.reducerPath]: WrapperApi.reducer,
});

const persistConfig = {
  key: "examplereduxkeystore",
  storage: new CookieStorage(Cookies, {}),
  whitelist: ["globalComponent", "auth", "example"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(Api.middleware, WrapperApi.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

// this is why you shouldn't split one business domain to multiple services
// this is due to the wrapper service and vehicletype service being two different service
// so one cache being invalidated doesn't invalidate the other making it so that
// when you just did a create that's in a different endpoint you'll have to refresh
// the state of the other service too so when you get back the table already has your shiny new data
Api.enhanceEndpoints({
  endpoints: {
    megaVehicleTypeServiceV1CreateVehicleTypes: {
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        await queryFulfilled; // Wait for the mutation to succeed
        dispatch(WrapperApi.util.invalidateTags(["MegaWrapperServiceV1"]));
      },
    },
    megaVehicleTypeServiceV1ActivateVehicleTypes: {
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        await queryFulfilled;
        dispatch(WrapperApi.util.invalidateTags(["MegaWrapperServiceV1"]));
      },
    },
    megaVehicleTypeServiceV1DeactivateVehicleTypes: {
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        await queryFulfilled;
        dispatch(WrapperApi.util.invalidateTags(["MegaWrapperServiceV1"]));
      },
    },
    megaVehicleTypeServiceV1UpdateVehicleType: {
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        await queryFulfilled;
        dispatch(WrapperApi.util.invalidateTags(["MegaWrapperServiceV1"]));
      },
    },
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof reducers>;
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store, persistor };
