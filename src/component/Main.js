import { Table } from "reactstrap";

// import style from "../css/mbtmi/MBTmi.module.css";
import style from "../css/Main.module.css";
import React from "react";
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <>
        <div className={style.container}>
            <div className={style.bannerArea}>배너영역</div>
            
            <div>
            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>


                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>
                <div className={style.newlyPosts}>
                  <table className={style.table}>
                    <tbody>
                      <tr>
                        <td>게시글제목&nbsp;&nbsp;
                            <span>[1]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>1분 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 긴제목&nbsp;&nbsp;
                            <span>[10]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2분 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>20일 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2달 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2년 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>
                <div className={style.newlyPosts}>
                  <table className={style.table}>
                    <tbody>
                      <tr>
                        <td>게시글제목&nbsp;&nbsp;
                            <span>[1]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>1분 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 긴제목&nbsp;&nbsp;
                            <span>[10]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2분 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>20일 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2달 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2년 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>
                <div className={style.newlyPosts}>
                  <table className={style.table}>
                    <tbody>
                      <tr>
                        <td>게시글제목&nbsp;&nbsp;
                            <span>[1]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>1분 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 긴제목&nbsp;&nbsp;
                            <span>[10]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2분 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>20일 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2달 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                      <tr>
                        <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목 &nbsp;&nbsp;
                            <span>[0]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <small>2년 전</small>
                            <div className={style.profileColor}/>&nbsp;
                            <span>ESFP 포로리</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                

            </section>
            <section className={style.sectionRightArea}>
                <div>
                    <img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/>
                </div>
            </section>
            </div>
        </div>
        </>
    );
}
export default Main;