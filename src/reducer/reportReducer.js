import React from "react";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const initState = {
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
    }
};

export const reportReducer = (currentState, action) => {
    if(currentState === undefined) {
        return initState;
    }

    const newState = {...currentState};

    switch(action.type) {
        // case "신고타입":
        case "report":
            //스테이트 변경
            newState.report = {...newState.report,...action.payload};
            break;
        default:
    }

    return newState;
};