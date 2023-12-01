import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { rootReducer } from "./reducer";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  //whiteList: ["id","name","name","email","address"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
