import React from "react";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initState = {
  user: {
    userIdx: 0,
    username: "",
    userPassword: "",
    userNickname: "",
    userMbti: "",
    userMbtiColor: "",
    userMbtiChangeDate: "", //"2023-08-29T00:00:00",
    userEmail: "",
    userRole: "",
    userWarnCnt: 0,
    userBanCnt: 0,
    isLeave: "",
    isBanned: "",
    joinDate: "", //"2023-11-29T00:00:00",
    leaveDate: "",
    visitCnt: 0, //방문횟수
    provider: "",
    providerId: "",
  },
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userReducer"],
};
const userReducer = (currentState, action) => {
  if (currentState === undefined) {
    return initState;
  }
  const newState = { ...currentState };
  switch (action.type) {
    case "user":
      newState.user = { ...newState.user, ...action.payload };
      break;
    case "logout":
      newState.user = {}
      break;
    default:
  }
  return newState;
};

export const persistedUserReducer = persistReducer(
  userPersistConfig,
  userReducer
);
