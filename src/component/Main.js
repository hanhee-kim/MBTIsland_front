import { Table, UncontrolledCarousel } from "reactstrap";

import style from "../css/Main.module.css";
import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";

const Main = () => {

  // 캐러셀 이미지
  const items = [
      {
          src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'하트',
          caption:'heart caption',
          header:'heart header',
      },
      {
        src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'로고192',
          caption:'logo192 caption',
          header:'logo192 header'
      },
      {
        src:'https://picsum.photos/seed/picsum/1440/400',
          altText:'로고512',
          caption:'logo512 caption',
          header:'logo512 header'
      }
  ];


// MBTMI 최신글
const [mbtmiListByPaging, setMbtmiListByPaging] = useState([
  {postNo: 222, category: '연애', title: '최신 게시글 제목 최신 게시글 제목 최신 게시글 제목 최신 게시글 제목 최신 게시글 제목', commentCnt: 0, writedate: '1분 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 0},
  {postNo: 221, category: '회사', title: '최신 게시글 제목 최신 게시글 제목', commentCnt: 0, writedate: '1분 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 0},
  {postNo: 220, category: '잡담', title: '최신 게시글 제목 최신 게시글 제목 최신 게시글 제목', commentCnt: 2, writedate: '1시간 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 2},
  {postNo: 199, category: '잡담', title: '최신 게시글 제목 최신 게시글 제목', commentCnt: 4, writedate: '2일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 0},
  {postNo: 198, category: '취미', title: '최신 게시글 제목', commentCnt: 6, writedate: '3주 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 3},
]);


    return (
        <>
        <div className={style.container} id="top">
            <div className={style.bannerArea}>
              <UncontrolledCarousel items={items} className={style.bannerImage}/>
            </div>

            <div>
              <section className={style.sectionLeftArea}></section>
              <section className={style.section}>

                  {/* MB-TMI 최신글 목록 */}
                  <div className={style.boardTitleB}>
                          <span>
                              <p>MB-TMI</p>
                              <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                          </span>
                  </div>
                  <div className={style.newlyPosts}>
                    <table className={style.table}>
                      <tbody>
                      {mbtmiListByPaging.length>0 && mbtmiListByPaging.map (post => {
                        return (
                          <tr key={post.postNo}>
                            <td>
                                <span className={style.overflowLong}>{post.title}</span>
                                <span>[{post.commentCnt}]</span>
                                <small>{post.writedate}</small>
                                <div className={style.profileColor}/>
                                <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                            </td>
                          </tr>
                        )
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
                      {mbtmiListByPaging.length>0 && mbtmiListByPaging.map (post => {
                        return (
                          <tr key={post.postNo}>
                            <td>
                                <span className={style.overflowLong}>{post.title}</span>
                                <span>[{post.commentCnt}]</span>
                                <small>{post.writedate}</small>
                                <div className={style.profileColor}/>
                                <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                            </td>
                          </tr>
                        )
                      })}
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
                      {mbtmiListByPaging.length>0 && mbtmiListByPaging.map (post => {
                        return (
                          <tr key={post.postNo}>
                            <td>
                                <span className={style.overflowLong}>{post.title}</span>
                                <span>[{post.commentCnt}]</span>
                                <small>{post.writedate}</small>
                                <div className={style.profileColor}/>
                                <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                            </td>
                          </tr>
                        )
                      })}
                      </tbody>
                    </table>
                  </div>
                  

              </section>
              <section className={style.sectionRightArea}>
                  <div>
                      <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                  </div>
              </section>
            </div>
        </div>
        </>
    );
}
export default Main;