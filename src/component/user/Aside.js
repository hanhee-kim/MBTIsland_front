import React, { useState } from "react";
import { useLocation } from "react-router";
import style from "../../css/user/Mypage.module.css";
import DefaultMypage from "./DefaultMypage";
import { useSelector } from "react-redux";

const Aside = (props) => {
  //state,effect...
  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;
  const user = useSelector((state) => state.persistedReducer.user.user);
  const menus = [
    { name: "프로필", path: "/default" },
    { name: "MBTWHY", path: "/mbtwhy" },
    { name: "MBTmI", path: "/mbtmi" },
    { name: "문의함", path: "/qna" },
    { name: "찜목록", path: "/bookmark" },
    { name: "알림함", path: "/alarm" },
    { name: "쪽지함", path: "/note" },
  ];
  const [linkPath, setLinkpath] = useState("");

  //  //더미데이터
  //  const [user,setUser]= useState({
  //   username:'gksl914',
  //   userPasswoard:'1234',
  //   userNickname:'부리부리눈알뜨기',
  //   userMbti:'ENFP',
  //   userMbtiColor:'#FFD966',
  //   userMbtiChangeDate: "2023-11-29",
  //   userEmail:'123@123.com',
  //   userRole:'',
  //   userWarningCnt: 1,
  //   userBanCnt : 1,
  //   isLeave:false,
  //   isBanned:false,
  //   joinDate:"2023-11-29",
  //   leaveDate:'',
  //   provider:'kakao',
  //   providerId:'kakaoId',
  //   visitCnt:2  //방문횟수
  //  })
  //function
  const getSideColor = (user) => {
    switch (user.userMbti) {
      case "ENFJ":
        return ""; //다우니 black
      case "ENFP":
        return ""; //댄덜라이언
      case "ENTJ":
        return "white"; //네이비피오니
      case "ENTP":
        return ""; //웜 플레임
      case "ESFJ":
        return ""; //바닐라 아이스
      case "ESFP":
        return ""; //스위트 핑크
      case "ESTJ":
        return "white"; //캑터스
      case "ESTP":
        return ""; //로즈버드
      case "INFJ":
        return ""; //앨리스블루
      case "INFP":
        return ""; //오션베이
      case "INTJ":
        return ""; //퀄트스
      case "INTP":
        return ""; //세룰리안
      case "ISFJ":
        return ""; //오아시스
      case "ISFP":
        return ""; //스프라우트
      case "ISTJ":
        return ""; //페리글라스 블루
      case "ISTP":
        return "white"; //오션 딥스

      default:
        return "black";
    }
  };
  const changePage = props.changePage;
  const changePath = (e, path) => {
    console.log("e" + e + " path:" + path);
    changePage(path);
  };
  return (
    <div
      className={style.sideBar}
      style={{ border:"5px solid"+ user.userMbtiColor, color: getSideColor(user) }}
    >
      <div style={{ marginTop: "25px" }}>
        <div className={style.myMbti}>{user.userMbti}</div>
        <div className={style.myNick}>{user.userNickname}</div>
      </div>
      {/* <Link to="./default">test</Link> */}
      <div style={{ marginTop: "55px" }}>
        <ul className={style.sideMenus}>
          {menus.map((menu, index) => {
            return (
              <li key={index} onClick={(e) => changePath(e, menu.path)}>
                {menu.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Aside;
