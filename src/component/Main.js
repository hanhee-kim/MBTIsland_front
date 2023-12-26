import { Modal, ModalBody, ModalHeader, Table, UncontrolledCarousel } from "reactstrap";

import style from "../css/Main.module.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { index } from "d3-array";
import axios from "axios";
import {urlroot} from '../config';

const Main = () => {
  // //token정보
  // const token = useSelector((state) => state.persistedReducer.token);
  // const user = useSelector((state) => state.persistedReducer.user);
  // const dispatch = useDispatch();

  // useEffect(() => {

  // },[])

  // 로그인정보 가져오기
  const user = useSelector((state) => state.persistedReducer.user);

  const navigate = useNavigate();
  const [mbtmiList, setMbtmiList] = useState([]); // mbtmi 최신글목록
  const [mbtwhyList, setMbtwhyList] = useState([]); // mbtwhy 최신글목록
  const [mbattleList, setMbattleList] = useState([]); // mbattle 최신글목록

  // 절대시간
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // 상대시간(시간차)
  const formatDatetimeGap = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const datetimeGap = currentDate - date;
    const seconds = Math.floor(datetimeGap/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);
    const months = Math.floor(weeks/4);
    const years = Math.floor(months/12);

    // if(seconds<60) return `${seconds}초 전`;
    // else 
    if(minutes<60) return `${minutes}분 전`;
    else if(hours<24) return `${hours}시간 전`;
    else if(days<7) return `${days}일 전`;
    else if(weeks<4) return `${weeks}주 전`;
    else if(months<12) return `${months}달 전`;
    else return `${years}년 전`;
}

  useEffect(()=> {
    getMbtmiList();
    getMbtwhyList();
    getMbattleList();

  }, []);

  const getMbtmiList = async () => {
    try {
      const response = await axios.get(`${urlroot}/mbtmilist`);
      // console.log('getMbtmiList 요청결과: ', response);
      let mbtmiList = response.data.mbtmiList;
      setMbtmiList([...mbtmiList]);
    } catch (error) {
      console.error('오류내용: ', error);
    }
  }
  const getMbtwhyList = async () => {
    try {
      const response = await axios.get(`${urlroot}/mbtwhy`);
      // console.log('getMbtwhyList 요청결과: ', response);
      let mbtwhyList = response.data.mbtwhyList;
      setMbtwhyList([...mbtwhyList]);
    } catch (error) {
      console.error('오류내용: ', error);
    }
  }
  const getMbattleList = async () => {
    try {
      const response = await axios.get(`${urlroot}/mbattle`);
      console.log('getMbattleList 요청결과: ', response);
      let mbattleList = response.data.mbattleList;
      setMbattleList([...mbattleList]);
    } catch (error) {
      console.error('오류내용: ', error);
    }
  }

  // 로그인한 활동정지 유저의 안내 모달
  const [bannedUserLogin, setBannedUserLogin] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    if(user.isBanned==='Y') {
      setBannedUserLogin(true); // 정지회원일때만 모달이 열리도록 함
      banperiod();
    }
  }, []);
  // 모달 여닫힘을 토글하는 함수
  const toggleModal = () => {
    setBannedUserLogin(!bannedUserLogin);
  };
  // 활동정지회원의 정지기간을 조회
  const banperiod = async () => {
    const response = await axios.get(`${urlroot}/usersbanperiod/${user.username}`)
    // console.log('banperiod의 결과: ', response);
    const startDate = response.data.banStartDate;
    const endDate = response.data.banEndDate;
    setStartDate(startDate);
    setEndDate(endDate);
  }


  return (
    <>
      <div className={style.container} id="top">
        <div className={style.bannerArea}>
          {/* 부트스트랩5 캐러셀 */}
          <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{width: '100%'}}> 

            {/* Indicators/dots */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
            
            {/* The slideshow/carousel */}
            <div className="carousel-inner">
              <div className="carousel-item active" onClick={()=>alert('배너이미지1 클릭!')}>
                <img src={"/2000x300.png"} alt="배너이미지1" className="d-block" style={{minWidth: '1400px', width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'center center'}}/>
              </div>
              <div className="carousel-item" onClick={()=>alert('배너이미지2 클릭!')}>
                <img src="/2200x300.png" alt="배너이미지2" className="d-block" style={{minWidth: '1400px', width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'center center'}}/>
              </div>
              <div className="carousel-item" onClick={()=>alert('배너이미지3 클릭!')}>
                <img src="/1800x400.png" alt="배너이미지3" className="d-block" style={{minWidth: '1400px', width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'center center'}}/>
              </div>
            </div>
            
            {/* Left and right controls/icons */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>

        </div>
        <div>
          <section className={style.sectionLeftArea}></section>
          <section className={style.section}>

            <Modal isOpen={bannedUserLogin} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>활동 정지 안내</ModalHeader><br/>
              <ModalBody>
                <div>회원님의 계정은 현재 경고 누적으로 인해 <b>활동정지</b> 상태입니다.</div><br/>
                <div>경고 누적 횟수&nbsp; : &nbsp;{user.userWarnCnt}회</div>
                {startDate !== '' && (
                  <><div>정지 기간&nbsp; : &nbsp;{formatDate(startDate)} ~ {formatDate(endDate)}</div><br/></>
                )}
              </ModalBody>
            </Modal>

            {/* MB-TMI 최신글 목록 */}
            <Link to={"/mbtmi"}>
              <div className={style.boardTitleB}>
                  <div className={style.boardTitleTextArea}>
                      <p>MB-TMI</p>
                      <p>유형별로 모여 자유롭게 이야기를 나눌 수 있는 공간</p>
                  </div>
                  <div>
                      <img alt="tmi" src={"/tmi.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                  </div>
              </div>
            </Link>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                  {mbtmiList.length>0 && mbtmiList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.postTitleAndEtc}>
                            <span className={style.overflowLong}>
                              <Link to={`/mbtmidetail/${post.no}`}>{post.title}</Link>
                            </span>
                            <span>[{post.commentCnt}]</span>
                            <small>{formatDatetimeGap(post.writeDate)}</small>
                          </span>

                          <span className={style.postWriterInfo}>
                            <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>
                            <span>
                              {post.writerMbti}&nbsp;{post.writerNickname}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MBT-WHY 최신글 목록 */}
            <Link to={"/mbtwhymain"}>
              <div className={style.boardTitleB}>
                  <div className={style.boardTitleTextArea}>
                      <p>MBT-WHY</p>
                      <p>원하는 MBTI 유형에게 질문을 남겨보세요!</p>
                  </div>
                  <div>
                      <img alt="tmi" src={"/why.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                  </div>
              </div>
            </Link>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                {mbtwhyList.length>0 && mbtwhyList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.postTitleAndEtc}>
                            <span className={style.overflowLong}>
                              <Link to={`/mbtwhydetail/${post.mbtiCategory}/${post.no}/1`}>{post.content}</Link>
                            </span>
                            <span>[{post.commentCnt}]</span>
                            <small>{formatDatetimeGap(post.writeDate)}</small>
                          </span>

                          <span className={style.postWriterInfo}>
                            <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>
                            <span>
                              {post.writerMbti}&nbsp;{post.writerNickname}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* M-BATTLE 최신글 목록 */}
            <Link to={"/mbattle"}>
              <div className={style.boardTitleB}>
                  <div className={style.boardTitleTextArea}>
                      <p>MBT-BATTLE</p>
                      <p>MBTI 유형 별 성향을 알아보세요!</p>
                  </div>
                  <div>
                      <img alt="battle" src={"/mbattle.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                  </div>
              </div>
            </Link>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                {mbattleList.length>0 && mbattleList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.postTitleAndEtc}>
                            <span className={style.overflowLong}>
                              <Link to={`/mbattledetail/${post.no}/1`}>{post.title}</Link>
                            </span>
                            <span>[{post.commentCnt}]</span>
                            <small>{formatDatetimeGap(post.writeDate)}</small>
                          </span>

                          <span className={style.postWriterInfo}>
                            <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>
                            <span>
                              {post.writerMbti}&nbsp;{post.writerNickname}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <section className={style.sectionRightArea}>
            <div>
              <a href="#top">
                <img
                  src={"/movetopIcon.png"}
                  alt="top"
                  className={style.movetopIcon}
                />
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Main;
