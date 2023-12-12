import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "../../App";
import { useNavigate } from "react-router";

import React from "react";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "logout", payload: "" });
    dispatch({ type: "logout", payload: {} });
    persistor.purge();
    navigate("/login");
  }, []);

  return <div></div>;
};

export default Logout;
