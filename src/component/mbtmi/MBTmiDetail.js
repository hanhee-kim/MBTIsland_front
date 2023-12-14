import { Popover, PopoverBody, Table } from "reactstrap";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

const MBTmiDetail = () => {

// /*
    // 로그인유저 정보 (가정)
    const [loginUser, sestLoginUser] = useState({
        username: "user01",
        userNickname: "닉네임1",
        userMbti: "INFP",
        userMbtiColor: "#648181",
        userRole: "ROLE_USER",
    });
// */

    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user.user);





    const { no, category, type, search, page } = useParams();
    const location = useLocation();
    
    const [mbtmi, setMbtmi] = useState(null);
    const [mbtmiCommentCnt, setMbtmiCommentCnt] = useState(0);
    const [isRecommended, setIsRecommended] = useState('Y');
    const [isBookmarked, setIsBookmarked] = useState('Y');
    // 절대시간
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    };
    // 상대시간(시간차)
    const formatDatetimeGap = (dateString) => {
        const date = new Date(dateString);
        const currentDate = new Date();
        const datetimeGap = currentDate - date;
        const seconds = Math.floor(datetimeGap/1000);
        const minutes = Math.floor(seconds/60);
        const hours = Math.floor(minutes/60);
        const days = Math.floor(hours/24);
        const weeks = Math.floor(days/7);
        const months = Math.floor(weeks/4);
        const years = Math.floor(months/12);

        // if(seconds<60) return `${seconds}초 전`;
        // else 
        if(minutes<60) return `${minutes}분 전`;
        else if(hours<24) return `${hours}시간 전`;
        else if(days<7) return `${days}일 전`;
        else if(weeks<4) return `${weeks}주 전`;
        else if(months<12) return `${months}달 전`;
        else return `${years}년 전`;
    }
    const [mbtmiCommentList, setMbtmiCommentList] = useState([]);
    const [commentPage, setCommentPage] = useState(1); // 댓글목록 페이지 이동번호
    const [commentPageInfo, setCommentPageInfo] = useState({}); // 댓글목록 페이지 정보(전체페이지, 현재페이지, 시작페이지번호, 끝페이지번호)

    // 초기 렌더링
    useEffect(()=> {
        getMbtmiDetail(no, user.username); // #인자 username 추가

        // localStorage에 저장된 페이지 정보를 읽음
        const storedInfo = localStorage.getItem('commentCurPage');
        if(storedInfo) {
            setCommentPage(parseInt(storedInfo, 10)); // 페이지넘버 (두번째인자: 10진수임을 의미)
        }

        getMbtmiCommentList(1, user.username); // #인자 username 추가
        
        console.log("현재 게시글번호: ", no);
        console.log('### user.username: ', user.username);
    }, []);

    const getMbtmiDetail = (no) => {
        let defaultUrl = `http://localhost:8090/mbtmidetail/${no}`;
        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let mbtmi = res.data.mbtmi;
            let mbtmiCommentCnt = res.data.mbtmiCommentCnt;
            // let isRecommended = res.data.isRecommended;
            // let isBookmarked = res.data.isBookmarked;

            setMbtmi(mbtmi);
            setMbtmiCommentCnt(mbtmiCommentCnt);
            // setIsRecommended(isRecommended);
            // setIsBookmarked(isBookmarked);
            
            // let mbtmiCommentList = res.data.mbtmiCommentList;
            // setMbtmiCommentList(mbtmiCommentList);
        })
        .catch(err=> {
            console.log(err);
            setMbtmiCommentCnt(0);
        });
    }

    const getMbtmiCommentList = (commentPageParam) => {
        let defaultUrl = `http://localhost:8090/mbtmicommentlist/${no}`;
        if(commentPageParam!==1) defaultUrl += `?commentpage=${commentPageParam}`;

        // alert(defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let mbtmiCommentList = res.data.mbtmiCommentList;
            let commentPageInfo = res.data.pageInfo;
            setMbtmiCommentList([...mbtmiCommentList]);
            setCommentPageInfo({...commentPageInfo});
        })
        .catch(err=> {
            console.log(err);
            setCommentPageInfo({});
        });
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

    const deleteMbtmi = (no) => {
        console.log('선택한 게시글번호: ', no);
        const isConfirmed =window.confirm('게시글을 삭제하시겠습니까?');
        if(isConfirmed) {
            axios.delete(`http://localhost:8090/deletembtmi/${no}`)
            .then(res => {
                setPopoverStates({popover1:false, popover2:false}); // 팝오버 오픈상태 초기값으로 설정
                alert('완료되었습니다.');
                goToPreviousList();
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
    const modifyMbtmi = (no) => {
        console.log('수정할 게시글번호: ', no);
        
    };

    const deleteComment = (commentNo) => {
        console.log('선택한 댓글번호: ', commentNo);
        const isConfirmed =window.confirm('댓글을 삭제하시겠습니까?');
        if(isConfirmed) {
            axios.delete(`http://localhost:8090/deletembtmicomment/${commentNo}`)
            .then(res => {
                alert('완료되었습니다.');

                // (commnetList state변수를 변경시킴으로써 등의 방법으로)다시그려줄필요?? 알아서되는지? 확인할것
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    const reportComment = (commentNo) => {
        console.log('신고할 댓글번호: ', commentNo);
        // 팝업 열기
    }

    // 목록으로 가기 버튼
    const navigate = useNavigate();
    const goToPreviousList = () => {
        navigate(-1);
    }


    const handlePageNo = (pageNo) => {
        // 현재 페이지번호를 localStorage에 저장
        localStorage.setItem('commentCurPage', pageNo.toString());
        setCommentPage(pageNo);
        getMbtmiCommentList(pageNo);
    };
    // 댓글목록 페이지네이션
    const PaginationInside = () => {
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=commentPageInfo.startPage; i<=commentPageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${commentPage===i? style.activePage: ''}`} onClick={()=>handlePageNo(i)}>{i}</span>
            )
        }
        return (
            <div className={style.paging}>
                {!(commentPageInfo.startPage===1) && (
                    <>
                        <span onClick={()=>handlePageNo(1)}>≪</span>
                        <span onClick={()=>handlePageNo(commentPageInfo.startPage-10)}>&lt;</span>
                    </>
                )}
                {pageGroup}
                {!(commentPageInfo.endPage===commentPageInfo.allPage) && (
                    <>
                        <span onClick={()=>handlePageNo(commentPageInfo.endPage+1)}>&gt;</span>
                        <span onClick={()=>handlePageNo(commentPageInfo.allPage)}>≫</span>
                    </>
                )}
            </div>
        );
    }


    // 1차댓글
    const Comment = ({comment}) => {
        // const isLoginUserComment = comment.writerId === loginUser.username;
        // const isPostWriterComment = comment.writerId === mbtmi.writerId;
        const isLoginUserComment = comment.writerId === user.username;
        const isPostWriterComment = comment?.writerId === mbtmi?.writerId; // comment가 null 또는 undefine이 아닌 경우에만 writerId 속성 값을 읽도록하여  Uncaught runtime errors런타임에러 방지
        return (
            <tr key={comment.commentNo} className={`${style.commentTr} ${isLoginUserComment ? style.loginUsersComment : ''}`}>
                <td>
                    <div className={style.commentTd1row}>
                        <div className={style.commentProfileColor} style={{ background: comment.writerMbtiColor, borderColor: comment.writerMbtiColor }}/>
                        <span>{comment.writerMbti} {comment.writerNickname}</span>
                        {isPostWriterComment && <span className={style.isPostWriterComment}>작성자</span>}
                    </div>
                    <div className={style.commentTd2row}>
                        {comment.commentContent}
                    </div>
                    <div className={style.commentTd3row}>
                        {/* <small>{formatDate(comment.writeDate)}</small> */}
                        <small>{formatDatetimeGap(comment.writeDate)}</small>
                        <small>답글쓰기</small>
                        {isLoginUserComment? (
                            <small className={style.commentReportOrDeleteBtn} onClick={() => deleteComment(comment.commentNo)}>삭제</small>
                        ) : (
                            <small className={style.commentReportOrDeleteBtn} onClick={() => reportComment(comment.commentNo)}>신고</small>
                        )}
                    </div>
                </td>
            </tr>
        );
    };
    // 2차댓글
    const Reply = ({reply}) => {
        // const isLoginUserComment = reply.writerId === loginUser.username;
        // const isPostWriterComment = reply.writerId === mbtmi.writerId;
        const isLoginUserComment = reply.writerId === user.username;
        const isPostWriterComment = reply?.writerId === mbtmi?.writerId; // reply가 null 또는 undefine이 아닌 경우에만 writerId 속성 값을 읽도록하여  Uncaught runtime errors런타임에러 방지
        return (
            <tr key={reply.commentNo} className={`${style.reply} ${isLoginUserComment ? style.loginUsersComment : ''}`}>
                <td>
                    <div className={style.commentTd1row}>
                        <div className={style.commentProfileColor} style={{ background: reply.writerMbtiColor, borderColor: reply.writerMbtiColor }}/>
                        <span>{reply.writerMbti} {reply.writerNickname}</span>
                        {isPostWriterComment && <span className={style.isPostWriterComment}>작성자</span>}
                    </div>
                    <div className={style.commentTd2row}>
                        {reply.commentContent}
                    </div>
                    <div className={style.commentTd3row}>
                        {/* <small>{formatDate(reply.writeDate)}</small> */}
                        <small>{formatDatetimeGap(reply.writeDate)}</small>
                        {isLoginUserComment? (
                            <small className={style.commentReportOrDeleteBtn} onClick={() => deleteComment(reply.commentNo)}>삭제</small>
                        ) : (
                            <small className={style.commentReportOrDeleteBtn} onClick={() => reportComment(reply.commentNo)}>신고</small>
                        )}
                    </div>
                </td>
            </tr>
        );
    };


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
                        <div style={{ display: mbtmi.writerId === user.username ? 'block' : 'none' }}>
                            <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>togglePopover("popover1")} id="popover1"/>
                            <Popover  className={style.popover} placement="bottom" isOpen={popoverStates.popover1} target="popover1" toggle={()=>togglePopover("popover1")}>
                                <PopoverBody className={style.popoverItem} onClick={()=> modifyMbtmi(mbtmi.no)}>수정</PopoverBody>
                                <PopoverBody className={style.popoverItem} onClick={()=> deleteMbtmi(mbtmi.no)}>삭제</PopoverBody>
                            </Popover><br/><br/><br/>
                        </div>
                        <h2 className={style.postTitle}>{mbtmi.title}</h2>
                        <div className={style.profileColor} style={{ background: mbtmi.writerMbtiColor, borderColor: mbtmi.writerMbtiColor }}/>&nbsp;
                        <span>{mbtmi.writerMbti}&nbsp;{mbtmi.writerNickname}</span>
                        <h6>{formatDate(mbtmi.writeDate)}
                            <span><img src={"/viewIcon.png" } alt="조회" className={style.viewIcon} />&nbsp;{mbtmi.viewCnt}</span>
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
                        {mbtmiCommentList // 1차댓글
                            .filter(comment=> comment.parentcommentNo===null)
                            .map(comment => (
                            <React.Fragment key={comment.commentNo}>
                                <Comment comment={comment} />

                                {mbtmiCommentList // 2차댓글
                                    .filter(reply => reply.parentcommentNo === comment.commentNo)
                                    .map(reply => <Reply key={reply.commentNo} reply={reply} />)}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                    {PaginationInside()}
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
export default MBTmiDetail;