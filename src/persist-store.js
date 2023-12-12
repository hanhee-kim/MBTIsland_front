import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, PERSIST, PURGE } from "redux-persist";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
//logger
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
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
    }).concat(logger),
  // middleware: (getDefaultMiddleware) =>
  //   //미들웨어 작성시 에러 주의
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [PERSIST, PURGE],
  //     },
  //   }),
});
// const store = createStore(persistedReducer);

export default store;
