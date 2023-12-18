import React from "react";

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
        case "신고타입":
            //스테이트 변경
            newState.report = {...newState.report,...action.payload};
            break;
          default:
    }

    return newState;
};