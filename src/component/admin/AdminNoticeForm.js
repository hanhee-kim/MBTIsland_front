import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
import axios from "axios";
import { urlroot } from "../../config";
import { useLocation } from 'react-router';
import Swal from "sweetalert2";

const AdminNoticeForm = () => {

    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user);

    const navigate = useNavigate();
    const { no } = useParams(); 
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notice, setNotice] = useState(null); // 작성된 공지사항 객체
    const [modifying, setModifying] = useState(false); // 수정모드 여부
    const [itsDetail, setItsDetail] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 목록으로 돌아가기
    const goToPreviousList = () => {
        const savedState = localStorage.getItem('adminNoticeValue');
        const previousState = savedState ? JSON.parse(savedState) : {};
        navigate('/adminnotice', { state: { fromDetail: true, ...previousState } });
    };


    // 목록에서 특정 게시글제목 클릭하여 진입한 경우
    useEffect(()=> {
        if(no) {
            getNoticeDetail(no);
            setItsDetail(true);
        } else {
            setItsDetail(false); // no파라미터 없이 요청되었을때, 즉 내비 바에서 '공지사항 등록' 클릭하여 navigate된 경우
        }
    }, [no]);
    const getNoticeDetail = (no) => {
        axios.get(`${urlroot}/noticedetail/${no}`)
        .then(res=> {
            //console.log('getNoticeDetail 요청결과: ', res);
            let notice = res.data.notice;
            setNotice(notice);
            setTitle(notice.title);
            setContent(notice.content);
        })
        .catch(err=> {
            //console.log(err);
        });
    }

    // 저장(등록) 버튼 클릭시
    const addPost = async () => {
        try {
            if(!title || !content) {
                Swal.fire({
                    title: "공지사항 등록 실패",
                    text: "제목, 내용을 입력하세요.",
                    icon: "warning",
                });
                return;
            }
            // //console.log("title: ", title, ", content: ", content, "작성자: ", user.username);
            let defaultUrl = `${urlroot}/noticewrite`;
            const response = await axios.post(defaultUrl, {
                                title: title,
                                content: content,
                                writerId: user.username,
                            });
            //console.log('요청결과: ', response);
            const writtenNotice = response.data.notice;
            setNotice(writtenNotice); // 재렌더링 되도록 함
        } catch (error) {
            //console.error('오류내용: ', error);
        }
    }
    
    // 등록 폼에서 취소 버튼 클릭시
    const backToList = () => {
        navigate(`/adminnotice`);
    }

    // 수정 폼에서 저장 버튼 클릭시
    const modifyPost = async () => {
        try {
            if(!title || !content) {
                Swal.fire({
                    title: "공지사항 수정 실패",
                    text: "제목, 내용을 입력하세요.",
                    icon: "warning",
                });
                return;
            }
            // //console.log("no: ", notice.no, "writeDate: ", notice.writeDate, "title: ", title, ", content: ", content, "writerId: ", user.username);
            let defaultUrl = `${urlroot}/noticemodify`;
            const response = await axios.post(defaultUrl, {
                                no: notice.no, // 수정될 게시글 번호를 전송
                                title: title,
                                content: content,
                                writerId: user.username,
                                writeDate: notice.writeDate, // 기존 등록일을 전송
                            });
            //console.log('수정 요청결과: ', response);
            const modifiedNotice = response.data.notice;
            setNotice(modifiedNotice);
            setModifying(false);
        } catch (error) {
            //console.error('수정 오류내용: ', error);
        }
    }

    // 삭제 버튼 클릭시
    const deleteNotice = () => {
        let noArr = [notice.no];

        Swal.fire({
            title: '삭제하시겠습니까?',
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
                        backToList();
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
    }

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>공지사항 등록ꞏ수정</div>
            <div className={styleFrame.sectionContents}>
                {/* 최초 등록 폼 */}
                {!notice && modifying===false && itsDetail===false && (
                    <form className={style.noticeForm}>
                        <input type="text" placeholder="제목을 입력하세요" className={style.formtitle} onChange={(e)=>setTitle(e.target.value)}/>
                        <textarea placeholder="내용을 입력하세요" className={style.formContent} rows="18" onChange={(e)=>setContent(e.target.value)}/>
                        <div className={style.formBtns}>
                            <span>
                                <input type="button" value="취소" onClick={backToList}/>
                                <input type="button" value="저장" onClick={addPost}/>
                            </span>
                        </div>
                    </form>    
                )}
                {/* 등록, 수정 직후 */}
                {notice && modifying===false && itsDetail===false && (
                    <form className={style.noticeForm}>
                        <div className={style.titleAndDate}>
                            <span>등록: {formatDate(notice.writeDate)}&nbsp;&nbsp;&nbsp;조회: {!notice.viewCnt? 0 : notice.viewCnt}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <input type="text" className={style.formtitle} value={notice.title} readOnly/>
                        <textarea className={style.formContent} rows="18" value={notice.content} readOnly/>
                        <div className={style.formBtns}>
                            <input type="button" value="목록" onClick={goToPreviousList} className={style.previousListBtn}/>
                            <span>
                                <input type="button" value="수정" onClick={()=>setModifying(true)}/>
                                <input type="button" value="삭제" onClick={deleteNotice}/>
                            </span>
                        </div>
                    </form>    
                )}
                {/* 수정 폼 */}
                {notice && modifying===true && (
                    <form className={style.noticeForm}>
                        <div className={style.titleAndDate}>
                            <span>등록: {formatDate(notice.writeDate)}&nbsp;&nbsp;&nbsp;조회: {!notice.viewCnt? 0 : notice.viewCnt}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <input type="text" className={style.formtitle} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <textarea className={style.formContent} rows="18" value={content} onChange={(e)=>setContent(e.target.value)}/>
                        <div className={style.formBtns}>
                            <span>
                                <input type="button" value="취소" onClick={()=>setModifying(false)}/>
                                <input type="button" value="저장" onClick={modifyPost}/>
                            </span>
                        </div>
                    </form>
                )}
                {/* 목록->상세 진입 */}
                {notice && modifying===false && itsDetail===true && (
                    <form className={style.noticeForm}>
                        <div className={style.titleAndDate}>
                            <span>등록: {formatDate(notice.writeDate)}&nbsp;&nbsp;&nbsp;조회: {!notice.viewCnt? 0 : notice.viewCnt}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <input type="text" className={style.formtitle} value={notice.title} readOnly/>
                        <textarea className={style.formContent} rows="18" value={notice.content} readOnly/>
                        <div className={style.formBtns}>
                            <input type="button" value="목록" onClick={goToPreviousList} className={style.previousListBtn}/>
                            <span>
                                <input type="button" value="수정" onClick={()=>setModifying(true)}/>
                                <input type="button" value="삭제" onClick={deleteNotice}/>
                            </span>
                        </div>
                    </form>    
                )}
            </div>
        </div>
        </>
    );
}
export default AdminNoticeForm;