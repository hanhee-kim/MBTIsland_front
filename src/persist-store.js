import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { rootReducer } from "./reducer";
import thunk from 'redux-thunk';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage:storage,
  //whiteList: ["id","name","name","email","address"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk],
// });

const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// const store = createStore(persistedReducer);

export default store;
