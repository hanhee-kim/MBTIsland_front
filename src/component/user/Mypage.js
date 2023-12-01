import React, { useState } from "react";
import style from "../../css/user/Mypage.module.css";
import DefaultMypage from "./DefaultMypage";
import Aside from "./Aside";
import MyMbtWhy from "./MyMbtWhy";
import MyMbtmi from "./MyMbtmi";
import MyQnA from "./MyQnA";
import { useSelector } from "react-redux";

const Mypage = () => {
  const token = useSelector((state) => state.persistedReducer.user.token);
  const user = useSelector((state) => state.persistedReducer.user.user);
  //function
  const [currentPage, setCurrentPage] = useState("");
  const changePage = (e) => {
    console.log(e);
    setCurrentPage(e);
  };
  return (
    <div className={style.myPageContainer}>
      {/* sidebar  유저정보 리덕스에? */}
      <Aside changePage={changePage} />
      {(currentPage === "/default" || currentPage === "") && (
        <DefaultMypage user={user} />
      )}
      {currentPage === "/mbtwhy" && <MyMbtWhy />}
      {currentPage === "/mbtmi" && <MyMbtmi />}
      {currentPage === "/qna" && <MyQnA />}
      {currentPage === "/bookmark" && <></>}
      {currentPage === "/alarm" && <></>}
      {currentPage === "/note" && <></>}
    </div>
  );
};

export default Mypage;
