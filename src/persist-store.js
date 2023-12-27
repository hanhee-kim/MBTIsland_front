import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, PERSIST, PURGE, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
//logger
import logger from "redux-logger";

export const initState = {
  token:'',
  user:{
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
  totalboardCnt:0,
  report : {
    no:0,
    reportedId:"",
    reportedPostno:0,
    reportedCommentNo:0,
    tableType:"",
    reportType:"",
    title:"",
    content:"",
    fileIdxs:"",
    reporterId:"",
    reportedDate:"",
    reportReason:"",
    isCompleted:"",
    isWarned:""
  },
  isRegistration:false,
}

const reducer = (currentState,action) => {
  if(currentState === undefined) {
    return initState;
  }
  const newState = {...currentState};
  switch(action.type) {
    case "token" : newState.token = action.payload;
    break;
    case "user":
      newState.user = { ...newState.user, ...action.payload };
      break;
    case "totalCnt":
      newState.user = { ...newState.user, ...action.payload };  
      break;
    case "logout":
      newState.token = '';
      newState.user = {...action.payload};
      break; 
    // case "신고타입":
    case "report":
      //스테이트 변경
      newState.report = {...newState.report,...action.payload};
      break;  
    case "isReg":
      newState.isRegistration = {...newState.isRegistration,...action.payload};
      break;  
    default:
  }
  return newState;
}


const persistConfig = {
  key: "root",
  // storage,
  storage: storageSession, // sessionStorage를 사용할 경우
  //whiteList: ,
  autoRehydrate: false,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),

});

export default store;