import { Popover, PopoverBody, Table } from "reactstrap";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";

const MBTmiDetail = () => {

    const { no, category, type, search, page } = useParams();
    const location = useLocation();
    
    const [mbtmi, setMbtmi] = useState(null);
    const [mbtmiCommentList, setMbtmiCommentList] = useState([]);
    const [mbtmiCommentCnt, setMbtmiCommentCnt] = useState(0);
    const [isRecommended, setIsRecommended] = useState('Y');
    const [isBookmarked, setIsBookmarked] = useState('Y');
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    };
    const [commentPage, setCommentPage] = useState(1); // 페이지 이동번호

    useEffect(()=> {
        getMbtmiDetail(no);
    }, [no]);

    const getMbtmiDetail = (no) => {
        let defaultUrl = `http://localhost:8090/mbtmidetail/${no}`;
        if(commentPage!==null) defaultUrl += `?commentPage=${commentPage}`;
        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let mbtmi = res.data.mbtmi;
            // let isRecommended = res.data.isRecommended;
            // let isBookmarked = res.data.isBookmarked;
            let mbtmiCommentList = res.data.mbtmiCommentList;
            let mbtmiCommentCnt = res.data.mbtmiCommentCnt;
            setMbtmi(mbtmi);
            // setIsRecommended(isRecommended);
            // setIsBookmarked(isBookmarked);
            setMbtmiCommentList(mbtmiCommentList);
            setMbtmiCommentCnt(mbtmiCommentCnt);
        })
        .catch(err=> {
            console.log(err);
        });
    }
    // const [mbtmi, setMbtmi] = useState({
    //     postNo: 33, 
    //     writerId: 'userId0123',
    //     writerMbti: 'ESFP',
    //     writerNickname: '포로리',
    //     writedate: '2023년 11월 18일 00:28',
    //     viewCnt: 22,
    //     recommentCnt: 8,
    //     postTitle: '게시글 상세페이지 글제목',
    //     postContent: 
    //         '게시글 내용 텍스트!!<br/>게시글 내용 텍스트게시글 내용 텍스트<br/>게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트?<br/>게시글 내용 텍스트<br/><br/>게시글 내용 텍스트<br/>게시글 내용 텍스트게시글 내용 텍스트<br/><br/>게시글 내용 텍스트<br/><br/>게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트게시글 내용 텍스트 줄바꿈처리줄바꿈처리줄바꿈처리<br/>',
    // });
    
    const deleteMbtmi = (no) => {
        axios.delete(`http://localhost:8090/deletembtmi/${no}`)
        .then(res => {
            window.confirm('게시글을 삭제하시겠습니까?');
            alert('완료되었습니다.');
            goToPreviousList();
        })
        .catch(err => {
            console.log(err);
        })
    }
    // 목록으로 가기 버튼
    const navigate = useNavigate();
    const goToPreviousList = () => {
        navigate(-1);
    }


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

    


    // 댓글테이블 데이터 가정
    const commentsData = [
        { index: 1, author: "User1", createdDate: "2023-11-25", content: "1차댓글1", parentIndex: null },
        { index: 2, author: "User2", createdDate: "2023-11-26", content: "2차댓글1", parentIndex: 1 },
        { index: 3, author: "User3", createdDate: "2023-11-27", content: "1차댓글2", parentIndex: null },
        { index: 4, author: "User4", createdDate: "2023-11-28", content: "2차댓글2", parentIndex: 1 },
        { index: 5, author: "User4", createdDate: "2023-11-29", content: "2차댓글3", parentIndex: 1 },
        { index: 6, author: "User4", createdDate: "2023-11-30", content: "2차댓글4", parentIndex: 3 },
        { index: 7, author: "User4", createdDate: "2023-11-31", content: "2차댓글5", parentIndex: 3 },
        { index: 8, author: "User4", createdDate: "2023-11-31", content: "1차댓글3", parentIndex: null }
    ];

    return (
        <>
        <div className={style.container} id="top">

            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>
                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>

                {mbtmi? (
                    <>
                    <span className={style.currnetCategory}>{mbtmi.category} &gt;</span>
                    {isBookmarked==='N'? (
                    <img src={"/bookmarkIcon-white.png" } alt="책갈피" className={style.bookmarkIcon} />
                    ) : (
                    <img src={"/bookmarkIcon-red.png" } alt="책갈피" className={style.bookmarkIcon} />
                    )}
                    <div className={style.postArea}>
                        <div>
                            <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>togglePopover("popover1")} id="popover1"/>
                            <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover1} target="popover1" toggle={()=>togglePopover("popover1")}>
                                <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                                <PopoverBody className={style.popoverItem} onClick={()=> deleteMbtmi(mbtmi.no)}>삭제</PopoverBody>
                            </Popover><br/><br/><br/>
                        </div>
                        <h2 className={style.postTitle}>{mbtmi.title}</h2>
                        <div className={style.profileColor}/>&nbsp;
                        <span>{mbtmi.writerMbti}&nbsp;{mbtmi.writerNickname}</span>
                        <h6>{formatDate(mbtmi.writeDate)}
                            <span><img src={"/view-icon.png" } alt="조회" className={style.viewIcon} />&nbsp;{mbtmi.viewCnt}</span>
                        </h6>
                        <div className={style.postContent} dangerouslySetInnerHTML={{ __html: mbtmi.content }}></div>
                        <p>
                            {isRecommended==='N'? (
                            <img src={"/thumbIcon.png" } alt="추천아이콘" className={style.thumbIconDetail} />
                            ) : (
                            <img src={"/thumbIcon-full.png" } alt="추천아이콘" className={style.thumbIconDetail} />
                            )}
                            <span>&nbsp;추천&nbsp;{mbtmi.recommentCnt}</span>
                        </p>
                        <div className={style.postBtns}>
                            <button onClick={goToPreviousList}>목록</button>
                            <button><img src={"/reportIcon.png" } alt="신고아이콘" className={style.reportIcon} />&nbsp;신고</button>
                        </div>
                    </div>
                    </>
                ) : (
                    <p>...페이지 로딩 중...</p>
                )}             

                <div className={style.commentArea}>
                    <h6>&nbsp;&nbsp;{mbtmiCommentCnt}개의 댓글</h6>
                    <table>
                        <tbody>
                            {mbtmiCommentList.length>0 && mbtmiCommentList.map(comment=> {
                                return(
                                    <tr key={comment.commentNo}>
                                        <td>
                                            <div className={style.commentTd1row}>
                                                <div className={style.CommentProfileColor}/>&nbsp;
                                                <span>{comment.writerMbti}&nbsp;{comment.writerNickname}</span>
                                                {/* <span>작성자</span> */}
                                                <small>{formatDate(comment.writeDate)}</small>
                                                <span>
                                                    <img src={"/popover-icon.png" } alt="..." className={style.commentPopoverIcon} onClick={()=>togglePopover("popover2")} id="popover2"/>
                                                    <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover2} target="popover2" toggle={()=>togglePopover("popover2")}>
                                                            <PopoverBody className={style.popoverItem}>수정</PopoverBody>
                                                            <PopoverBody className={style.popoverItem}>삭제</PopoverBody>
                                                    </Popover>
                                                </span>
                                            </div>
                                            <div className={style.commentTd2row}>
                                                {comment.commentContent}
                                            </div>
                                            <div className={style.commentTd3row}>
                                                <small>답글쓰기</small>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                            {/* <tr>
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
                            </tr> */}

                        </tbody>
                    </table>


                    
                    


                </div>

                <hr style={{border: '3px solid lightgray'}}/>
                <table style={{border:'1px solid gray', textAlign:'center'}}>
                    <thead>
                        <tr style={{border:'1px solid gray', textAlign:'center'}}>
                            <td style={{border:'1px solid gray', textAlign:'center'}}>인덱스</td>
                            <td style={{border:'1px solid gray', textAlign:'center'}}>작성자</td>
                            <td style={{border:'1px solid gray', textAlign:'center'}}>작성일</td>
                            <td style={{border:'1px solid gray', textAlign:'center'}}>내용</td>
                            <td style={{border:'1px solid gray', textAlign:'center'}}>상위댓글인덱스</td>
                        </tr>
                    </thead>
                    <tbody>
                        {commentsData
                            .filter(comment => comment.parentIndex === null)
                            // 부모댓글
                            .map(parentComment => (
                                <React.Fragment key={parentComment.index}>
                                    <tr>
                                        <td style={{border:'1px solid gray', textAlign:'center'}}>{parentComment.index}</td>
                                        <td style={{border:'1px solid gray', textAlign:'center'}}>{parentComment.author}</td>
                                        <td style={{border:'1px solid gray', textAlign:'center'}}>{parentComment.createdDate}</td>
                                        <td style={{border:'1px solid gray', textAlign:'center'}}>{parentComment.content}</td>
                                        <td style={{border:'1px solid gray', textAlign:'center'}}>{parentComment.parentIndex}</td>
                                    </tr>

                                    {/* 자식댓글 */}
                                    {commentsData
                                        .filter(childComment => childComment.parentIndex === parentComment.index)
                                        .map(childComment => (
                                            <tr key={childComment.index}>
                                                <td style={{border:'1px solid gray', textAlign:'center'}}>{childComment.index}</td>
                                                <td style={{border:'1px solid gray', textAlign:'center'}}>{childComment.author}</td>
                                                <td style={{border:'1px solid gray', textAlign:'center'}}>{childComment.createdDate}</td>
                                                <td style={{border:'1px solid gray', textAlign:'center'}}>{childComment.content}</td>
                                                <td style={{border:'1px solid gray', textAlign:'center'}}>{childComment.parentIndex}</td>
                                            </tr>
                                        ))}
                                </React.Fragment>
                        ))}
                    </tbody>
                </table>

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
export default MBTmiDetail;