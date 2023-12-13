import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, PERSIST, PURGE, REHYDRATE } from "redux-persist";
import { rootReducer } from "./reducer";
import storage from "redux-persist/lib/storage";
//logger
import logger from "redux-logger";
//
import { persistedUserReducer } from "./reducer/userReducer";
import { tokenReducer } from "./reducer/tokenReducer";
import { combineReducers } from "redux";

//test
const rootReducer = combineReducers({
  user: persistedUserReducer,
  token: tokenReducer,
  // report: reportReducer,
});

const persistConfig = {
  key: "root",
  storage,
  //whiteList: ,
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
  reducer: {persistedReducer} ,
  // middleware: (getDefaultMiddleware) =>
  //   //미들웨어 작성시 에러 주의
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [PERSIST, PURGE],
  //     },
  //   }).concat(logger),
  middleware: (getDefaultMiddleware) =>
    //미들웨어 작성시 에러 주의
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, PURGE],
      },
    }).concat(logger),
});
// const store = createStore(persistedReducer);

export default store;
