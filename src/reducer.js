import { combineReducers } from "redux";
import { userReducer } from "./reducer/userReducer";
import { tokenReducer } from "./reducer/tokenReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  token:tokenReducer,
});
