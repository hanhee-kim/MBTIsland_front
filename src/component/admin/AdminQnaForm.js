import { Nav, NavItem, NavLink, Table, Input, Button } from "reactstrap";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import styleQna from "../../css/admin/AdminQna.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";
import { useNavigate, useParams } from 'react-router';
import axios from "axios";
import { useSelector } from "react-redux";
import { urlroot } from "../../config";

const AdminQnaForm = () => {

    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user);
    
    const { no } = useParams();
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [content, setContent] = useState('');
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
        getQuestionDetail(no);
    }, [no]);

    const getQuestionDetail = (no) => {
        axios.get(`${urlroot}/questiondetail/${no}`)
        .then(res=> {
            console.log("getQuestionDetail결과: ", res);
            let question = res.data.question;
            let answer = null;
            if(res.data.answer) answer = res.data.answer;
            setQuestion(question);
            setAnswer(answer);
        })
        .catch(err=> {
            console.log(err);
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

    const navigate = useNavigate();
    const getQuestionListOfWriterId = (writerId) => {
        navigate(`/adminqna?writerId=${writerId}`); // 파라미터와 함께 목록컴포넌트로 이동
    }

     // 이전(목록이동) 버튼
    const goToPreviousList = () => {
        navigate(`/adminqna`);
    }

    const addPost = async () => {
        console.log('답변 등록 버튼 클릭');
        try {
            if(!content) {
                alert('답변 내용을 입력하세요.');
                return;
            }
            console.log("content: ", content, ", writerId: ", user.username, "문의글번호인 파라미터no: ", no, ", 문의글제목: ", question.title, ", 문의글작성자: ", question.writerId);
            let defaultUrl = `${urlroot}/answerwrite`;
            const response = await axios.post(defaultUrl, {
                                title: `Re: ${question.title}`,
                                content: content,
                                writerId: user.username,
                                questionNo: question.no,
                                questionWriterId: question.writerId
                            });
            console.log('요청결과: ', response); // 요청성공시 컨트롤러로부터 반환받은 res
            const answer = response.data.answer;
            setAnswer(answer); // state변경으로 인해 재렌더링되도록 한다

        } catch (error) {
            console.error('오류내용: ', error);
        }
    }
    
    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>1:1 문의 답변
                <button className={styleQna.prevBtn} onClick={goToPreviousList}>이전</button>
            </div>

                {question? (
                    <div className={styleFrame.sectionContents}>
                        <div className={styleQna.postArea}>
                            <h2 className={styleQna.postTitle}>{question.title}</h2>
                            <span onClick={()=>setOpen(!open)} id="Popover1"><b>{question.writerId}</b></span>
                            <Popover className={styleQna.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                                <PopoverBody className={styleQna.popoverItem} onClick={() => getQuestionListOfWriterId(question.writerId)}>문의글 모아보기</PopoverBody>
                            </Popover>
                            <span>{formatDate(question.writeDate)}</span>
                            <div className={styleQna.postContent}>{question.content}</div>      
                        </div>
                        <div className={styleQna.answerArea}>
                            <div className={styleQna.arrowIconArea}>
                            <img src={"/answerArrowIcon.png" } alt="" className={styleQna.arrowIcon} />
                            </div>
                            <div className={styleQna.answerFormArea}>
                                {answer? (
                                <div className={styleQna.existAnswer}>
                                    <span>{answer.title}</span>
                                    <small>{answer.isRead}</small>
                                    <span>{formatDate(answer.writeDate)}</span>
                                    <hr/>
                                    <div className={styleQna.answerContent}>{answer.content}</div>
                                </div>
                                ) : (
                                <>
                                    <textarea className={styleQna.answerForm} placeholder="문의 답변 입력란" onChange={(e)=>setContent(e.target.value)}/>
                                    <Button color="dark" onClick={addPost}>답변하기</Button>
                                </>
                                )}
                            </div>
                        </div>
                    </div>

                ) : (
                    <p>...페이지 로딩 중...</p>
                )}


        </div>
        </>
    );
}
export default AdminQnaForm;