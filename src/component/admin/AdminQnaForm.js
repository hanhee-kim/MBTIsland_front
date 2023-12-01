import { Nav, NavItem, NavLink, Table, Input, Button } from "reactstrap";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import styleQna from "../../css/admin/AdminQna.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminQnaForm = () => {
    
    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>1:1 문의 답변</div>
            <div className={styleFrame.sectionContents}>

                <div className={styleQna.postArea}>
                    <h2 className={styleQna.postTitle}>경고 1회 더 받으면 계정 정지라는데 왜 그런건가요?</h2>
                    <span><b>userid0123</b></span>
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