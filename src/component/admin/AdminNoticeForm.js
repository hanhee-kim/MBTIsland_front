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
    const navigate = useNavigate();

    // 저장(등록) 버튼 클릭시
    const addPost = async () => {
        console.log('공지사항 등록 버튼 클릭');
        try {
            if(!title || !content) {
                alert('답변 내용을 입력하세요.');
                return;
            }
            console.log("title: ", title, ", content: ", content, "작성자: ", user.username);
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
    
    // 취소 버튼 클릭시
    const backToList = () => {
        navigate(`/adminnotice`);
    }


    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>공지사항 등록</div>
            <div className={styleFrame.sectionContents}>
                {!notice? (
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
                ) : (
                    <form className={style.noticeForm}>
                        <li>제목</li>
                        <input type="text" className={style.formtitle} value={notice.title || ''} readOnly/>
                        <li>본문</li>
                        <textarea className={style.formContent} rows="18" value={notice.content || ''} readOnly/>
                        <div className={style.formBtns}>
                        <input type="button" value="수정"/>
                        </div>
                    </form>    
                )}
            </div>
        </div>
        </>
    );
}
export default AdminNoticeForm;