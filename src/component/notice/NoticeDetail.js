import style from "../../css/notice/Notice.module.css";
import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { urlroot } from "../../config";
import Swal from "sweetalert2";

const NoticeDetail = () => {
    
    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user);

    const { no, search, page } = useParams();
    const location = useLocation();

    const [notice, setNotice] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    };

    useEffect(()=> {
        getNoticeDetail(no);
    }, [no]);

    const getNoticeDetail = (no) => {
        axios.get(`${urlroot}/noticedetail/${no}`)
        .then(res=> {
            //console.log(res);
            let notice = res.data.notice;
            setNotice(notice);
        })
        .catch(err=> {
            //console.log(err);
        });
    }
    
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

    const hideNotice = () => {
        let noArr = [notice.no];

        Swal.fire({
            title: '게시글을 숨김처리하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${urlroot}/hidenotice/${noArr}`)
                    .then(res => {
                        Swal.fire({
                            title: "완료되었습니다.",
                            icon: "success",
                        });
                        goToPreviousList();
                    })
                    .catch(err => {
                        //console.log(err);
                        Swal.fire({
                            title: 'Error',
                            icon: 'error'
                        });
                    });
            }
        });

        setOpen(false);
    }

    const deleteNotice = () => {
        let noArr = [notice.no];

        Swal.fire({
            title: '게시글을 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${urlroot}/deletenotice/${noArr}`)
                    .then(res => {
                        Swal.fire({
                            title: "완료되었습니다.",
                            icon: "success",
                        });
                        goToPreviousList();
                    })
                    .catch(err => {
                        //console.log(err);
                        Swal.fire({
                            title: 'Error',
                            icon: 'error'
                        });
                    });
            }
        });

        setOpen(false);
    }

    // 목록으로 가기 버튼
    const navigate = useNavigate();
    const goToPreviousList = () => {
        navigate(-1);
    }

    return (
        <>
        <div className={style.container} id="top">

            <section className={style.sectionLeftArea}></section>
            <section className={style.section} style={{minHeight: '990'}}>
                <div className={style.boardTitle}>공지사항</div>
                <div className={style.postArea}>

                    {/* 로그인유저가 관리자일때만 표시 */}
                    {user.username!=="" && user.userRole==='ROLE_ADMIN' && (
                        <div>
                            <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>setOpen(!open)} id="popover1"/>
                            <Popover  className={style.popover} placement="bottom" isOpen={open} target="popover1" toggle={()=>setOpen(!open)}>
                                <PopoverBody className={style.popoverItem} onClick={()=>hideNotice()}>숨김</PopoverBody>
                                <PopoverBody className={style.popoverItem} onClick={()=>deleteNotice()}>삭제</PopoverBody>
                            </Popover><br/><br/><br/>
                        </div>
                    )}
                    
                    {notice? (
                        <>
                            <h2 className={style.postTitle}>{notice.title}</h2>
                            <h6>{formatDate(notice.writeDate)}
                                <span><img src={"/viewIcon.png" } alt="조회" className={style.viewIcon} />&nbsp;{notice.viewCnt}</span>
                            </h6>
                            <div className={style.postContent}>{notice.content}</div>
                        </>
                    ) : (
                        <p>...페이지 로딩 중...</p>
                    )}

                    <div className={style.postBtns}>
                        <button onClick={goToPreviousList}>목록</button>
                    </div>
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
export default NoticeDetail;