import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Popover, PopoverBody, Table } from "reactstrap";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { urlroot } from "../../config";


/* 재사용성을 높이기 위해 외부에 선언한 페이지네이션 */
const PaginationOutside = ({ pageInfo, handlePageNo }) => {
    // console.log('PaginationOutside에서 출력한 pageInfo : ', pageInfo);
    const isFirstGroup = pageInfo.startPage===1;
    const isLastGroup = pageInfo.endPage===pageInfo.allPage;
    const pageGroup = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageGroup.push(
            <span key={i} className={`${pageInfo.curPage === i ? style.activePage : ""}`} onClick={() => handlePageNo(i)}>{i}</span>
        );
    }

    return (
        <div className={style.paging}>
            {!isFirstGroup && (
                <>
                    <span onClick={() => handlePageNo(1)}>≪</span>
                    <span onClick={() => handlePageNo(pageInfo.startPage - 10)}>&lt;</span>
                </>
            )}
            {pageGroup}
            {!isLastGroup && (
                <>
                    <span onClick={() => handlePageNo(pageInfo.endPage + 1)}>&gt;</span>
                    <span onClick={() => handlePageNo(pageInfo.allPage)}>≫</span>
                </>
            )}
        </div>
    );
};




const MBTmiDetail = () => {

    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user);
    
    const { no, category, type, search, page } = useParams();
    const location = useLocation();
    
    const [mbtmi, setMbtmi] = useState(null);
    const [mbtmiCommentCnt, setMbtmiCommentCnt] = useState(0);
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

    // 댓글 작성
    const [comment, setComment] = useState("");
    const [sendUser, setSendUser] = useState({
        username : user.username,
        userNickname : user.userNickname,
        userMbti : user.userMbti,
        userMbtiColor : user.userMbtiColor
    });
    const addComment = (commentContent, parentcommentNo) => {
        console.log('등록될댓글내용: ', commentContent);
        // console.log('부모댓글번호: ', parentcommentNo);

        if(user.isBanned==='Y') {
            alert("정지 상태에서는 댓글을 작성하실 수 없습니다.");
            return;
        }

        // 댓글내용: 포함된 개행문자가 단순 문자열로 무시되지 않고 올바르게 인코딩되어 백으로 보내지도록 직접 인코딩을 해줌
        let defaultUrl = `${urlroot}/mbtmicomment?no=${no}&comment=${encodeURIComponent(commentContent)}`;
        if(parentcommentNo !== '') defaultUrl += `&parentcommentNo=${parentcommentNo}`
        defaultUrl += `&commentpage=${commentPage}`; // 3페이지에서 대댓글 작성시 url에 파라미터로 3페이지가 붙음
        console.log('요청url: ', defaultUrl);

        axios.post(defaultUrl, sendUser)
        .then(res=> {
            console.log(res);
            let comments = res.data.mbtmiCommentList;
            let allPage = res.data.pageInfo.allPage;
            let mbtmiCommentCnt = res.data.mbtmiCommentCnt;
            let CommentPageInfo = res.data.pageInfo;
            setCommentPageInfo(CommentPageInfo);

            if(parentcommentNo!=='') { // 2차댓글 작성의 경우
                let writtenCommentNo = res.data.writtenCommentNo;
                // 현재페이지번호를 인자로하여 불러온 댓글목록배열comments 안에 방금 작성된 새댓글이 존재하는지 여부
                const isWrittenCommentIsInCurrentPage = comments.some(comment => comment.commentNo === writtenCommentNo); 
                // 배열 안에 없다면(등록시 3->4페이지에 등록되게 된 경우) 1증가한 페이지번호로 목록이 렌더링되게 함
                if (!isWrittenCommentIsInCurrentPage) { 
                    getMbtmiCommentList(commentPage+1);
                    setCommentPage(commentPage+1);
                }
            } else { // 1차댓글 작성의 경우 항상 끝 페이지번호로 목록이 렌더링되게 함
                setCommentPage(allPage);
                getMbtmiCommentList(allPage);
            }
            
            setMbtmiCommentList([...comments]);
            setComment("");
            setMbtmiCommentCnt(mbtmiCommentCnt);
            // setCommentPage(allPage); // ***
            // getMbtmiCommentList(allPage); // ***
        })
        .catch(err=> {
            console.log(err);
        })
    };
    
    

    // 초기 렌더링
    useEffect(()=> {
        getMbtmiDetail(no, user.username); // #인자 username 추가

/*
        // localStorage에 저장된 페이지 정보를 읽음
        const storedInfo = localStorage.getItem('commentCurPage');
        if(storedInfo) {
            setCommentPage(parseInt(storedInfo, 10)); // 페이지넘버 (두번째인자: 10진수임을 의미)
        }
*/

        getMbtmiCommentList(1, user.username);
        
        console.log("현재 게시글번호: ", no);
        console.log('user.username: ', user.username);
        // console.log('현재 댓글 페이지번호: ' + commentPage);
    // }, [user.username]);
    }, []);

    const getMbtmiDetail = (no) => {
        let defaultUrl = `${urlroot}/mbtmidetail/${no}`;
        if(user.username!=="" || user.username!==undefined) defaultUrl += `?username=${user.username}`;

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let mbtmi = res.data.mbtmi;
            let mbtmiCommentCnt = res.data.mbtmiCommentCnt;
            let recommendCnt = res.data.mbtmi.recommendCnt;
            let isRecommended = res.data.isMbtmiRecommend;
            let isBookmarked = res.data.isMbtmiBookmark;

            // 이미지 출력 관련 처리 추가
            mbtmi.content = replaceImagePlaceholders(mbtmi.content);

            setMbtmi(mbtmi);
            setMbtmiCommentCnt(mbtmiCommentCnt);
            setRecommendCount(recommendCnt);
            setIsRecommended(isRecommended);
            setIsBookmarked(isBookmarked);

            // console.log('getMbtmiDetail함수에서 출력한 commentPage: ' + commentPage);
            
        })
        .catch(err=> {
            console.log(err);
            setMbtmiCommentCnt(0);
        });
    }

    // 이미지 출력 관련 처리 추가
    // const replaceImagePlaceholders = (content) => {
    //     return content.replace(/<img src="(\d+)" \/>/g, (match, fileIdx) => {
    //         return `<img src=`${urlroot}/mbtmiimg/${fileIdx}` alt=''/>`;
    //     });
    // };
    // 이미지 사이즈 조절 모듈 추가 이후 width 속성을 고려
    const replaceImagePlaceholders = (content) => {
        console.log('content: ', content);
        return content.replace(/<img src="(\d+)"(.*)\/>/g, (match, fileIdx, otherAttributes) => {
            return `<img src="${urlroot}/mbtmiimg/${fileIdx}" ${otherAttributes} alt=''/>`;
        });
    };

    const getMbtmiCommentList = (commentPageParam) => {
        let defaultUrl = `${urlroot}/mbtmicommentlist/${no}`;
        if(commentPageParam!==1) defaultUrl += `?commentpage=${commentPageParam}`;

        // alert(defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            console.log('댓글목록받아오기요청결과: ', res);
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


    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    const [open,setOpen]=useState(false);
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

    const deleteMbtmi = (no) => {
        console.log('선택한 게시글번호: ', no);
        const isConfirmed =window.confirm('게시글을 삭제하시겠습니까?');
        if(isConfirmed) {
            axios.delete(`${urlroot}/deletembtmi/${no}`)
            .then(res => {
                alert('완료되었습니다.');
                goToPreviousList();
            })
            .catch(err => {
                console.log(err);
            });
        }
        setOpen(false);
    };

    // 수정 버튼 클릭시
    const modifyMbtmi = (no) => {
        // console.log('수정할 게시글번호: ', no);
        setOpen(false);
        navigate(`/mbtmiform/${no}`)
    };

    const deleteComment = (commentNo) => {
        console.log('선택한 댓글번호: ', commentNo);
        const isConfirmed =window.confirm('댓글을 삭제하시겠습니까?');
        if(isConfirmed) {
            axios.get(`${urlroot}/deletembtmicomment/${commentNo}`)
            .then(res => {
                console.log(res);
                alert('완료되었습니다.');

                // console.log('commentPage: ', commentPage);
                getMbtmiCommentList(commentPage); // 이 함수를 호출하여 댓글목록 재조회하여 재렌더링 시킨다
                
            })
            .catch(err => {
                console.log(err);
            });
        }
        setOpen(false);
    };

    // 추천
    const [recommend, setRecommend] = useState({
        username: user.username,
        postNo: no,
        boardType: "mbtmi"
    });
    const [isRecommended, setIsRecommended] = useState(false);
    const [recommendCount, setRecommendCount] = useState();
    const mbtmiRecommend = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }
        // console.log('추천값 출력: ', recommend);
        let defaultUrl = `${urlroot}/mbtmirecommend`;

        axios.post(defaultUrl, recommend)
        .then(res=> {
            // console.log('추천결과: ', res);
            let mbtmiRecommendCount = res.data.mbtmiRecommendCount;
            setIsRecommended(!isRecommended);
            setRecommendCount(mbtmiRecommendCount);
        })
        .catch(err=> {
            console.log(err);
        });
    };

    // 북마크
    const [bookmark, setBookmark] = useState({
        username: user.username,
        postNo: no,
        boardType: "mbtmi"
    });
    const [isBookmarked, setIsBookmarked] = useState(false);
    const mbtmiBookmark = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }
        console.log('북마크값 출력: ', bookmark);
        let defaultUrl = `${urlroot}/mbtmibookmark`;

        axios.post(defaultUrl, bookmark)
        .then(res=> {
            console.log('북마크결과: ', res);
            setIsBookmarked(!isBookmarked);
        })
        .catch(err=> {
            console.log(err);
        });
    }

    // 신고 팝업창
    const openReportWrite = (reportTarget, reportTargetFrom) => {
        // console.log('신고대상 reportTarget(객체): ', reportTarget, ", reportTargetFrom(테이블명): ", reportTargetFrom);
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        let reportData = {};
        if(reportTargetFrom === "mbtmi") {
            reportData = {
                // no:0,
                reportType: "게시글",
                tableType: reportTargetFrom,
                reportedPostNo: reportTarget.no,
                // reportedCommentNo:, // 댓글 아니므로 댓글 번호 없음
                reportedId: reportTarget.writerId,
                // reportedTitle:, // 제목 없음
                reportedContent: reportTarget.content,
                // fileIdxs: "", // 파일 없음
                reporterId: user.username,
                // reportDate: "", // 백에서 지정
                reportReason: "광고", // 신고 창에서 변경 (기본값 광고)
                isCompleted: "N",
                isWarned: "N"
            };
        } else if(reportTargetFrom === "mbtmicomment") {
            reportData = {
                // no:0,
                reportType: "댓글",
                tableType: reportTargetFrom,
                reportedPostNo: mbtmi.no,
                reportedCommentNo: reportTarget.no,
                reportedId: reportTarget.writerId,
                // reportedTitle:, // 제목 없음
                reportedContent: reportTarget.commentContent,
                // fileIdxs: "", // 파일 없음
                reporterId: user.username,
                // reportDate: "", // 백에서 지정
                reportReason: "광고", // 신고 창에서 지정 (기본값 광고)
                isCompleted: "N",
                isWarned: "N"
            };
        }

        const serializedReportData = encodeURIComponent(JSON.stringify(reportData));

        // const url = "/reportwrite/" + reportTarget.writerId + '/' + reportTargetFrom;
        const url = `/reportwrite?data=${serializedReportData}`;

        window.open(
            url,
            "_blank",
            "width=650,height=450,location=no,status=no,scrollbars=yes"
        );
    };

    // 쪽지보내기 아이콘 클릭시(게시글, Comment, Reply)
    const sendNote = (receiveUsername, receiveNickname) => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }
        if(user.isBanned==='Y') {
            alert("정지 상태에서는 쪽지를 보내실 수 없습니다.");
            return;
        }

        const url = `/notewrite/${receiveUsername}/${receiveNickname}`; // 받을 유저

        window.open(
            url,
            "_blank",
            "width=650,height=450,location=no,status=no,scrollbars=yes"
        );
    }


    // 목록으로 가기 버튼
    const navigate = useNavigate();
    const goToPreviousList = () => {
        // navigate(-1); // 수정 직후였다면 수정폼으로 돌아가게된다
        navigate(`/mbtmi`, { state: { fromDetail: true } }); 
        // 두번째 인자를 통해 MBTmiDetail.js에서의 이동과 header.js의 메뉴 선택을 통한 이동을 구분하여 후자만 초기값으로 렌더링 되게함
    };

    const handlePageNo = (pageNo) => {
        setCommentPage(pageNo);
        getMbtmiCommentList(pageNo);
    };

    // 댓글목록 페이지네이션
    const PaginationInside = () => {
        // console.log('댓글목록 페이지네이션에서 출력 commentPage: ' + commentPage);
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
    const Comment = ({comment, index}) => {
        const isLoginUserComment = comment?.writerId === user.username;
        const isPostWriterComment = comment?.writerId === mbtmi?.writerId; // comment가 null 또는 undefined이 아닌 경우에만 writerId 속성 값을 읽도록하여  Uncaught runtime errors런타임에러 방지
        const isRemovedOrBlockedComment = comment?.isRemoved === 'Y' || comment?.isBlocked === 'Y';

        const [isReplying, setIsReplying] = useState(false); // 답글쓰기중인지 여부를 저장하여 true일때 input 표시하기 위한 state변수
        const handleReply = () => {
            setIsReplying(!isReplying);
        };

        const [tmpReplyContent, setTmpReplyContent] = useState('');
        const addReply = (tmpReplyContent) => {
            console.log('대댓글내용: ', tmpReplyContent);
            // setReply(tmpReplyContent);
            // addComment(comment.commentNo);
            addComment(tmpReplyContent, comment.commentNo);
        };

        return (
            <>
                <tr key={comment.commentNo} className={`${style.commentTr} ${isLoginUserComment ? style.loginUsersComment : ''}`}>
                    <td>
                        <div className={style.commentTd1row}>
                            <div className={style.commentProfileColor} style={{ background: comment.writerMbtiColor, borderColor: comment.writerMbtiColor }}/>
                            <span>{comment.writerMbti} {comment.writerNickname}</span>
                            {isPostWriterComment && <span className={style.isPostWriterComment}>작성자</span>}
                            {!isLoginUserComment && <img src={"/sendNoteIcon.png" } alt="쪽지보내기" className={style.sendNoteIcon} onClick={()=> sendNote(mbtmi.writerId)}/>}
                        </div>

                        <div className={`${style.commentTd2row} ${isRemovedOrBlockedComment? style.deletedComment : ''}`} >
                            {comment.isRemoved==='Y'? '삭제된 댓글입니다' : comment.isBlocked==='Y' ? '관리자에 의해 차단된 댓글입니다' : comment.commentContent}
                        </div>
                        <div className={style.commentTd3row}>
                            <small>{formatDatetimeGap(comment.writeDate)}</small>
                            {user.username!=="" && !isRemovedOrBlockedComment && (
                                <small onClick={handleReply}>답글쓰기</small>
                            )}
                            {user.username!=="" && !isRemovedOrBlockedComment && (
                                isLoginUserComment? (
                                    <small className={style.commentReportOrDeleteBtn} onClick={() => deleteComment(comment.commentNo)}>삭제</small>
                                ) : (
                                    <small className={style.commentReportOrDeleteBtn} onClick={()=>{openReportWrite(comment, "mbtmicomment")}}>신고</small>
                                ) 
                            )}
                        </div>
                    </td>
                </tr>
                {isReplying && (
                <tr><td>
                <div className={`${style.commentWriteArea} ${style.replyWriteArea}`}>
                    <div>
                        <span>
                            <div className={style.profileColor} style={{ background: user.userMbtiColor, borderColor: user.userMbtiColor }}/>&nbsp;
                            <span>{user.userMbti}&nbsp;{user.userNickname}</span>
                        </span>
                        <span>
                            <button className={style.commentCancelbtn} onClick={()=>setIsReplying(false)}>취소</button>
                            <button className={style.commentWritebtn} onClick={()=>addReply(tmpReplyContent)}><img src={"/writebtnIcon.png" } alt="" className={style.writebtnIcon}/>댓글 쓰기</button>
                        </span>
                    </div>
                    <div>
                        <textarea className={style.commentInput} placeholder="댓글을 입력해주세요" id="comment" name="comment" onChange={(e)=>setTmpReplyContent(e.target.value)} required="required" value={tmpReplyContent}/>
                    </div>
                </div>
                </td></tr>
                )}
            </>
        );
    };
    // 2차댓글
    const Reply = ({reply}) => {
        const isLoginUserComment = reply.writerId === user.username;
        const isPostWriterComment = reply?.writerId === mbtmi?.writerId; // reply가 null 또는 undefine이 아닌 경우에만 writerId 속성 값을 읽도록하여  Uncaught runtime errors런타임에러 방지
        const isRemovedOrBlockedComment = reply?.isRemoved === 'Y' || reply?.isBlocked === 'Y';
        return (
            <tr key={reply.commentNo} className={`${style.reply} ${isLoginUserComment ? style.loginUsersComment : ''}`}>
                <td>
                    <div className={style.commentTd1row}>
                        <div className={style.commentProfileColor} style={{ background: reply.writerMbtiColor, borderColor: reply.writerMbtiColor }}/>
                        <span>{reply.writerMbti} {reply.writerNickname}</span>
                        {isPostWriterComment && <span className={style.isPostWriterComment}>작성자</span>}
                        {!isLoginUserComment && <img src={"/sendNoteIcon.png" } alt="쪽지보내기" className={style.sendNoteIcon} onClick={()=> sendNote(mbtmi.writerId)}/>}
                    </div>

                    <div className={`${style.commentTd2row} ${isRemovedOrBlockedComment? style.deletedComment : ''}`}>
                        {reply.isRemoved==='Y'? '삭제된 댓글입니다' : reply.isBlocked==='Y' ? '관리자에 의해 차단된 댓글입니다' : reply.commentContent}
                    </div>
                    <div className={style.commentTd3row}>
                        <small>{formatDatetimeGap(reply.writeDate)}</small>
                        {user.username!=="" && !isRemovedOrBlockedComment && (
                            isLoginUserComment? (
                                <small className={style.commentReportOrDeleteBtn} onClick={() => deleteComment(reply.commentNo)}>삭제</small>
                            ) : (
                                <small className={style.commentReportOrDeleteBtn} name="mbtmicomment" onClick={(e)=>{openReportWrite(reply, "mbtmicomment")}}>신고</small>
                            ) 
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
                    <div className={style.boardTitleTextArea}>
                        <p>MB-TMI</p>
                        <p>유형별로 모여 자유롭게 이야기를 나눌 수 있는 공간</p>
                    </div>
                    <div>
                        <img alt="tmi" src={"/tmi.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                    </div>
                </div>

                {mbtmi? (
                    <>
                    <span className={style.currnetCategory}>&nbsp;{mbtmi.category}&nbsp;</span>
                    {!isBookmarked? (
                        <img src={"/bookmarkIcon-white.png" } alt="" className={style.bookmarkIcon} onClick={()=>mbtmiBookmark()}/>
                        ) : (
                        <img src={"/bookmarkIcon-red.png" } alt="" className={style.bookmarkIcon} onClick={()=>mbtmiBookmark()}/>
                        )}
                    <div className={style.postArea}>
                        {/* 게시글 수정, 삭제 팝오버 */}
                        <div style={{ display: mbtmi.writerId === user.username ? 'block' : 'none' }}>
                            <img src={"/popover-icon.png" } alt="..." className={style.popoverIcon} onClick={()=>setOpen(!open)} id="popover1"/>
                            <Popover  className={style.popover} placement="bottom" isOpen={open} target="popover1" toggle={()=>setOpen(!open)}>
                                <PopoverBody className={style.popoverItem} onClick={()=> modifyMbtmi(mbtmi.no)}>수정</PopoverBody>
                                <PopoverBody className={style.popoverItem} onClick={()=> deleteMbtmi(mbtmi.no)}>삭제</PopoverBody>
                            </Popover><br/><br/><br/>
                        </div>
                        <h2 className={style.postTitle}>{mbtmi.title}</h2>

                        <div className={style.profileColor} style={{ background: mbtmi.writerMbtiColor, borderColor: mbtmi.writerMbtiColor }} />&nbsp;
                        <span>{mbtmi.writerMbti}&nbsp;{mbtmi.writerNickname}</span>
                        {mbtmi.writerId !== user.username && (
                        <img src={"/sendNoteIcon.png" } alt="쪽지보내기" className={style.sendNoteIcon} onClick={()=> sendNote(mbtmi.writerId, mbtmi.writerNickname)}/>
                        )}

                        {/* <h6>{formatDate(mbtmi.writeDate)} */}
                        <h6>&nbsp;{formatDatetimeGap(mbtmi.writeDate)}
                            <span><img src={"/viewIcon.png" } alt="조회" className={style.viewIcon} />&nbsp;{mbtmi.viewCnt}</span>
                        </h6>
                        <div className={style.postContent} dangerouslySetInnerHTML={{ __html: mbtmi.content }}></div>
                        <p>
                            {!isRecommended? (
                            <img src={"/thumbIcon.png" } alt="" className={style.thumbIconDetail} onClick={()=>mbtmiRecommend()}/>
                            ) : (
                            <img src={"/thumbIcon-full.png" } alt="" className={style.thumbIconDetail} onClick={()=>mbtmiRecommend()}/>
                            )}
                            <span>&nbsp;추천&nbsp;{recommendCount}</span>
                        </p>
                        <div className={style.postBtns}>
                            <button onClick={goToPreviousList}>목록</button>
                            <button onClick={()=>openReportWrite(mbtmi, "mbtmi")}><img src={"/reportIcon.png" } alt="" className={style.reportIcon} />&nbsp;신고</button>
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
                        {/* 백엔드 쿼리dsl의 정렬조건으로 no오름차순 단독 지정하여 가져온 리스트를 중첩된 구조로 렌더링하는 코드로,
                             n페이지의 0번째 행이 대댓글인 경우 렌더링이 되지 않는 문제 존재  */}
                        {/* {mbtmiCommentList // 1차댓글
                            .filter(comment=> comment.parentcommentNo===null)
                            .map(comment => (
                                <React.Fragment key={comment.commentNo}>
                                    <Comment comment={comment}/>

                                    {mbtmiCommentList // 2차댓글
                                        .filter(reply => reply.parentcommentNo === comment.commentNo)
                                        .map(reply => <Reply key={reply.commentNo} reply={reply} />)}
                                </React.Fragment>))} */}
                        
                        {/* 백엔드 쿼리dsl의 정렬조건으로 no보다 우선시되는 parentcommentNo를 추가하여 화면에 표시될 (중첩)구조로 가져온 리스트를 단순 렌더링 */}
                        {mbtmiCommentList.map((comment, index) => (
                            <React.Fragment key={comment.commentNo}>
                                {/* 1차댓글 or 2차댓글 여부에 따라 서로 다른 컴포넌트로 렌더링 */}
                                {(comment.parentcommentNo === null && (
                                <Comment comment={comment} index={index} />
                                )) || (<Reply reply={comment} />)}
                            </React.Fragment>
                        ))}

                        </tbody>
                    </table>
                    {PaginationInside()}
                    {/* <PaginationOutside pageInfo={commentPageInfo} handlePageNo={handlePageNo} /> */}

                    {/* 댓글 입력란 */}
                    {user.userRole === "ROLE_USER" && (
                        <div className={style.commentWriteArea}>
                            <div>
                                <span>
                                    <div className={style.profileColor} style={{ background: user.userMbtiColor, borderColor: user.userMbtiColor }}/>&nbsp;
                                    <span>{user.userMbti}&nbsp;{user.userNickname}</span>
                                </span>
                                <span>
                                    <button className={style.commentWritebtn} onClick={()=>addComment(comment, '')}><img src={"/writebtnIcon.png" } alt="" className={style.writebtnIcon}/>댓글 쓰기</button>
                                </span>
                            </div>
                            <div>
                                <textarea className={style.commentInput} placeholder="댓글을 입력해주세요" id="comment" name="comment" onChange={(e)=>setComment(e.target.value)} required="required" value={comment}/>
                            </div>
                        </div> )}
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