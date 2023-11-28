import style from "../../css/notice/Notice.module.css";
import React, { useState } from "react";
import {Link} from "react-router-dom";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

const NoticeDetail = () => {
    const [open,setOpen]=useState(false);

    return (
        <>
        <div className={style.container}>

            <section className={style.section} style={{minHeight: '990'}}>

                <div className={style.boardTitle}>공지사항</div>
                
                <div className={style.postBox}>
                    <div className={style.postTitleArea}>
                        <div className={style.postTitle}>신고제와 신고된 게시물, 회원의 제재처리 안내</div>
                        <div>
                            <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>setOpen(!open)} id="Popover1"/>
                            <Popover  className={style.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                                <PopoverBody className={style.popoverItem}>숨김/해제</PopoverBody>
                                <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                                <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                            </Popover><br/><br/><br/>
                        </div>
                    </div>
                    <div className={style.writeDateAndView}>2023년 11월 19일  19:41<img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>22</div>
                    <div className={style.postContent}>
                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트?<br/>
                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트<br/><br/><br/>

                    게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트 줄바꿈처리줄바꿈처리줄바꿈처리
                    </div>

                </div>

            </section>

        </div>
        </>
    );
}
export default NoticeDetail;