import { combineReducers } from "redux";
import { userReducer } from "./reducer/userReducer";
import { reportReducer } from "./reducer/reportReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  report: reportReducer
});
