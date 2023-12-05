import React from "react";
const initState = {
  token: "123test123",
  //더미데이터
  user: {
    userId: "",
    username: "gksl914",
    userPasswoard: "1234",
    userNickname: "부리부리눈알뜨기",
    userMbti: "ESFJ",
    userMbtiColor: "#35598f",
    userMbtiChangeDate: "2023-10-29T00:00:00",
    userEmail: "123@123.com",
    userRole: "",
    userWarningCnt: 1,
    userBanCnt: 1,
    isLeave: false,
    isBanned: false,
    joinDate: "2023-11-29T00:00:00",
    leaveDate: "",
    provider: "nomal",
    providerId: "kakaoId",
    visitCnt: 2, //방문횟수
  },
  // user: {
  //   userId: "",
  //   username: "",
  //   userPassword: "",
  //   userNickname: "",
  //   userMbti: "",
  //   userMbtiColor: "",
  //   userMbtiChangeDate: "", //"2023-08-29T00:00:00",
  //   userEmail: "",
  //   userRole: "",
  //   userWarningCnt: 0,
  //   userBanCnt: 0,
  //   isLeave: false,
  //   isBanned: false,
  //   joinDate: "", //"2023-11-29T00:00:00",
  //   leaveDate: "",
  //   provider: "",
  //   providerId: "",
  //   visitCnt: 0, //방문횟수
  // },
};
export const userReducer = (currentState, action) => {
  if (currentState === undefined) {
    return initState;
  }
  const newState = { ...currentState };
  switch (action.type) {
    case "token":
      newState.token = action.payload;
      break;
    case "user":
      newState.user = action.payload;
      break;
    default:
  }
  return newState;
};
