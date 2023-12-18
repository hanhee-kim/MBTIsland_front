import { Nav, NavItem, NavLink, Table, Input, Button } from "reactstrap";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import styleQna from "../../css/admin/AdminQna.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminQnaForm = () => {

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

                <div className={styleQna.postArea}>
                    <h2 className={styleQna.postTitle}>경고 1회 더 받으면 계정 정지라는데 왜 그런건가요?</h2>
                    <span onClick={()=>setOpen(!open)} id="Popover1"><b>userid0123</b></span>
                    <Popover className={styleQna.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                        <PopoverBody className={styleQna.popoverItem}>문의글 모아보기</PopoverBody>
                    </Popover>
                    <span>2023년 11월 19일  19:41</span>
                    <div className={styleQna.postContent}>
                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트?<br/>
                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트<br/><br/><br/>

                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트 줄바꿈처리줄바꿈처리줄바꿈처리
                    </div>      
                </div>

                <div className={styleQna.answerArea}>
                    <div className={styleQna.arrowIconArea}>
                    <img src={"/answerArrowIcon.png" } alt="검색" className={styleQna.arrowIcon} />
                    </div>
                    <div className={styleQna.answerFormArea}>
                        <textarea className={styleQna.answerForm} placeholder="문의 답변 입력란"/>
                        <Button color="dark">답변하기</Button>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}
export default AdminQnaForm;