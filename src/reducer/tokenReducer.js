import React from "react";
const initState = {
  token: "",
};
export const tokenReducer = (state, action) => {
  if (state === undefined) {
    return initState;
  }
  const newState = { ...state };
  console.log(newState);
  switch (action.type) {
    case "token":
      newState.token = action.payload;
      break;
    case "logout":
      newState.token = '';
      break;  
    default:
  }
  return newState;
};
