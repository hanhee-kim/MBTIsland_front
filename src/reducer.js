import { combineReducers } from "redux";
import { userReducer } from "./reducer/userReducer";
import { reportReducer } from "./reducer/reportReducer";
import { tokenReducer } from "./reducer/tokenReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  report: reportReducer,
});

