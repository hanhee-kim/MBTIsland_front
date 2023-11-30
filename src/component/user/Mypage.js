import React, { useState } from 'react';
import style from "../../css/user/Mypage.module.css";
import DefaultMypage from './DefaultMypage';
import Aside from './Aside';
import MyMbtWhy from './MyMbtWhy';

const Mypage = () => {
  //더미데이터
  const [user,setUser]= useState({
    username:'gksl914',
    userPasswoard:'1234',
    userNickname:'부리부리눈알뜨기',
    userMbti:'ENFP',
    userMbtiColor:'#FFD966',
    userMbtiChangeDate: "2023-11-29",
    userEmail:'123@123.com',
    userRole:'',
    userWarningCnt: 1,
    userBanCnt : 1,
    isLeave:false,
    isBanned:false,
    joinDate:"2023-11-29",
    leaveDate:'',
    provider:'kakao',
    providerId:'kakaoId',
    visitCnt:2  //방문횟수
   })
   //function
    const [currentPage,setCurrentPage] = useState('');
    const changePage = (e) =>{
    console.log(e)
    setCurrentPage(e);
    }
  return (
    <div className={style.myPageContainer}>
      {/* sidebar  유저정보 리덕스에? */}
      <Aside changePage={changePage} />
      {currentPage === '/default' && <DefaultMypage user={user}/>}
      {currentPage === '/mbtwhy' && <MyMbtWhy user={user}/>}
      {currentPage === '/mbtmi' && <></>}
      {currentPage === '/qna' && <></>}
      {currentPage === '/bookmark' && <></>}
      {currentPage === '/alarm' && <></>}
      {currentPage === '/note' && <></>}
    </div>
  );
};

export default Mypage;