import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Popover,
    PopoverBody,
    Button,
    Input
} from "reactstrap";
import axios from 'axios';
import { urlroot } from "../../config";

import style from "../../css/mbtwhy/MbtwhyDetail.module.css";
import { urlroot } from "../../config";

function MbtwhyDetail() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user);

    const [sendUser, setSendUser] = useState({
        username : user.username,
        userNickname : user.userNickname,
        userMbti : user.userMbti,
        userMbtiColor : user.userMbtiColor
    });

    // MBTI 분류, 글 번호, 댓글 페이지 번호
    const {no, mbti} = useParams();

    // Mbtwhy 게시글
    const [mbtwhy, setMbtwhy] = useState({});

    // 상단 mbti 색상
    const [mbtiColor, setMbtiColor] = useState("");

    const setMbtiColorTo = (mbti) => {
        if(mbti==="ISTJ") {
            setMbtiColor("#C5C5C5");
        } else if (mbti==="ISFJ") {
            setMbtiColor("#F2DCB3");
        } else if (mbti==="INFJ") {
            setMbtiColor("#EAEFF9");
        } else if (mbti==="INTJ") {
            setMbtiColor("#D8D4EA");
        } else if (mbti==="ISTP") {
            setMbtiColor("#4D6879");
        } else if (mbti==="ISFP") {
            setMbtiColor("#BDC9A6");
        } else if (mbti==="INFP") {
            setMbtiColor("#648181");
        } else if (mbti==="INTP") {
            setMbtiColor("#9BB7D4");
        } else if (mbti==="ESTP") {
            setMbtiColor("#D8927A");
        } else if (mbti==="ESFP") {
            setMbtiColor("#F0A4AB");
        } else if (mbti==="ENFP") {
            setMbtiColor("#FFD966");
        } else if (mbti==="ENTP") {
            setMbtiColor("#B6634A");
        } else if (mbti==="ESTJ") {
            setMbtiColor("#596D55");
        } else if (mbti==="ESFJ") {
            setMbtiColor("#E6D0CE");
        } else if (mbti==="ENFJ") {
            setMbtiColor("#82B8AD");
        } else if (mbti==="ENTJ") {
            setMbtiColor("#35598F");
        }
    };

    // 댓글 페이지 번호
    const [commentPage, setCommentPage] = useState(1);
    
    // 댓글 페이징 정보
    const [commentPageInfo, setCommentPageInfo] = useState({});

    // 댓글 목록
    const [comments, setComments] = useState([]);

    // 댓글 수
    const [commentCount, setCommentCount] = useState(0);

    // 팝오버 open 여부
    const [open, setOpen] = useState(false);

    // 댓글 작성 상태값
    const [inputCommentValue, setInputCommentValue] = useState('');

    // 추천 여부
    const [isRecommended, setIsRecommended] = useState(false);
    
    // 추천 정보 (사용자 아이디, 글 번호, 게시판 유형)
    // 추천 시 백으로 보낼 데이터
    const [recommend, setRecommend] = useState({
        username: user.username,
        postNo: no,
        boardType: "mbtwhy"
    });

    // 추천 개수
    const [recommendCount, setRecommendCount] = useState();
    
    // 북마크 여부
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 북마크 정보 (사용자 아이디, 글 번호, 게시판 유형)
    // 북마크 시 백으로 보낼 데이터
    const [bookmark, setBookmark] = useState({
        username: user.username,
        postNo: no,
        boardType: "mbtwhy"
    });


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

        // if(seconds<60) {
        //     return `${seconds}초 전`;
        // } 
        // else 
        if(minutes<60) {
            return `${minutes}분 전`;
        } else if(hours<24) {
            return `${hours}시간 전`;
        } else if(days<7) {
            return `${days}일 전`;
        } else if(weeks<4) {
            return `${weeks}주 전`;
        } else if(months<12) {
            return `${months}달 전`;
        } else {
            return `${years}년 전`;
        }
    };

    // 팝오버 바깥 영역 클릭 시 모든 팝오버 닫기
    const clickOutsidePopover = (e) => {
        const popoverElements = document.querySelectorAll(".popover");

        if(e && e.target) {
            // 조건식
            // 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어 있지 않다면
            if(Array.from(popoverElements).every((popover) => !popover.contains(e.target))) {
                setOpen(false);
            }
        }
    };

    // 댓글 상태 값 변경
    const commentChange = (e) => {
        setInputCommentValue(e.target.value);
    };

    // Toggle 핸들링
    const handleToggle = () => {
        setOpen(!open);
    };

    // 신고 팝오버 열기
    const openReportWrite = (report, reportedTable) => {
        if(!user.username) {
            alert("로그인해주세요.");
            setOpen(!open);
            return;
        }

        setOpen(!open);

        let reportData = {};
        if(reportedTable === "mbtwhy") {
            console.log("게시글", report.no);
            reportData = {
                // no:0,
                reportType: "게시글",
                tableType: reportedTable,
                reportedPostNo: report.no,
                // reportedCommentNo:, // 댓글 아니므로 댓글 번호 없음
                reportedId: report.writerId,
                // reportedTitle:, // 제목 없음
                reportedContent: report.content,
                // fileIdxs: "", // 파일 없음
                reporterId: user.username,
                // reportDate: "", // 백에서 지정
                reportReason: "광고", // 신고 창에서 변경 (기본값 광고)
                isCompleted: "N",
                isWarned: "N"
            };
        } else if(reportedTable === "mbtwhycomment") {
            console.log("댓글", report.commentNo);
            reportData = {
                // no:0,
                reportType: "댓글",
                tableType: reportedTable,
                reportedPostNo: mbtwhy.no,
                reportedCommentNo: report.commentNo,
                reportedId: report.writerId,
                // reportedTitle:, // 제목 없음
                reportedContent: report.commentContent,
                // fileIdxs: "", // 파일 없음
                reporterId: user.username,
                // reportDate: "", // 백에서 지정
                reportReason: "광고", // 신고 창에서 지정 (기본값 광고)
                isCompleted: "N",
                isWarned: "N"
            };
        }

        const serializedReportData = encodeURIComponent(JSON.stringify(reportData));

        const url = `/reportwrite?data=${serializedReportData}`;
        window.open(
            url,
            "_blank",
            "width=650,height=450,location=no,status=no,scrollbars=yes"
        );
    };

    useEffect(() => {
        clickOutsidePopover();
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    useEffect(() => {
        setMbtiColorTo(mbti.toUpperCase());
        getMbtwhyDetail();
        getMbtwhyCommentList(commentPage);
    }, []);

    // 게시글 상세보기 조회
    const getMbtwhyDetail = () => {
        let defaultUrl = `${urlroot}/mbtwhydetail?`;
        // if(page !== null) defaultUrl += `&page=${page}`;
        // if(search !== null) defaultUrl += `&search=${search}`;
        // if(sort !== null) defaultUrl += `&sort=${sort}`;
        if(no !== null) defaultUrl += `no=${no}`;
        // if(commentPage !== null) defaultUrl += `&commentPage=${commentPage}`;
        if(user.username!=="") defaultUrl += `&username=${user.username}`;
        
        axios.get(defaultUrl)
        .then(res=> {
            // let pageInfo = res.data.pageInfo;
            // let mbtwhyCommentList = res.data.mbtwhyCommentList;
            let mbtwhy = res.data.mbtwhy;
            let isMbtwhyRecommended = res.data.isMbtwhyRecommended;
            let isMbtwhyBookmarked = res.data.isMbtwhyBookmarked;

            // 게시글 set
            setMbtwhy(mbtwhy);
            // 댓글 set
            // setComments([...mbtwhyCommentList]);
            // 추천수 set
            setRecommendCount(mbtwhy.recommendCnt);

            // 로그인한 유저에게 추천되어 있다면 (추천 데이터 존재한다면, isMbtwhyRecommend === true)
            if(isMbtwhyRecommended) {
                // 추천 여부의 초기값인 false를 true로
                setIsRecommended(!isRecommended);
            }

            // 로그인한 유저에게 북마크되어 있다면 (북마크 데이터 존재한다면, isMbtwhyBookmark === true)
            if(isMbtwhyBookmarked) {
                // 북마크 여부의 초기값인 false를 true로
                setIsBookmarked(!isBookmarked);
            }
            
            // let btn = [];
            // for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
            //     btn.push(i)
            // }
            // setCommentPage(btn);
            // setCommentPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
            setMbtwhy({});
            setComments([]);
            setCommentPageInfo({});
        });
    };

    // 게시글 추천
    const mbtwhyRecommend = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        let defaultUrl = `${urlroot}/mbtwhyrecommend`;

        axios.post(defaultUrl, recommend)
        .then(res=> {
            let mbtwhyRecommendCount = res.data.mbtwhyRecommendCount;

            setIsRecommended(!isRecommended);
            setRecommendCount(mbtwhyRecommendCount);
        });
    };
    
    // 게시글 북마크
    const mbtwhyBookmark = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        let defaultUrl = `${urlroot}/mbtwhybookmark`;

        axios.post(defaultUrl, bookmark)
        .then(res=> {
            setIsBookmarked(!isBookmarked);
        });
    };

    // 게시글 삭제
    const mbtwhyDelete = () => {
        const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");
        if(isConfirmed) {
            axios.delete(`${urlroot}/mbtwhydelete/${no}`)
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

    // 게시글 수정
    const goMbtwhyModify = () => {
        navigate(`/mbtwhymodify/${no}`);
    };

    // 댓글 목록 조회
    const getMbtwhyCommentList = (commentPage) => {
        let defaultUrl = `${urlroot}/mbtwhycommentlist/${no}`;
        if(commentPage !== 1) defaultUrl += `?commentPage=${commentPage}`; 
        
        axios.get(defaultUrl)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let mbtwhyCommentList = res.data.mbtwhyCommentList;
            let mbtwhyCommentCount = res.data.mbtwhyCommentCount;

            // 댓글 목록 set
            setComments([...mbtwhyCommentList]);
            // 댓글 개수 set
            setCommentCount(mbtwhyCommentCount);
            // 댓글 페이징 정보 set
            setCommentPageInfo({...pageInfo});

            // setCommentPage(commentPage);
        })
        .catch(err=> {
            console.log(err);
            setComments([]);
            setCommentPageInfo({});
        });
    };

    // 댓글 작성
    const postComment = (commentValue, parentcommentNo) => {
        if(!user.username) {
            alert("로그인해주세요.");
            setInputCommentValue("");
            return;
        }
        
        // 로그인한 유저의 MBTI 유형이 맞지 않고, 로그인한 유저가 게시글 작성자가 아닐 경우
        if(user.userMbti !== mbti.toUpperCase() && user.username !== mbtwhy.writerId) {
            alert(mbti.toUpperCase() + " 유형만 댓글을 작성할 수 있습니다.");
            setInputCommentValue("");
            setOpen(!open);
            return;
        }

        let defaultUrl = `${urlroot}/mbtwhycomment?no=${no}&comment=${commentValue}`;
        if(parentcommentNo !== "") defaultUrl += `&parentcommentNo=${parentcommentNo}`
        defaultUrl += `&commentPage=${commentPage}`;

        console.log(sendUser);

        axios.post(defaultUrl, sendUser)
        .then(res=> {
            let mbtwhyCommentList = res.data.mbtwhyCommentList;
            let allPage = res.data.pageInfo.allPage;
            let mbtwhyCommentCount = res.data.mbtwhyCommentCount;
            let commentPageInfo = res.data.pageInfo;
            setCommentPageInfo(commentPageInfo);

            if(parentcommentNo!=="") { // 2차댓글 작성의 경우
                let writtenCommentNo = res.data.writtenCommentNo;
                const isWrittenCommentIsInCurrentPage =  mbtwhyCommentList.some(comment => comment.commentNo === writtenCommentNo);
                // 현재 페이지번 호를 인자로 하여 불러온 길이 배열 comments 안에 방금 작성된 새댓글이 존재하는지 여부
                if (!isWrittenCommentIsInCurrentPage) { // 배열 안에 없다면(등록시 페이지가 3->4페이지에 등록되게 된 경우) 1 증가한 페이지 번호로 목록이 렌더링되게 함
                    getMbtwhyCommentList(commentPage+1);
                    setCommentPage(commentPage+1);
                }
                getMbtwhyCommentList(allPage);
                setCommentPage(allPage);
            } else {
                getMbtwhyCommentList(allPage);
                setCommentPage(allPage);
            }

            setComments([...comments]);
            setInputCommentValue("");
            setCommentCount(mbtwhyCommentCount);
        })
        .catch(err=> {
            console.log(err);
        });
    };

    // 댓글 삭제
    const commentDelete = (commentNo) => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');
        if(isConfirmed) {
            axios.get(`${urlroot}/mbtwhycommentdelete/${commentNo}`)
            .then(res => {
                console.log(res);
                alert('완료되었습니다.');

                // console.log('commentPage: ', commentPage);
                getMbtwhyCommentList(commentPage); // 이 함수를 호출하여 댓글목록 재조회하여 재렌더링 시킨다
                
            })
            .catch(err => {
                console.log(err);
            });
        }
        setOpen(false);
    };

    // commentPage 핸들링
    const handleCommentPageNo = (commentPageNo) => {
        setCommentPage(commentPageNo);
        console.log(commentPageNo);
        
        getMbtwhyCommentList(commentPageNo); // setCommentPage(pageNo)는 업데이트가 지연되기 때문에, state인 page가 아니라 전달인자 pageNo로 요청해야함
    };

    const navigate = useNavigate();

    // 목록 이동
    const goToPreviousList = () => {
        // let defaultUrl = `/mbtwhy`;
        // if(mbti !== null) defaultUrl += `/${mbti}`;
        // if(page !== null) defaultUrl += `/${page}`;
        // if(sort !== null) defaultUrl += `/${sort}`;
        // if(search) defaultUrl += `/${search}`;

        // navigate(defaultUrl);

        // 뒤로가기
        // store에 Mbtwhy 페이징, 검색, 정렬값 저장하여 목록으로 돌아갈 때 사용하기
        navigate(`/mbtwhy/${mbti}`);
    };

    // 페이지네이션
    const PaginationInside = () => {
        // if(errorMsg) return null;
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=commentPageInfo.startPage; i<=commentPageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${commentPage===i? style.activePage: ''}`} onClick={()=>handleCommentPageNo(i)}>{i}</span>
            )
        }
        return (
            <div className={style.paging}>
                {!(commentPageInfo.startPage===1) && (
                    <>
                        <span onClick={()=>handleCommentPageNo(1)}>≪</span>
                        <span onClick={()=>handleCommentPageNo(commentPageInfo.startPage-10)}>&lt;</span>
                    </>
                )}
                {pageGroup}
                {!(commentPageInfo.endPage===commentPageInfo.allPage) && (
                    <>
                        <span onClick={()=>handleCommentPageNo(commentPageInfo.endPage+1)}>&gt;</span>
                        <span onClick={()=>handleCommentPageNo(commentPageInfo.allPage)}>≫</span>
                    </>
                )}
            </div>
        );
    };

    // 댓글 컴포넌트
    const Comment = ({comment}) => {
        const isLoginUser = user.username !== "" || user.username !== undefined; // 로그인한 유저
        const isCommentWritter = comment.writerId === user.username; // 댓글 작성 유저
        const isPostWriter = comment?.writerId === mbtwhy?.writerId; // 게시글 작성 유저
        const isComment = comment.parentcommentNo===null; // 댓글 유무 (답글이 아닌 경우)
        // console.log("isLoginUser : " + isLoginUser);
        // console.log(user.username);

        // 답글창 상태
        const [isReplyVisible, setIsReplyVisible] = useState(false);

        // 답글창 열기
        const handleReply = () => {
            setIsReplyVisible(!isReplyVisible);
            setTmpReplyContent("");
        };

        // 답글 내용
        const [tmpReplyContent, setTmpReplyContent] = useState("");
        const addReply = (tmpReplyContent) => {
            postComment(tmpReplyContent, comment.commentNo);
            // setTmpReplyContent("");
            handleReply();
        };

        return (
            <React.Fragment>
                <div key={comment.commentNo} className={isComment?style.sectionComment:style.sectionReply} style={isCommentWritter?{backgroundColor:"#F8F8F8"}:{}}>
                    {isComment?
                        <React.Fragment>
                            <div className={style.writerDiv}>
                                <div>
                                    <div className={style.circleDiv} style={{backgroundColor:`${comment.writerMbtiColor}`}}></div>&nbsp;&nbsp;&nbsp;
                                    {comment.writerMbti}&nbsp;&nbsp;&nbsp;
                                    {comment.writerNickname}
                                    {isPostWriter && <div className={style.isPostWriterComment}>작성자</div>}
                                </div>
                            </div>
                            <div className={style.boardContent}>
                                {comment.isRemoved==="Y"?
                                    <div className={style.noComment}>삭제된 댓글입니다.</div>
                                    :(comment.isBlocked==="Y"?
                                        <div className={style.noComment}>차단된 댓글입니다.</div>
                                        :<React.Fragment>
                                            {comment.commentContent}
                                        </React.Fragment>
                                    )
                                }
                            </div>
                            {comment.isRemoved==="Y" || comment.isBlocked==="Y"?
                                <div className={style.commentLowDiv}>{formatDatetimeGap(comment.writeDate)}</div>
                                :<div className={style.commentLowDiv}>
                                    <div>
                                        {formatDatetimeGap(comment.writeDate)}&nbsp;&nbsp;&nbsp;
                                        {isLoginUser?
                                            <Button style={replyButtonStyle} onClick={()=>handleReply()}>답글</Button>
                                            :<></>
                                        }
                                    </div>
                                    {isLoginUser?
                                        <React.Fragment>
                                            {isCommentWritter?
                                                <Button style={replyButtonStyle} onClick={()=>commentDelete(comment.commentNo)}>삭제</Button>
                                                :<Button style={replyButtonStyle} onClick={()=>{openReportWrite(comment, "mbtwhycomment")}}>신고</Button>
                                            }
                                        </React.Fragment>
                                        :<></>
                                    }
                                </div>
                            }
                            
                        </React.Fragment>
                        :<React.Fragment>
                            <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
                            <div>
                                <div className={style.writerDiv}>
                                    <div>
                                        <div className={style.circleDiv} style={{backgroundColor:`${comment.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                                        {comment.writerMbti}&nbsp;&nbsp;&nbsp;
                                        {comment.writerNickname}
                                        {isPostWriter && <div className={style.isPostWriterComment}>작성자</div>}
                                    </div>
                                </div>
                                <div className={style.boardContent}>
                                    {comment.isRemoved==="Y"?
                                        <div className={style.noComment}>삭제된 댓글입니다.</div>
                                        :(comment.isBlocked==="Y"?
                                            <div className={style.noComment}>차단된 댓글입니다.</div>
                                            :<React.Fragment>
                                                {comment.commentContent}
                                            </React.Fragment>
                                        )
                                    }
                                </div>
                                
                                {comment.isRemoved==="Y" || comment.isBlocked==="Y"?
                                    <div className={style.commentLowDiv}>{formatDatetimeGap(comment.writeDate)}</div>
                                    :<div className={style.commentLowDiv}>
                                        <div>
                                            {formatDatetimeGap(comment.writeDate)}
                                        </div>
                                        {isLoginUser?
                                        <React.Fragment>
                                            {isCommentWritter?
                                                <Button style={replyButtonStyle} onClick={()=>commentDelete(comment.commentNo)}>삭제</Button>
                                                :<Button style={replyButtonStyle} onClick={()=>{openReportWrite(comment, "mbtwhycomment")}}>신고</Button>
                                            }
                                        </React.Fragment>
                                        :<></>
                                    }
                                    </div>
                                }
                                
                            </div>
                        </React.Fragment>
                    }
                </div>
                {isReplyVisible &&
                    <div className={style.sectionComment}>
                        <div className={style.sectionPostReply}>
                            <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
                            <Input
                                style={inputReply}
                                type="textarea"
                                id="reply"
                                name="reply"
                                onChange={(e)=>setTmpReplyContent(e.target.value)}
                                cols="40"
                                rows="15"
                                required="required"
                                value={tmpReplyContent}
                                placeholder="답글을 입력해주세요."
                            />
                        </div>
                        <div className={style.postCommentDiv}>
                            <Button style={buttonStyle} onClick={()=>addReply(tmpReplyContent)}>등록</Button>
                            <Button style={buttonStyle} onClick={()=>handleReply()}>취소</Button>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    };

    // 답글 컴포넌트
    // const Reply = ({reply}) => {
    //     const isLoginUser = user.username !== ""; // 로그인한 유저
    //     const isCommentWritter = reply.writerId === user.username; // 댓글 작성 유저
    //     const isPostWriter = reply?.writerId === mbtwhy?.writerId; // 게시글 작성 유저
        
    //     return (
    //         <div key={reply.commentNo} className={style.sectionReply} style={isCommentWritter?{backgroundColor:"#F8F8F8"}:{}}>
    //             <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
    //             <div>
    //                 <div className={style.writerDiv}>
    //                     <div>
    //                         <div className={style.circleDiv} style={{backgroundColor:`${reply.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
    //                         {reply.writerMbti}&nbsp;&nbsp;&nbsp;
    //                         {reply.writerNickname}
    //                         {isPostWriter && <div className={style.isPostWriterComment}>작성자</div>}
    //                     </div>
    //                 </div>
    //                 <div className={style.boardContent}>
    //                     {reply.isRemoved==="Y"?
    //                         <div className={style.noComment}>삭제된 댓글입니다.</div>
    //                         :(reply.isBlocked==="Y"?
    //                             <div className={style.noComment}>차단된 댓글입니다.</div>
    //                             :<React.Fragment>
    //                                 {reply.commentContent}
    //                             </React.Fragment>
    //                         )
    //                     }
    //                 </div>
                    
    //                 {reply.isRemoved==="Y" || reply.isBlocked==="Y"?
    //                     <div className={style.commentLowDiv}>{formatDatetimeGap(reply.writeDate)}</div>
    //                     :<div className={style.commentLowDiv}>
    //                         <div>
    //                             {formatDatetimeGap(reply.writeDate)}
    //                         </div>
    //                         {isCommentWritter?
    //                             <Button style={replyButtonStyle} onClick={()=>deleteComment(reply.commentNo)}>삭제</Button>
    //                             :(isLoginUser?
    //                                 <Button style={replyButtonStyle} onClick={(e)=>{openReportWrite(reply,"mbtwhycomment")}}>신고</Button>
    //                                 :<></>
    //                             )
    //                         }
    //                     </div>
    //                 }
                    
    //             </div>
    //         </div>
    //     );
    // };

    // 답글 작성 컴포넌트
    // const InputReplySection= () => {
    //     return (
    //         <div>
    //             <div className={style.sectionPostReply}>
    //                 <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
    //                 <Input
    //                     style={inputReply}
    //                     type="textarea"
    //                     id="reply"
    //                     name="reply"
    //                     onChange={replyChange}
    //                     cols="40"
    //                     rows="15"
    //                     required="required"
    //                     value={inputReplyValue}
    //                     placeholder="답글을 입력해주세요."
    //                 />
    //             </div>
    //             <div className={style.postCommentDiv}>
    //                 <Button style={buttonStyle} onClick={()=>postComment(inputReplyValue)}>등록</Button>
    //                 <Button style={buttonStyle} onClick={()=>closeReply()}>취소</Button>
    //             </div>
    //         </div>
    //     )
    // }

    const buttonStyle = {
        background:"none",
        color:"black",
        border:"1px solid #C5C5C5",
        marginLeft:"10px"
    };
    
    const replyButtonStyle = {
        background:"none",
        color:"#C5C5C5",
        fontWeight:"bold",
        border:"none",
        padding:"0px"
    };

    const inputComment = {
        height:"100px",
        resize:"none"
    };

    const inputReply = {
        height:"100px",
        width:"750px",
        resize:"none"
    };

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader} style={{borderColor:`${mbtiColor}`}}>
                    <h1>{mbti.toUpperCase()}</h1>
                </div>

                {/* 수직 중간 영역 */}
                <div>
                {/* 게시글 영역 */}
                    <div key={mbtwhy.no} className={style.sectionBoard}>
                        <div className={style.writerDiv}>
                            <div>
                                <div className={style.circleDiv} style={{backgroundColor:`${mbtwhy.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                                {mbtwhy.writerMbti}&nbsp;&nbsp;&nbsp;
                                {mbtwhy.writerNickname}
                            </div>
                            <button onClick={()=>setOpen(!open)} id="Popover1" className={style.popoverButton}><img className={style.popoverImg} src="/popover-icon.png" alt=""/></button>
                            <Popover placement="bottom" isOpen={open} name="mbtwhy" target="Popover1" toggle={()=>handleToggle()}>
                                {mbtwhy.writerId === user.username?
                                    <React.Fragment>
                                        <PopoverBody className={style.popoverItem} onClick={()=>mbtwhyDelete()}>삭제</PopoverBody>
                                        <PopoverBody className={style.popoverItem} onClick={()=>goMbtwhyModify()}>수정</PopoverBody>
                                    </React.Fragment>
                                    :<PopoverBody className={style.popoverItem} onClick={()=>openReportWrite(mbtwhy, "mbtwhy")}>신고</PopoverBody>
                                }
                            </Popover>
                        </div>
                        <div style={{color:"#C5C5C5"}}>
                            {formatDatetimeGap(mbtwhy.writeDate)}
                            <img className={style.viewIcon} src="/viewIcon-bold.png" alt=""></img>
                            {mbtwhy.viewCnt}
                        </div>
                        <div className={style.boardContent}>
                            {mbtwhy.content}
                        </div>
                        <div className={style.boardLow}>
                            <div className={style.bookmarkDiv} onClick={()=>mbtwhyBookmark()}>
                                {!isBookmarked?
                                    <img src="/bookmark.png" alt=""/>
                                    :<img src="/bookmarked.png" alt=""/>
                                }
                            </div>
                            <div className={style.thumbDiv} onClick={()=>mbtwhyRecommend()}>
                                {!isRecommended?
                                    <img src="/thumbIcon.png" alt=""/>
                                    :<img src="/thumbIcon-full.png" alt=""/>
                                }&nbsp;
                                추천&nbsp;
                                {recommendCount}
                            </div>
                            <div className={style.listDiv}>
                                <Button style={buttonStyle} onClick={()=>goToPreviousList()}>목록</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.commentCountDiv}>
                        <div>
                            댓글&nbsp;
                            {commentCount}
                            {/* {mbtwhy.commentCnt} */}
                        </div>
                    </div>
                </div>
                {/* 게시글 영역 */}
                
                {/* 댓글 영역 */}
                <div>
                    {/* 댓글 목록 */}
                    <div>
                        {comments
                            // .filter(comment=> comment.parentcommentNo===null)
                            .map(comment => {
                                return (
                                    <React.Fragment key={comment.commentNo}>
                                        <Comment comment={comment} key={comment.commentNo}/>
                                            {/* {comments
                                                .filter(reply => reply.parentcommentNo === comment.commentNo)
                                                .map(reply =><Reply reply={reply} key={reply.commentNo}/>)} */}
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>

                    {/* 대댓글 */}
                    {/* <div key={replyComment.num} className={style.sectionReply} style={{display:"flex"}}>
                        <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
                        <div>
                            <div className={style.writerDiv}>
                                <div>
                                    <div className={style.circleDiv} style={{backgroundColor:`${replyComment.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                    {replyComment.mbti}&nbsp;&nbsp;&nbsp;
                                    {replyComment.writer}
                                </div>
                            </div>
                            <div className={style.boardContent}>
                                {replyComment.content}
                            </div>
                            <div className={style.commentLowDiv}>
                                <div>
                                    {replyComment.date}
                                </div>
                                <Button style={replyButtonStyle} name="mbtwhycomment" onClick={()=>{openReportWrite(e, replyComment)}}>신고</Button>
                            </div>
                        </div>
                    </div> */}
                    {/* 대댓글 */}

                    {/* 본인 댓글 */}
                    {/* <div key={replyComment.num} className={style.sectionComment} style={{backgroundColor:"#F8F8F8"}}>
                        <div>
                            <div className={style.writerDiv}>
                                <div>
                                    <div className={style.circleDiv} style={{backgroundColor:`${replyComment.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                    {replyComment.mbti}&nbsp;&nbsp;&nbsp;
                                    {replyComment.writer}
                                </div>
                            </div>
                            <div className={style.boardContent}>
                                {replyComment.content}
                            </div>
                            <div className={style.commentLowDiv}>
                                <div>
                                    {replyComment.date}&nbsp;&nbsp;&nbsp;
                                    <Button style={replyButtonStyle}>답글</Button>
                                </div>
                                <Button style={replyButtonStyle}>삭제</Button>
                            </div>
                        </div>
                    </div> */}
                    {/* 본인 댓글 */}

                    {/* 삭제된 댓글 */}
                    {/* <div className={style.sectionDeletedComment}>
                        삭제된 댓글입니다.
                    </div> */}
                    {/* 삭제된 댓글 */}

                    {/* 페이징 영역 */}
                    {comments.length===0?<></>:<PaginationInside/>}

                    {/* 댓글 달기 */}
                    <div>
                        <Input
                            style={inputComment}
                            type="textarea"
                            id="comment"
                            name="comment"
                            onChange={commentChange}
                            cols="40"
                            rows="15"
                            required="required"
                            value={inputCommentValue}
                            placeholder="댓글을 입력해주세요."
                        />
                        <div className={style.postCommentDiv}>
                            <Button style={buttonStyle} onClick={()=>postComment(inputCommentValue, "")}>등록</Button>
                        </div>
                    </div>

                </div>
                {/* 댓글 영역 */}
            </div>
        </div>
    );
}

export default MbtwhyDetail;
