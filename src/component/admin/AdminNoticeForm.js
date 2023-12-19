import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminNoticeForm = () => {

    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user.user);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notice, setNotice] = useState(null); // 작성된 공지사항 객체
    const [modifying, setModifying] = useState(false);
    const navigate = useNavigate();

    // 저장(등록) 버튼 클릭시
    const addPost = async () => {
        try {
            if(!title || !content) {
                alert('제목과 내용을 입력하세요.');
                return;
            }
            // console.log("title: ", title, ", content: ", content, "작성자: ", user.username);
            let defaultUrl = 'http://localhost:8090/noticewrite';
            const response = await axios.post(defaultUrl, {
                                title: title,
                                content: content,
                                writerId: user.username,
                            });
            console.log('요청결과: ', response);
            const writtenNotice = response.data.notice;
            setNotice(writtenNotice); // 재렌더링 되도록 함
        } catch (error) {
            console.error('오류내용: ', error);
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
                alert('제목과 내용을 입력하세요.');
                return;
            }
            // console.log("no: ", notice.no, "writeDate: ", notice.writeDate, "title: ", title, ", content: ", content, "writerId: ", user.username);
            let defaultUrl = 'http://localhost:8090/noticemodify';
            const response = await axios.post(defaultUrl, {
                                no: notice.no, // 수정될 게시글 번호를 전송
                                title: title,
                                content: content,
                                writerId: user.username,
                                writeDate: notice.writeDate, // 기존 등록일을 전송
                            });
            console.log('수정 요청결과: ', response);
            const modifiedNotice = response.data.notice;
            setNotice(modifiedNotice);
            setModifying(false);
        } catch (error) {
            console.error('수정 오류내용: ', error);
        }
    }

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>공지사항 등록</div>
            <div className={styleFrame.sectionContents}>
                {/* 최초 등록 폼 */}
                {!notice && modifying===false && (
                    <form className={style.noticeForm}>
                        <li>제목</li>
                        <input type="text" className={style.formtitle} onChange={(e)=>setTitle(e.target.value)}/>
                        <li>본문</li>
                        <textarea className={style.formContent} rows="18" onChange={(e)=>setContent(e.target.value)}/>
                        <div className={style.formBtns}>
                            <input type="button" value="취소" onClick={backToList}/>
                            <input type="button" value="저장" onClick={addPost}/>
                        </div>
                    </form>    
                )}
                {/* 등록, 수정 직후 */}
                {notice && modifying===false && (
                    <form className={style.noticeForm}>
                        <li>제목</li>
                        <div className={style.formtitle}>{notice.title}</div>
                        <li>본문</li>
                        <div className={style.formContent}>{notice.content}</div>
                        <div className={style.formBtns}>
                            <input type="button" value="수정" onClick={()=>setModifying(true)}/>
                        </div>
                    </form>    
                )}
                {/* 수정 폼 */}
                {notice && modifying===true && (
                    <form className={style.noticeForm}>
                        <li>제목</li>
                        <input type="text" className={style.formtitle} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <li>본문</li>
                        <textarea className={style.formContent} rows="18" value={content} onChange={(e)=>setContent(e.target.value)}/>
                        <div className={style.formBtns}>
                            <input type="button" value="취소" onClick={()=>setModifying(false)}/>
                            <input type="button" value="저장" onClick={modifyPost}/>
                        </div>
                    </form>
                )}
            </div>
        </div>
        </>
    );
}
export default AdminNoticeForm;