import { Table, UncontrolledCarousel } from "reactstrap";

import style from "../css/Main.module.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { index } from "d3-array";
import axios from "axios";

const Main = () => {
  // //token정보
  // const token = useSelector((state) => state.persistedReducer.token.token);
  // const user = useSelector((state) => state.persistedReducer.user.user);
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

  // MBTMI 최신글
  const [mbtmiListByPaging, setMbtmiListByPaging] = useState([
    {
      postNo: 222,
      category: "연애",
      title:
        "최신 게시글 제목 최신 게시글 제목 최신 게시글 제목 최신 게시글 제목 최신 게시글 제목",
      commentCnt: 0,
      writedate: "1분 전",
      writerMbti: "ESFP",
      writerNickname: "포로리",
      recommentCnt: 0,
    },
    {
      postNo: 221,
      category: "회사",
      title: "최신 게시글 제목 최신 게시글 제목",
      commentCnt: 0,
      writedate: "1분 전",
      writerMbti: "ESFP",
      writerNickname: "포로리",
      recommentCnt: 0,
    },
    {
      postNo: 220,
      category: "잡담",
      title: "최신 게시글 제목 최신 게시글 제목 최신 게시글 제목",
      commentCnt: 2,
      writedate: "1시간 전",
      writerMbti: "ESFP",
      writerNickname: "포로리",
      recommentCnt: 2,
    },
    {
      postNo: 199,
      category: "잡담",
      title: "최신 게시글 제목 최신 게시글 제목",
      commentCnt: 4,
      writedate: "2일 전",
      writerMbti: "ESFP",
      writerNickname: "포로리",
      recommentCnt: 0,
    },
    {
      postNo: 198,
      category: "취미",
      title: "최신 게시글 제목",
      commentCnt: 6,
      writedate: "3주 전",
      writerMbti: "ESFP",
      writerNickname: "포로리",
      recommentCnt: 3,
    },
  ]);


  const [mbtmiList, setMbtmiList] = useState([]); // mbtmi 최신글목록
  const [mbtwhyList, setMbtwhyList] = useState([]); // mbtwhy 최신글목록
  const [mbattleList, setMbattleList] = useState([]); // mbattle 최신글목록
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
      const response = await axios.get(`http://localhost:8090/mbtmilist`);
      // console.log('getMbtmiList 요청결과: ', response);
      let mbtmiList = response.data.mbtmiList;
      setMbtmiList([...mbtmiList]);
    } catch (error) {
      console.error('오류내용: ', error);
    }
  }
  const getMbtwhyList = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/mbtwhy`);
      console.log('getMbtwhyList 요청결과: ', response);
      let mbtwhyList = response.data.mbtwhyList;
      setMbtwhyList([...mbtwhyList]);
    } catch (error) {
      console.error('오류내용: ', error);
    }
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
            <div className={style.boardTitleB}>
              <span>
                <p>MB-TMI</p>
                <p>유형별로 모여 자유롭게 이야기를 나눌 수 있는 공간</p>
              </span>
            </div>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                  {mbtmiList.length>0 && mbtmiList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.overflowLong}>
                            {post.title}
                          </span>
                          <span>[{post.commentCnt}]</span>
                          <small>{formatDatetimeGap(post.writeDate)}</small>
                          <div className={style.profileColor} />
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
            <div className={style.boardTitleB}>
              <span>
                <p>MBT-WHY</p>
                <p>원하는 MBTI 유형에게 질문을 남겨보세요!</p>
              </span>
            </div>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                {mbtwhyList.length>0 && mbtwhyList.slice(0,5).map((post)=> {
                    return (
                      <tr key={post.no}>
                        <td>
                          <span className={style.overflowLong}>
                            {post.content}
                          </span>
                          <span>[{post.commentCnt}]</span>
                          <small>{formatDatetimeGap(post.writeDate)}</small>
                          <div className={style.profileColor} />
                          <span>
                            {post.writerMbti}&nbsp;{post.writerNickname}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {/* {mbtmiListByPaging.length > 0 &&
                    mbtmiListByPaging.map((post) => {
                      return (
                        <tr key={post.postNo}>
                          <td>
                            <span className={style.overflowLong}>
                              {post.title}
                            </span>
                            <span>[{post.commentCnt}]</span>
                            <small>{post.writedate}</small>
                            <div className={style.profileColor} />
                            <span>
                              {post.writerMbti}&nbsp;{post.writerNickname}
                            </span>
                          </td>
                        </tr>
                      );
                    })} */}
                </tbody>
              </table>
            </div>

            {/* M-BATTLE 최신글 목록 */}
            <div className={style.boardTitleB}>
              <span>
                <p>M-BATTLE</p>
                <p>MBTI 유형 별 성향을 알아보세요!</p>
              </span>
            </div>
            <div className={style.newlyPosts}>
              <table className={style.table}>
                <tbody>
                  {mbtmiListByPaging.length > 0 &&
                    mbtmiListByPaging.map((post) => {
                      return (
                        <tr key={post.postNo}>
                          <td>
                            <span className={style.overflowLong}>
                              {post.title}
                            </span>
                            <span>[{post.commentCnt}]</span>
                            <small>{post.writedate}</small>
                            <div className={style.profileColor} />
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
