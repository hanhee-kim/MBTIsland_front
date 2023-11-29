import { Popover, PopoverBody, Table } from "reactstrap";

import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";

const MBTmiDetail = () => {

    // 팝오버 여닫힘 상태, 함수
    const [popoverStates, setPopoverStates] = useState({popover1:false, popover2:false});
    const togglePopover = (popoverKey) => {
        setPopoverStates((prevState) => ({...prevState, [popoverKey]:!prevState[popoverKey]}));
    };

    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {

        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setPopoverStates({popover1: false, popover2: false});
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

            <section className={style.section}>
                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>
                <span className={style.currnetCategory}>잡담 &gt;</span>
                <div className={style.postArea}>
                    <div>
                        <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>togglePopover("popover1")} id="popover1"/>
                        <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover1} target="popover1" toggle={()=>togglePopover("popover1")}>
                            <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                            <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                        </Popover><br/><br/><br/>
                    </div>
                    <h2 className={style.postTitle}>게시글 상세페이지 글제목은 크게 표시</h2>
                    <div className={style.profileColor}/>&nbsp;
                    <span>ESFP 포로리</span>
                    <h6>2023년 11월 18일  00:28 
                        <span><img src={"/view-icon.png" } alt="조회" className={style.viewIcon} /> 22</span>
                    </h6>
                    <div className={style.postContent}>
                        게시글 내용 텍스트<br/>
                        게시글 내용 텍스트게시글 내용 텍스트<br/>
                        게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트?<br/>
                        게시글 내용 텍스트<br/><br/>
                        게시글 내용 텍스트<br/>
                        게시글 내용 텍스트게시글 내용 텍스트<br/><br/>
                        게시글 내용 텍스트<br/><br/>
                        게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트 줄바꿈처리줄바꿈처리줄바꿈처리<br/>
                    </div>
                    <p>
                        <img src={"/thumbIcon.png" } alt="추천아이콘" className={style.thumbIconDetail} />
                        <span>&nbsp;추천 8</span>
                    </p>
                    <div className={style.postBtns}>
                        <button>목록</button>
                        <button><img src={"/reportIcon.png" } alt="신고아이콘" className={style.reportIcon} />&nbsp;신고</button>
                    </div>
                </div>
                <div className={style.commentArea}>
                    <h6>&nbsp;&nbsp;70개의 댓글</h6>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className={style.commentTd1row}>
                                        <div className={style.CommentProfileColor}/>&nbsp;
                                        <span>ESFP 포로리</span>
                                        <span>작성자</span>
                                        <small>6분 전</small>
                                        <span>
                                            <img src={"/popover-icon.png" } alt="..." className={style.commentPopoverIcon} onClick={()=>togglePopover("popover2")} id="popover2"/>
                                            <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover2} target="popover2" toggle={()=>togglePopover("popover2")}>
                                                    <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                                                    <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                                            </Popover>
                                        </span>
                                    </div>
                                    <div className={style.commentTd2row}>
                                        댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용
                                    </div>
                                    <div className={style.commentTd3row}>
                                        <small>답글쓰기</small>
                                    </div>
                                </td>
                            </tr>
                            <tr className={style.loginUsersComment}>
                                <td>
                                    <div className={style.commentTd1row}>
                                        <div className={style.CommentProfileColor}/>&nbsp;
                                        <span>ISFJ 너부리</span>
                                        <small>6분 전</small>
                                        <span>
                                            <img src={"/popover-icon.png" } alt="..." className={style.commentPopoverIcon} onClick={()=>togglePopover("popover2")} id="popover2"/>
                                            <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover2} target="popover2" toggle={()=>togglePopover("popover2")}>
                                                    <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                                                    <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                                            </Popover>
                                        </span>
                                    </div>
                                    <div className={style.commentTd2row}>
                                        댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용
                                    </div>
                                    <div className={style.commentTd3row}>
                                        <small>답글쓰기</small>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={style.commentTd1row}>
                                        <div className={style.CommentProfileColor}/>&nbsp;
                                        <span>ISFJ 너부리</span>
                                        <small>2023년 11월 19일  02:14</small> 
                                        <span>
                                            <img src={"/popover-icon.png" } alt="..." className={style.commentPopoverIcon} onClick={()=>togglePopover("popover2")} id="popover2"/>
                                            <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover2} target="popover2" toggle={()=>togglePopover("popover2")}>
                                                    <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                                                    <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                                            </Popover>
                                        </span>
                                    </div>
                                    <div className={style.commentTd2row}>
                                        댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용
                                    </div>
                                    <div className={style.commentTd3row}>
                                        <small>답글쓰기</small>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                
            </section>
        </div>
        </>
    );
}
export default MBTmiDetail;