import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import style from "../../css/user/Mypage.module.css";
import DefaultMypage from "./DefaultMypage";
import Aside from "./Aside";


const Mypage = () => {

 //function
  const [currentPage, setCurrentPage] = useState("");
  const changePage = (e) => {
    console.log(e);
    setCurrentPage(e);
  };
  return (
    <div className={style.myPageContainer}>
      {/* sidebar  유저정보 리덕스에? */}
      <div></div>
      <Aside changePage={changePage} />
      {/* {(currentPage === "/default" || currentPage === "") ? ( */}
        {/* <DefaultMypage />):( */}
          <Outlet />
          {/* ) */}
      {/* } */}
      <div></div>
    </div>
  );
};

export default Mypage;
