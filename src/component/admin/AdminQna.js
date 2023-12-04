import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import styleQna from "../../css/admin/AdminQna.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminQna = () => {

    const [pageInfo, setPageInfo] = useState({dataTotalCnt: 101, finishedCnt: 96, unFinishedCnt: 3});
    const [qnaListByPaging, setQnaListByPaging] = useState([
        {postNo: 130, title: '회원문의글제목', writedate: '2023-11-16', writerId: 'userId0123', isFinished: 'N'},
        {postNo: 129, title: '긴 회원문의글제목긴 회원문의글제목긴 회원문의글제목', writedate: '2023-11-16', writerId: 'userId0123', isFinished: 'Y'},
        {postNo: 128, title: '회원문의글제목', writedate: '2023-11-16', writerId: 'userId0123', isFinished: 'N'},
        {postNo: 127, title: '회원문의글제목', writedate: '2023-11-16', writerId: 'userId0123', isFinished: 'N'},
        {postNo: 126, title: '긴 회원문의글제목긴 회원문의글제목긴 회원문의글제목', writedate: '2023-11-16', writerId: 'userId0123', isFinished: 'Y'},
        {postNo: 125, title: '회원문의글제목', writedate: '2023-11-15', writerId: 'userId0123', isFinished: 'Y'},
        {postNo: 124, title: '긴 회원문의글제목긴 회원문의글제목긴 회원문의글제목', writedate: '2023-11-15', writerId: 'userId0123', isFinished: 'Y'},
        {postNo: 123, title: '회원문의글제목', writedate: '2023-11-15', writerId: 'userId0123', isFinished: 'Y'},
        {postNo: 122, title: '회원문의글제목', writedate: '2023-11-15', writerId: 'userId0123', isFinished: 'Y'},
        {postNo: 121, title: '회원문의글제목', writedate: '2023-11-15', writerId: 'userId0123', isFinished: 'Y'},
    ]);

    const [open,setOpen]=useState(false);

    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {
        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setOpen(false);
            } 
        };
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>1:1 문의 답변</div>
            <div className={styleFrame.sectionContents}>
                <div className={style.filterBtns}>
                    <div>
                        <span className={`${style.filterBtn} ${style.filterActive}`}>전체 : {pageInfo.dataTotalCnt}</span>
                        <span className={style.filterBtn}>처리완료 : {pageInfo.finishedCnt}</span>
                        <span className={style.filterBtn}>미처리 : {pageInfo.unFinishedCnt}</span>
                    </div>
                    <div className={style.searchBar}>
                        <input type="text"/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} />
                    </div>
                </div>
                <table className={styleQna.table}>
                    <thead>
                        <tr>
                            <td>번호</td>
                            <td>문의일</td>
                            <td>제목</td>
                            <td>회원</td>
                            <td>상태</td>
                        </tr>
                    </thead>
                    <tbody>
                        {qnaListByPaging.length>0 && qnaListByPaging.map(post => {
                            return (
                            <tr className={post.isFinished==='Y'? styleQna.completedQna : ''}>
                                <td>{post.postNo}</td>
                                <td>{post.writedate}</td>
                                <td>{post.title}</td>
                                <td onClick={()=>setOpen(!open)} id="Popover1">{post.writerId}</td>
                                <Popover className={styleQna.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                                    <PopoverBody className={styleQna.popoverItem}>문의글 모아보기</PopoverBody>
                                </Popover>
                                <td>{post.isFinished==='N'? ('미처리') : ('처리')}</td>
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
export default AdminQna;