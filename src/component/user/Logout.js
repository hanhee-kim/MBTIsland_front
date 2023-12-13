import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "../../App";
import { useNavigate } from "react-router";

import React from "react";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 비동기 작업을 수행하지 않으므로 await는 필요하지 않습니다.
    dispatch({ type: "logout", payload: "" });
    dispatch({ type: "logout", payload: {} });
    await persistor.purge();
    navigate("/login");
  };
  useEffect(() => {
    // dispatch({ type: "logout", payload: "" });
    // dispatch({ type: "logout", payload: {} });
    localStorage.removeItem("token");
    // persistor.purge();
    // navigate("/login");
    handleLogout();
  }, []);

  return <div></div>;
};

export default Logout;
