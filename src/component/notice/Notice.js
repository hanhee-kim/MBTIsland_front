import { Table } from "reactstrap";

import style from "../../css/notice/Notice.module.css";
import React, { useState } from "react";
import {Link} from "react-router-dom";

const Notice = () => {

    const [pageInfo, setPageInfo] = useState({curPage: 1, totalPage: 11, dataTotalCnt: 102});
    const [noticeNotHidedListByPaging, setNoticeNotHidedListByPaging] = useState([
        {postNo: 33, title: 'MBT-WHY(Q&A) 게시판 이용수칙 안내', writedate: '2023-12-03', viewCnt: 22},
        {postNo: 32, title: 'MB-TMI(자유) 게시판 이용수칙 안내', writedate: '2023-12-02', viewCnt: 33},
        {postNo: 31, title: 'M-BATTLE(밸런스게임) 게시판 이용수칙 안내', writedate: '2023-12-01', viewCnt: 44},
        {postNo: 30, title: '신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-30', viewCnt: 22},
        {postNo: 29, title: '신고제와 신고된 게시물, 회원의 제재처리 안내신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-29', viewCnt: 22},
        {postNo: 28, title: 'MBT-WHY(Q&A) 게시판 이용수칙 안내', writedate: '2023-11-28', viewCnt: 33},
        {postNo: 27, title: 'MB-TMI(자유) 게시판 이용수칙 안내', writedate: '2023-11-27', viewCnt: 111},
        {postNo: 26, title: 'M-BATTLE(밸런스게임) 게시판 이용수칙 안내', writedate: '2023-11-26', viewCnt: 222},
        {postNo: 25, title: '신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-25', viewCnt: 333},
        {postNo: 24, title: '신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-25', viewCnt: 333},
    ]);

    return (
        <>
        <div className={style.container} id="top">

            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>

                <div className={style.boardTitle} >공지사항</div>

                <div className={style.aboveTable}>
                    <h5>총 {pageInfo.dataTotalCnt}건 현재 {pageInfo.curPage}/{pageInfo.totalPage}페이지</h5>
                    <div className={style.searchBar}>
                        <input type="text"/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} />
                    </div>
                </div>

                <table className={style.table}>
                    <tbody>
                        {noticeNotHidedListByPaging.length>0 && noticeNotHidedListByPaging.map(post => {
                            return(
                            <tr>
                                <td>[공지]</td>
                                <td>{post.title}</td>
                                <td>{post.writedate}</td>
                                <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>{post.viewCnt}</td>
                            </tr>
                            )
                        })}
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