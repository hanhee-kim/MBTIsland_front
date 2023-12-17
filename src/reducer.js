import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./reducer/userReducer";
import { tokenReducer } from "./reducer/tokenReducer";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage,
};

const tokenPersistConfig = {
  key: "token",
  storage,
};

const reportPersistConfig = {
  key: "report",
  storage,
};

export const rootReducer = combineReducers({
// <<<<<<< HEAD
  user: persistReducer(userPersistConfig, userReducer),
  token: persistReducer(tokenPersistConfig, tokenReducer),
  // report: persistReducer(reportPersistConfig, reportReducer),
// =======
  // user: userReducer,
  // token:tokenReducer,
// >>>>>>> inss
});