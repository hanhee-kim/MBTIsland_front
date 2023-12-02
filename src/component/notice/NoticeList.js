import { Table } from "reactstrap";

import style from "../../css/notice/Notice.module.css";
import React from "react";
import {Link} from "react-router-dom";

const Notice = () => {
    return (
        <>
        <div className={style.container} id="top">

            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>

                <div className={style.boardTitle} >공지사항</div>

                <div className={style.aboveTable}>
                    <h5>총 101건 현재 1/11페이지</h5>
                    <div className={style.searchBar}>
                        <input type="text"/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} />
                    </div>
                </div>

                <table className={style.table}>
                    <tbody>
                        <tr>
                            <td>[공지]</td>
                            <td>MBT-WHY(Q&A) 게시판 이용수칙 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>MB-TMI(자유) 게시판 이용수칙 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>M-Battle-TI(밸런스게임) 게시판 이용수칙 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>MBT-WHY(Q&A) 게시판 이용수칙 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>MB-TMI(자유) 게시판 이용수칙 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>M-Battle-TI(밸런스게임) 게시판 이용수칙 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>123</td>
                        </tr>
                        <tr>
                            <td>[공지]</td>
                            <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                            <td>2023-11-16</td>
                            <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>17</td>
                        </tr>
                    </tbody>
                </table>
                <div className={style.paging}>
                    <span>&lt;</span>
                    <span className={style.activePage}>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>&gt;</span>
                </div>
            </section>
            <section className={style.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                </div>
            </section>

        </div>
        </>
    );
}
export default Notice;