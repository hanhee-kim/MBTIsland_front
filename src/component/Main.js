import { Table, UncontrolledCarousel } from "reactstrap";

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

  // 캐러셀 이미지
  const items = [
      {
          key:0,
          src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'배너이미지1',
          caption:'caption1',
          header:'header1',
          
      },
      {
          key:1,
          src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'배너이미지2',
          caption:'caption2',
          header:'header2'
      },
      {
          key:2,
          src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'배너이미지3',
          caption:'caption3',
          header:'header3'
      }
  ];

  // MBattle 최신글 목록 가정 (댓글수를 포함한 List<Dto>)
  const [mbattleList, setMbattleList] = useState([
    { no: 11, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02', writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 10, title: "긴제목 mbattle게시판의 더미게시글 제목 긴제목 mbattle게시판의 더미게시글 제목 긴제목 mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 9, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 8, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 7, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 6, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 5, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 4, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 3, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
    { no: 2, title: "mbattle게시판의 더미게시글 제목", voteItem1: '찍먹', voteItem2: '부먹', writeDate: "2023-12-19T18:02:47.000+00:00"
      , writerId: 'react02',  writerMbti: "ENTP", writerMbtiColor: "#B6634A", writerNickname: "리액트2", commentCnt: 0, },
  ]);


  const navigate = useNavigate();
  const [mbtmiList, setMbtmiList] = useState([]); // mbtmi 최신글목록
  const [mbtwhyList, setMbtwhyList] = useState([]); // mbtwhy 최신글목록
  // const [mbattleList, setMbattleList] = useState([]); // mbattle 최신글목록

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
    // getMbattleList();

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
      console.log('getMbtwhyList 요청결과: ', response);
      let mbtwhyList = response.data.mbtwhyList;
      setMbtwhyList([...mbtwhyList]);
    } catch (error) {
      console.error('오류내용: ', error);
    }
  }
  const getMbattleList = async () => {
    // try {
    //   const response = await axios.get(`${urlroot}/----`);
    //   console.log('getMbattleList 요청결과: ', response);
    //   let mbattleList = response.data.mbtwhyList;
    //   setMbattleList([...mbattleList]);
    // } catch (error) {
    //   console.error('오류내용: ', error);
    // }
  }

  return (
    <>
      <div className={style.container} id="top">
        <div className={style.bannerArea}>
          <UncontrolledCarousel
            // key={index}
            items={items}
            className={style.bannerImage}
          />
        </div>
        <div>
          <section className={style.sectionLeftArea}></section>
          <section className={style.section}>
            {/* MB-TMI 최신글 목록 */}
            <Link to={"/mbtmi"}><div className={style.boardTitleB}>
              <span>
                <p>MB-TMI</p>
                <p>유형별로 모여 자유롭게 이야기를 나눌 수 있는 공간</p>
              </span>
            </div></Link>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                  {mbtmiList.length>0 && mbtmiList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.overflowLong}>
                            <Link to={`/mbtmidetail/${post.no}`}>{post.title}</Link>
                          </span>
                          <span>[{post.commentCnt}]</span>
                          <small>{formatDatetimeGap(post.writeDate)}</small>
                          <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>
                          <span>
                            {post.writerMbti}&nbsp;{post.writerNickname}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MBT-WHY 최신글 목록 */}
            <Link to={"/mbtwhymain"}><div className={style.boardTitleB}>
            <span>
                <p>MBT-WHY</p>
                <p>원하는 MBTI 유형에게 질문을 남겨보세요!</p>
              </span>
            </div></Link>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                {mbtwhyList.length>0 && mbtwhyList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.overflowLong}>
                            <Link to={`/mbtwhydetail/${post.mbtiCategory}/${post.no}/1`}>{post.content}</Link>
                          </span>
                          <span>[{post.commentCnt}]</span>
                          <small>{formatDatetimeGap(post.writeDate)}</small>
                          <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>
                          <span>
                            {post.writerMbti}&nbsp;{post.writerNickname}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* M-BATTLE 최신글 목록 */}
            <Link to={"/mbattle"}><div className={style.boardTitleB}>
            <span>
                <p>M-BATTLE</p>
                <p>MBTI 유형 별 성향을 알아보세요!</p>
              </span>
            </div></Link>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                {mbattleList.length>0 && mbattleList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.overflowLong}>
                            {/* App.js에 등록된 파라미터 포함 url로 변경할것 */}
                            {/* <Link to={`/mbattledetail/${post.no}`}>{post.title}</Link> */}
                            <Link to={`/mbattledetail`}>{post.title}</Link>
                          </span>
                          <span>[{post.commentCnt}]</span>
                          <small>{formatDatetimeGap(post.writeDate)}</small>
                          <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>
                          <span>
                            {post.writerMbti}&nbsp;{post.writerNickname}
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
