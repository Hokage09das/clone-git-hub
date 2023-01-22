import { configureStore } from "@reduxjs/toolkit";
import { githupApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubSlice } from "./github/github.slice";

export const store = configureStore({
  reducer: {
    [githupApi.reducerPath]: githupApi.reducer,
    [githubSlice.name]: githubSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githupApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
