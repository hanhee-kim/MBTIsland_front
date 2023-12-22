import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    Popover,
    PopoverBody,
    Button,
    Input
} from "reactstrap";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import axios from 'axios';

import style from "../../css/mbattle/MBattleDetail.module.css";
import { urlroot } from "../../config";

function MBattleDetail() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user.user);

    const [sendUser, setSendUser] = useState({
        username : user.username,
        userNickname : user.userNickname,
        userMbti : user.userMbti,
        userMbtiColor : user.userMbtiColor
    });

    // Mbattle 게시글
    const [mbattle, setMbattle] = useState({});

    // 글 번호, 댓글 페이지 번호
    const {no, page} = useParams();

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

    // 투표 여부
    const [isVoted, setIsVoted] = useState(false);

    // 투표 정보 (글 번호, 투표자 아이디, 투표 항목)
    // 투표 시 백으로 보낼 데이터
    const [vote, setVote] = useState({
        mbattleNo: no,
        voterId: user.username,
        voteItem: ""
    });

    // 북마크 여부
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 북마크 정보 (사용자 아이디, 글 번호, 게시판 유형)
    // 북마크 시 백으로 보낼 데이터
    const [bookmark, setBookmark] = useState({
        username: user.username,
        postNo: no,
        boardType: "mbattle"
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

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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

    useEffect(() => {
        clickOutsidePopover();
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    useEffect(()=> {
        getMbattleDetail();
        getMbattleCommentList(commentPage);
    }, []);

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
        setOpen(!open);

        let reportData = {};
        if(reportedTable === "mbattle") {
            reportData = {
                // no:0,
                reportType: "게시글",
                tableType: reportedTable,
                reportedPostNo: report.no,
                // reportedCommentNo:, // 댓글 아니므로 댓글 번호 없음
                reportedId: report.writerId,
                reportedTitle: report.title,
                reportedContent: report.content,
                fileIdxs: report.fileIdx1 + "," + report.fileIdx2,
                reporterId: user.username,
                // reportDate: "", // 백에서 지정
                reportReason: "광고", // 신고 창에서 변경 (기본값 광고)
                isCompleted: "N",
                isWarned: "N"
            };
        } else if(reportedTable === "mbattlecomment") {
            reportData = {
                // no:0,
                reportType: "댓글",
                tableType: reportedTable,
                reportedPostNo: mbattle.no,
                reportedCommentNo: report.no,
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

    // url에 파라미터로 줄 변수 repage
    const getMbattleDetail = () => {
        let defaultUrl = `${urlroot}/mbattledetail/${no}`;
        defaultUrl += `?username=${user.username}`;

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let mbattle = res.data.mbattle;
            let mbattleVoter = res.data.mbattleVoter;
            let isMbattleBookmarked = res.data.isMbattleBookmarked;

            // 게시글 set
            setMbattle(mbattle);

            // 로그인한 유저에게 투표되어 있다면 (투표 데이터 존재한다면)
            if(mbattleVoter!==null) {
                setIsVoted(!isVoted);
            }

            if(isMbattleBookmarked) {
                setIsBookmarked(!isBookmarked);
            }

            // let pageInfo = res.data.pageInfo;
            // let list = res.data.commentList;

            // setComments([...list]);
            
            // let btn = [];
            // for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
            //     btn.push(i)
            // }
            // setPageBtn(btn);
            // setPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
            setMbattle({});
        })
    };

    // 게시글 북마크
    const mbattleBookmark = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        let defaultUrl = `${urlroot}/mbattlebookmark`;

        axios.post(defaultUrl, bookmark)
        .then(res=> {
            setIsBookmarked(!isBookmarked);
        });
    };

    // 게시글 삭제
    const mbattleDelete = () => {
        const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");
        if(isConfirmed) {
            axios.delete(`${urlroot}/mbattledelete/${no}`)
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
    const goMbattleModify = () => {
        navigate(`/mbattlemodify/${no}`);
    };

    // 댓글 목록 조회
    const getMbattleCommentList = (commentPage) => {
        let defaultUrl = `${urlroot}/mbattlecommentlist/${no}`;
        if(commentPage !== 1) defaultUrl += `?commentPage=${commentPage}`; 
        
        axios.get(defaultUrl)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let mbattleCommentList = res.data.mbattleCommentList;
            let mbattleCommentCount = res.data.mbattleCommentCount;

            // 댓글 set
            setComments([...mbattleCommentList]);
            
            // 댓글 개수 set
            setCommentCount(mbattleCommentCount);

            // 댓글 페이징 정보 set
            setCommentPageInfo({...pageInfo});
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            // setCommentPage(btn);
            setCommentPage(commentPage);
        })
        .catch(err=> {
            console.log(err);
            setComments([]);
            setCommentPageInfo({});
        });
    };

    // 댓글 작성
    const postComment = (commentValue) => {
        let defaultUrl = `${urlroot}/mbattlecomment?no=${no}&comment=${commentValue}`;

        axios.post(defaultUrl, sendUser)
        .then(res=> {
            console.log(res);
            setInputCommentValue("");
            getMbattleCommentList(commentPage);
        })
        .catch(err=> {
            console.log(err);
        });
    };

    // 댓글 삭제
    const commentDelete = (commentNo) => {
        const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');
        if(isConfirmed) {
            axios.get(`${urlroot}/mbattlecommentdelete/${commentNo}`)
            .then(res => {
                console.log(res);
                alert('완료되었습니다.');

                // console.log('commentPage: ', commentPage);
                getMbattleCommentList(commentPage); // 이 함수를 호출하여 댓글목록 재조회하여 재렌더링 시킨다
                
            })
            .catch(err => {
                console.log(err);
            });
        }
        setOpen(false);
    };

    // 랜덤 mbattleDetail 이동 
    const goRandomMbattleDetail = (e) => {

    };

    // commentPage 핸들링
    const handleCommentPageNo = (commentPageNo) => {
        setCommentPage(commentPageNo);
        console.log(commentPageNo);
        
        getMbattleCommentList(commentPageNo); // setCommentPage(pageNo)는 업데이트가 지연되기 때문에, state인 page가 아니라 전달인자 pageNo로 요청해야함
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
        navigate("/mbattle");
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
        const isPostWriter = comment?.writerId === mbattle?.writerId; // 게시글 작성 유저

        return (
            <React.Fragment>
                <div key={comment.commentNo} className={style.sectionComment} style={isCommentWritter?{backgroundColor:"#F8F8F8"}:{}}>
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
                            </div>
                            {isLoginUser?
                                <React.Fragment>
                                    {isCommentWritter?
                                        <Button style={replyButtonStyle} onClick={()=>commentDelete(comment.commentNo)}>삭제</Button>
                                        :<Button style={replyButtonStyle} onClick={()=>{openReportWrite(comment, "mbattlecomment")}}>신고</Button>
                                    }
                                </React.Fragment>
                                :<></>
                            }
                        </div>
                    }
                </div>
            </React.Fragment>

        );
    };

    const buttonStyle = {
        background:"none",
        color:"black",
        border:"1px solid #C5C5C5"
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

    const boardVoteButton = {
        fontWeight:"bold",
        fontSize:"small",
        backgroundColor:"#1FAB70",
        lineHeight:"10px"
    };

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>M-Battle</h1>
                </div>

                {/* 수직 중간 영역 */}
                <div>
                {/* 게시글 영역 */}
                    <div key={mbattle.no} className={style.sectionBoard}>
                        <div className={style.boardTitle}>
                            <h1>{mbattle.title}</h1>
                            <div> 
                                <img src="/randomIcon.png" height="30px" alt="" onClick={()=>goRandomMbattleDetail()} />
                                {user.username !== ""?
                                    <React.Fragment>
                                        <button onClick={()=>setOpen(!open)} id="Popover1" className={style.popoverButton}><img className={style.popoverImg} src="/popover-icon.png" alt=""/></button>
                                        <Popover placement="bottom" isOpen={open} name="mbattle" target="Popover1" toggle={()=>handleToggle()}>
                                            {mbattle.writerId === user.username?
                                                <React.Fragment>
                                                    <PopoverBody className={style.popoverItem} onClick={()=>mbattleDelete()}>삭제</PopoverBody>
                                                </React.Fragment>
                                                :(user.username !== ""?
                                                    <PopoverBody className={style.popoverItem} onClick={()=>openReportWrite(mbattle, "mbattle")}>신고</PopoverBody>
                                                    :<></>
                                                )
                                            }
                                        </Popover>
                                    </React.Fragment>
                                :<></>
                                }
                            </div>
                        </div>
                        <div className={style.writerDiv}>
                            <div className={style.circleDiv} style={{backgroundColor:`${mbattle.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                            {mbattle.writerMbti}&nbsp;&nbsp;&nbsp;
                            {mbattle.writerId}
                        </div>
                        <div style={{color:"#C5C5C5"}}>
                            {mbattle.writeDate}
                            <img className={style.viewIcon} src="/viewIcon-bold.png" alt=""></img>
                            {mbattle.viewCnt}
                        </div>

                        {/* 투표 영역 */}
                        <div className={style.sectionVote}>
                            <div>
                                <div className={style.subject}>
                                    {mbattle.fileIdx1!==null?
                                        <React.Fragment>
                                            <img src={`${urlroot}/mbattleimg/${mbattle.fileIdx1}`} alt=''/>
                                            <h4>{mbattle.voteItem1}</h4>
                                        </React.Fragment>
                                        :<div className={style.voteItemDiv}><h4>{mbattle.voteItem1}</h4></div>
                                    }
                                </div>
                                {user.userRole === "ROLE_USER"?
                                    <div className={style.voteButtonDiv}>
                                        <Button style={boardVoteButton}>투표하기</Button>
                                    </div>
                                    :<></>
                                }
                            </div>
                            <div style={{margin:"30px"}}>
                                <img src="/vsIcon.png" alt=""/>
                            </div>
                            <div>
                                <div className={style.subject}>
                                    {mbattle.fileIdx2!==null?
                                        <React.Fragment>
                                            <img src={`${urlroot}/mbattleimg/${mbattle.fileIdx2}`} alt=''/>
                                            <h4>{mbattle.voteItem2}</h4>
                                        </React.Fragment>
                                        :<div className={style.voteItemDiv}><h4>{mbattle.voteItem2}</h4></div>
                                    }
                                    <div>
                                    </div>
                                </div>
                                <div className={style.voteButtonDiv}>
                                    <Button style={boardVoteButton}>투표하기</Button>
                                </div>
                            </div>
                        </div>

                        {/* 통계 영역 */}
                        <div style={{width:"600px", height:"400px"}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="uv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="pv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{width:"600px", height:"400px"}}>
                            <ResponsiveContainer>
                                <BarChart data={data} layout="vertical">
                                    <YAxis type="name"/>
                                    <XAxis type="number" orientation="top" stroke="#285A64"/>
                                    <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }} barSize={{height:"10px"}}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{width:"600px", height:"400px"}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={150} height={40} data={data} layout="vertical">
                                    <YAxis/>
                                    <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div>
                            <BarChart
                                width={430}
                                height={170}
                                data={data}
                                layout="vertical">
                                <XAxis type="number" orientation="top"/>
                                <YAxis type="category" dataKey="currency" axisLine={false} dx={-5} tickLine={false} 
                                    style={{ fill: "#285A64" }} />
                                <Bar background dataKey="uv" fill="#285A64" barSize={{ height: 300 }}>
                                    
                                </Bar>
                            </BarChart>
                        </div>

                        <div className={style.boardLow}>
                            <div className={style.bookmarkDiv} onClick={()=>mbattleBookmark()}>
                                {!isBookmarked?
                                    <img src="/bookmark.png" alt=""/>
                                    :<img src="/bookmarked.png" alt=""/>
                                }
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
                            {/* {mbattle.commentCount} */}
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

                    {/* 페이징 영역 */}
                    {comments.length===0?<></>:<PaginationInside/>}

                    {/* 댓글 달기 */}
                    {user.userRole === "ROLE_USER"?
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
                    :<></>}

                </div>
                {/* 댓글 영역 */}
            </div>
        </div>
    );
}

export default MBattleDetail;
