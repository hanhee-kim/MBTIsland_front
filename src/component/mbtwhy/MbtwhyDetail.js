import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import style from "../../css/mbtwhy/MbtwhyDetail.module.css";
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

function MbtwhyDetail() {
    // const [replyComment, setReplyComment] = useState(
    //     {
    //         num:1,
    //         mbti:"ISTP",
    //         color:"#4D6879",
    //         writer:"ㅋㅋㅋㅋ",
    //         date:"1일전",
    //         content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
    //     }
    // );

    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user.user);
    const [sendUser, setSendUser] = useState({
        username : user.username,
        userNickname : user.userNickname,
        userMbti : user.userMbti,
        userMbtiColor : user.userMbtiColor
    });

    // MBTI 분류, 글 번호, 댓글 페이지 번호
    const {mbti, no, page} = useParams();

    // Mbtwhy 게시글 목록
    const [mbtwhy, setMbtwhy] = useState({});

    const [mbtiColor, setMbtiColor] = useState("");

    const setMbtiColorTo = () => {
        if(mbti==="istj") {
            setMbtiColor("#C5C5C5");
        } else if (mbti==="isfj") {
            setMbtiColor("#F2DCB3");
        } else if (mbti==="infj") {
            setMbtiColor("#EAEFF9");
        } else if (mbti==="intj") {
            setMbtiColor("#D8D4EA");
        } else if (mbti==="istp") {
            setMbtiColor("#4D6879");
        } else if (mbti==="isfp") {
            setMbtiColor("#BDC9A6");
        } else if (mbti==="infp") {
            setMbtiColor("#648181");
        } else if (mbti==="intp") {
            setMbtiColor("#9BB7D4");
        } else if (mbti==="estp") {
            setMbtiColor("#D8927A");
        } else if (mbti==="esfp") {
            setMbtiColor("#F0A4AB");
        } else if (mbti==="enfp") {
            setMbtiColor("#FFD966");
        } else if (mbti==="entp") {
            setMbtiColor("#B6634A");
        } else if (mbti==="estj") {
            setMbtiColor("#596D55");
        } else if (mbti==="esfj") {
            setMbtiColor("#E6D0CE");
        } else if (mbti==="enfj") {
            setMbtiColor("#82B8AD");
        } else if (mbti==="entj") {
            setMbtiColor("#35598F");
        }
    };

    // mbti 값
    // const [mbti, setMbti] = useState(mbtiValue);

    // 페이지 값
    // const [page, setPage] = useState(pageValue);

    // 검색 값
    // const [search, setSearch] = useState(searchValue);

    // 정렬 값
    // const [sort, setSort] = useState(sortValue);

    // Mbtwhy 게시글 번호 값
    // const [no, setNo] = useState(noValue);

    // 댓글 페이지 번호
    const [commentPage, setCommentPage] = useState(1);
    
    // 댓글 페이징 정보
    const [commentPageInfo, setCommentPageInfo] = useState({});

    // 댓글 목록
    const [comments, setComments] = useState([]);

    // 댓글 작성 상태 값
    const [comment, setComment] = useState("");

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

    // 부모 댓글 번호
    const [parentcommentNo, setParentcommentNo] = useState(null);

    // 추천 정보 (아이디, 사용자 아이디, 글 번호, 게시판 유형)
    const [recommend, setRecommend] = useState({});

    // 추천 여부
    const [isRecommend, setIsRecommend] = useState(false);

    // 추천 개수
    const [recommendCount, setRecommendCount] = useState();

    // 신고 팝오버 열기
    const openReportWrite = (e, report) => {
        setOpen(!open);
        const url = "/reportwrite/" + report.writerId + '/' + e.target.name;
        window.open(
          url,
          "_blank",
          "width=650,height=450,location=no,status=no,scrollbars=yes"
        );
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

    useEffect(() => {
        clickOutsidePopover();
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    useEffect(() => {
        setMbtiColorTo();
        // setSendUser({
        //     username : user.username,
        //     userNickname : user.userNickname,
        //     userMbti : user.userMbti,
        //     userMbtiColor : user.userMbtiColor
        // });

        getMbtwhyDetail(no, commentPage);
    }, []);

    // pageChange 함수를 호출한 페이징 영역에서 페이징 항목(1, 2, 3...)들을 인자로 받아옴
    const pageChange = (repage) => {
        getMbtwhyDetail(no, repage);
    };

    // url에 파라미터로 줄 변수 repage
    const getMbtwhyDetail = (no, commentPage) => {
        console.log('get함수호출')
        // let defaultUrl = `http://localhost:8090/mbtwhydetail?no=${no}&commentPage=${commentPage}`;
        
        let defaultUrl = `http://localhost:8090/mbtwhydetail?`;
        // if(page !== null) defaultUrl += `&page=${page}`;
        // if(search !== null) defaultUrl += `&search=${search}`;
        // if(sort !== null) defaultUrl += `&sort=${sort}`;
        if(no !== null) defaultUrl += `no=${no}`;
        if(commentPage !== null) defaultUrl += `&commentPage=${commentPage}`;
        defaultUrl += `&username=${user.username}`;
        
        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let mbtwhyCommentList = res.data.mbtwhyCommentList;
            let mbtwhy = res.data.mbtwhy;
            let isMbtwhyRecommend = res.data.isMbtwhyRecommend;

            setMbtwhy(mbtwhy);
            setComments([...mbtwhyCommentList]);
            setRecommendCount(mbtwhy.recommendCnt);

            // 추천되어 있다면
            if(isMbtwhyRecommend) {
                // 추천 여부의 초기값인 false를 true로
                setIsRecommend(!isRecommend);
            }
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setCommentPage(btn);
            setCommentPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
            setComments([]);
            setCommentPageInfo({});
        })
    };

    // 댓글 상태 값 변경
    const commentChange = (e) => {
        setComment(e.target.value);
    }

    // 댓글 작성
    const postComment = () => {
        let defaultUrl = `http://localhost:8090/mbtwhycomment?no=${no}&comment=${comment}`;
        if(parentcommentNo !== null) defaultUrl += `&parentcommentNo=${parentcommentNo}`
        defaultUrl += `&commentPage=${commentPage}`;

        axios.post(defaultUrl, sendUser)
        .then(res=> {
            console.log(res);
            let comments = res.data.mbtwhyCommentList;
            setComments([...comments]);
            // let no = res.data.no;
            // navigate(`/mbtwhydetail/${mbtiValue}/${no}/1`);
        })
        .catch(err=> {
            console.log(err);
        })
    };

    // 게시글 추천
    const postRecommend = () => {
        let defaultUrl = `http://localhost:8090/mbtwhyrecommend`;

        axios.post(defaultUrl, recommend)
        .then(res=> {
            console.log(res);
            let count = res.data.recommedCount;
            let recommend = res.data.selectedRecommend;

            // 추천되지 않은 상태라면 추천
            if(recommend === null) {
                
            }
            setRecommendCount(count);
        })
    }

    // Toggle 핸들링
    const handleToggle = () => {
        setOpen(!open);
    };

    // commentPage 핸들링
    const handleCommentPageNo = (CommentPageNo) => {
        setCommentPage(CommentPageNo);

        getMbtwhyDetail(no, CommentPageNo); // setCommentPage(pageNo)는 업데이트가 지연되기 때문에, state인 page가 아니라 전달인자 pageNo로 요청해야함
    };

    const navigate = useNavigate();

    // mbtwhy 이동
    const goMbtwhy = () => {
        // let defaultUrl = `/mbtwhy`;
        // if(mbti !== null) defaultUrl += `/${mbti}`;
        // if(page !== null) defaultUrl += `/${page}`;
        // if(sort !== null) defaultUrl += `/${sort}`;
        // if(search) defaultUrl += `/${search}`;

        // navigate(defaultUrl);

        // 뒤로가기
        // store에 Mbtwhy 페이징, 검색, 정렬값 저장하여 목록으로 돌아갈 때 사용하기
        navigate(-1);
    }

    // 페이지네이션
    const PaginationInside = () => {
        // if(errorMsg) return null;
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=commentPageInfo.startPage; i<=commentPageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${page===i? style.activePage: ''}`} onClick={()=>handleCommentPageNo(i)}>{i}</span>
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
    }

    // 댓글 컴포넌트
    const Comment = ({comment}) => {
        return (
            <div key={comment.commentNo} className={style.sectionComment} style={comment.username===mbtwhy.writerId?{backgroundColor:"#F8F8F8"}:{}}>
                <div className={style.writerDiv}>
                    <div>
                        <div className={style.circleDiv} style={{backgroundColor:`${comment.writerMbtiColor}`}}></div>&nbsp;&nbsp;&nbsp;
                        {comment.writerMbti}&nbsp;&nbsp;&nbsp;
                        {comment.writerNickname}
                    </div>
                </div>
                <div className={style.boardContent}>
                    {comment.commentContent}
                </div>
                <div className={style.commentLowDiv}>
                    
                    {comment.username===mbtwhy.writerId?
                        <>
                            <div>
                                {comment.writeDate}&nbsp;&nbsp;&nbsp;
                                <Button style={replyButtonStyle}>답글</Button>
                            </div>
                            <Button style={replyButtonStyle}>삭제</Button>
                        </>
                        :
                        <>
                            <div>
                                {comment.writeDate}&nbsp;&nbsp;&nbsp;
                                <Button style={replyButtonStyle}>답글</Button>
                            </div>
                            <Button style={replyButtonStyle} name="mbtwhycomment" onClick={(e)=>{openReportWrite(e, comment)}}>신고</Button>
                        </>
                    }
                </div>
            </div>
        );
    }

    // 답글 컴포넌트
    const Reply = ({comment}) => {
        return (
            <div key={comment.commentNo} className={style.sectionReply} style={{display:"flex"}}>
                <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
                <div>
                    <div className={style.writerDiv}>
                        <div>
                            <div className={style.circleDiv} style={{backgroundColor:`${comment.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                            {comment.writerMbti}&nbsp;&nbsp;&nbsp;
                            {comment.writerNickname}
                        </div>
                    </div>
                    <div className={style.boardContent}>
                        {comment.commentContent}
                    </div>
                    <div className={style.commentLowDiv}>
                        <div>
                            {comment.writeDate}
                        </div>
                        <Button style={replyButtonStyle} name="mbtwhycomment" onClick={(e)=>{openReportWrite(e, comment)}}>신고</Button>
                    </div>
                </div>
            </div>
        );
    }

    const buttonStyle = {
        background:"none",
        color:"black",
        border:"1px solid #C5C5C5",
        marginLeft:"10px"
    }
    
    const replyButtonStyle = {
        background:"none",
        color:"#C5C5C5",
        fontWeight:"bold",
        border:"none",
        padding:"0px"
    }

    const inputComment = {
        height:"100px",
        resize:"none"
    }

    const inputReply = {
        height:"100px",
        width:"750px",
        resize:"none"
    }

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
                            {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                <DropdownToggle style={dropDownStyle}>
                                <img className={style.dropDownImg} src="/popover-icon.png"></img>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                <DropdownItem>수정</DropdownItem>
                                    <DropdownItem>삭제</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown> */}
                            {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                <DropdownToggle style={dropDownStyle}>
                                    <img className={style.dropDownImg} src="/popover-icon.png" alt=""></img>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="mbtwhydetail" onClick={(e)=>{openReportWrite(e, mbtwhy)}}>신고</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown> */}

                            <button onClick={()=>setOpen(!open)} id="Popover1" className={style.popoverButton}><img className={style.popoverImg} src="/popover-icon.png" alt=""/></button>
                            <Popover placement="bottom" isOpen={open} target="Popover1" toggle={()=>handleToggle()}>
                                <PopoverBody className={style.popoverItem} onClick={(e)=>openReportWrite(e, mbtwhy)}>신고</PopoverBody>
                            </Popover>
                        </div>
                        <div style={{color:"#C5C5C5"}}>
                            {mbtwhy.writeDate}
                            <img className={style.viewIcon} src="/viewIcon-bold.png" alt=""></img>
                            {mbtwhy.viewCnt}
                        </div>
                        <div className={style.boardContent}>
                            {mbtwhy.content}
                        </div>
                        <div className={style.boardLow}>
                            <div className={style.bookmarkDiv}>
                                <img src="/bookmark.png" alt=""></img>&nbsp;
                            </div>
                            <div className={style.thumbDiv} onClick={()=>recommend()}>
                                {isRecommend?
                                    <img src="/thumbIcon-full.png" alt=""></img>
                                    :<img src="/thumbIcon.png" alt=""></img>
                                }&nbsp;
                                추천&nbsp;
                                {recommendCount}
                                {/* {mbtwhy.recommendCnt} */}
                            </div>
                            <div className={style.listDiv}>
                                <Button style={buttonStyle} onClick={()=>goMbtwhy()}>목록</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.commentCountDiv}>
                        <div>
                            댓글&nbsp;
                            {mbtwhy.commentCnt}
                        </div>
                    </div>
                </div>
                {/* 게시글 영역 */}
                
                {/* 댓글 영역 */}
                <div>
                    {/* 댓글 목록 */}
                    <div>
                        {comments.length !== 0 && comments.map(comment => {
                            return (
                                <Comment comment={comment} key={comment.commentNo}/>
                            )
                            // <Comment comment={comment}/>
                            // return (
                            //     <div key={comment.commentNo} className={style.sectionComment}>
                            //         <div className={style.writerDiv}>
                            //             <div>
                            //                 <div className={style.circleDiv} style={{backgroundColor:`${comment.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                            //                 {comment.writerMbti}&nbsp;&nbsp;&nbsp;
                            //                 {comment.writerNickname}
                            //             </div>
                            //         </div>
                            //         <div className={style.boardContent}>
                            //             {comment.commentContent}
                            //         </div>
                            //         <div className={style.commentLowDiv}>
                            //             <div>
                            //                 {comment.writeDate}&nbsp;&nbsp;&nbsp;
                            //                 <Button style={replyButtonStyle}>답글</Button>
                            //             </div>
                            //             <Button style={replyButtonStyle} name="mbtwhycomment" onClick={(e)=>{openReportWrite(e, comment)}}>신고</Button>
                            //         </div>
                            //     </div>
                            // )
                        })}
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
                                <Button style={replyButtonStyle} name="mbtwhycomment" onClick={(e)=>{openReportWrite(e, replyComment)}}>신고</Button>
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
                    {PaginationInside()}

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
                                value={comment.content}
                                placeholder="댓글을 입력해주세요."
                            />
                            <div className={style.postCommentDiv}>
                                <Button style={buttonStyle} onClick={()=>postComment()}>등록</Button>
                            </div>
                        </div>
                    :<></>}

                    {/* 답글 달기 */}
                    {/* <div>
                        <div className={style.sectionPostReply}>
                            <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
                            <Input
                                style={inputReply}
                                type="textarea"
                                id="reply"
                                name="reply"
                                onChange={commentChange}
                                cols="40"
                                rows="15"
                                required="required"
                                value={comment.content}
                                placeholder="답글을 입력해주세요."
                            />
                        </div>
                        <div className={style.postCommentDiv}>
                            <Button style={buttonStyle}>등록</Button>
                            <Button style={buttonStyle}>취소</Button>
                        </div>
                    </div> */}

                </div>
                {/* 댓글 영역 */}
            </div>
        </div>
    );
}

export default MbtwhyDetail;
