import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSilce";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        dashboard: dashboardReducer
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});