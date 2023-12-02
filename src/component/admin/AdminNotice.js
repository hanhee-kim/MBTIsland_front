import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React, { useState } from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminNotice = () => {

    const [pageInfo, setPageInfo] = useState({dataTotalCnt: 101, displayCnt: 95, hidedCnt: 6});
    const [noticeListByPaging, setNoticeListByPaging] = useState([
        {postNo: 33, title: 'MBT-WHY(Q&A) 게시판 이용수칙 안내', writedate: '2023-12-03', viewCnt: 22, isHided: 'N'},
        {postNo: 32, title: 'MB-TMI(자유) 게시판 이용수칙 안내', writedate: '2023-12-02', viewCnt: 33, isHided: 'N'},
        {postNo: 31, title: 'M-BATTLE(밸런스게임) 게시판 이용수칙 안내', writedate: '2023-12-01', viewCnt: 44, isHided: 'N'},
        {postNo: 30, title: '신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-30', viewCnt: 22, isHided: 'Y'},
        {postNo: 29, title: '신고제와 신고된 게시물, 회원의 제재처리 안내신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-29', viewCnt: 22, isHided: 'N'},
        {postNo: 28, title: 'MBT-WHY(Q&A) 게시판 이용수칙 안내', writedate: '2023-11-28', viewCnt: 33, isHided: 'Y'},
        {postNo: 27, title: 'MB-TMI(자유) 게시판 이용수칙 안내', writedate: '2023-11-27', viewCnt: 111, isHided: 'N'},
        {postNo: 26, title: 'M-BATTLE(밸런스게임) 게시판 이용수칙 안내', writedate: '2023-11-26', viewCnt: 222, isHided: 'N'},
        {postNo: 25, title: '신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-25', viewCnt: 333, isHided: 'Y'},
        {postNo: 24, title: '신고제와 신고된 게시물, 회원의 제재처리 안내', writedate: '2023-11-25', viewCnt: 333, isHided: 'N'},
    ]);

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>공지사항 목록</div>
            <div className={styleFrame.sectionContents}>
                <div className={style.filterBtns}>
                    <div>
                        <span className={`${style.filterBtn} ${style.filterActive}`}>전체 : {pageInfo.dataTotalCnt}</span>
                        <span className={style.filterBtn}>표시 : {pageInfo.displayCnt}</span>
                        <span className={style.filterBtn}>숨김 : {pageInfo.hidedCnt}</span>
                    </div>
                    <div className={style.searchBar}>
                        <input type="text"/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} />
                    </div>
                </div>
                <div className={style.checkboxAndButtons}>
                    <span>
                        <input type="checkbox" className={style.checkbox}/><span>&nbsp;선택</span>
                    </span>
                    <span>
                        <input type="button" value="숨김"/>
                        <input type="button" value="삭제"/>
                    </span>
                </div>
                <table className={style.table}>
                    <tbody>
                        {noticeListByPaging.length>0 && noticeListByPaging.map(post => {
                            return (
                            <tr>
                                <td><input type="checkbox" className={style.checkbox}/></td>
                                <td>{post.title}</td>
                                <td>{post.writedate}</td>
                                <td>
                                    {post.isHided==='N'? (
                                    <img src={"/viewIcon-bold.png" } alt="" className={style.openEye}/>
                                    ) : (
                                    <img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/>
                                    )}
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className={style.paging}>
                    <span>&lt;</span>
                    <span className={style.activePage} style={{background:'#f8f8f8'}}>1</span>
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
            </div>
        </div>
        </>
    );
}
export default AdminNotice;