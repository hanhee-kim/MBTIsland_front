import style from "../../css/notice/Notice.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

const NoticeDetail = () => {
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
        <div className={style.container}>

            <section className={style.sectionLeftArea}></section>
            <section className={style.section} style={{minHeight: '990'}}>
                <div className={style.boardTitle}>공지사항</div>
                <div className={style.postArea}>
                    <div>
                    <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>setOpen(!open)} id="Popover1"/>
                        <Popover  className={style.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                            <PopoverBody className={style.popoverItem}>숨김/해제</PopoverBody>
                            <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                            <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                        </Popover><br/><br/><br/>
                    </div>
                    <h2 className={style.postTitle}>신고제와 신고된 게시물, 회원의 제재처리 안내</h2>
                    <h6>2023년 11월 18일  00:28 
                        <span><img src={"/view-icon.png" } alt="조회" className={style.viewIcon} /> 22</span>
                    </h6>
                    <div className={style.postContent}>
                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트?<br/>
                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트<br/><br/><br/>

                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트 줄바꿈처리줄바꿈처리줄바꿈처리
                    </div>
                </div>
            </section>
            <section className={style.sectionRightArea}>
                <div>
                    <img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/>
                </div>
            </section>

        </div>
        </>
    );
}
export default NoticeDetail;