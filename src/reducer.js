import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./reducer/userReducer";
import { reportReducer } from "./reducer/reportReducer";
import { tokenReducer } from "./reducer/tokenReducer";
import storage from "redux-persist/lib/storage";

// const userPersistConfig = {
//   key: "user",
//   storage,
// };

// const tokenPersistConfig = {
//   key: "token",
//   storage,
// };

// const reportPersistConfig = {
//   key: "report",
//   storage,
// };

export const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  report: reportReducer,
});
// export const rootReducer = combineReducers({
//   user: persistReducer(userPersistConfig, userReducer),
//   token: persistReducer(tokenPersistConfig, tokenReducer),
//   report: persistReducer(reportPersistConfig, reportReducer),
// });
