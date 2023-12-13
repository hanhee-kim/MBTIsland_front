import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import style from "../../css/mbtwhy/MbtwhyDetail.module.css";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input
} from "reactstrap";
import axios from 'axios';


function MbtwhyDetail() {
    const [board, setBoard] = useState(
        {
            num:1,
            mbti:"INTP",
            color:"#9BB7D4",
            writerId:"user01",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
            commentCount:2,
            likeCount:1,
            viewCount:23
        }
    );

    const [replyComment, setReplyComment] = useState(
        {
            num:1,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        }
    );

    const {mbti, page, search, sort, no} = useParams();

    // Mbtwhy 게시글 목록
    const [mbtwhy, setMbtwhy] = useState({});

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
    const [comment, setComment] = useState({num:"", mbti:"", writer:"", date:"", content:""});

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("유즈 이펙트! mbti는 " + mbti + ", page는 " + page + ", search는 " + search + ", no는 " + no + ", sort는 " + sort);
        getMbtwhyDetail(no, commentPage);
    }, []);

    // pageChange 함수를 호출한 페이징 영역에서 페이징 항목(1, 2, 3...)들을 인자로 받아옴
    const pageChange = (repage) => {
        getMbtwhyDetail(no, repage);
    };

    // url에 파라미터로 줄 변수 repage
    const getMbtwhyDetail = (no, commentPage) => {
        // let defaultUrl = `http://localhost:8090/mbtwhydetail?no=${no}&commentPage=${commentPage}`;
        
        let defaultUrl = `http://localhost:8090/mbtwhydetail?mbti=${mbti}`;
        if(page !== null) defaultUrl += `&page=${page}`;
        if(search !== null) defaultUrl += `&search=${search}`;
        if(sort !== null) defaultUrl += `&sort=${sort}`;
        if(no !== null) defaultUrl += `&no=${no}`;
        if(no !== null) defaultUrl += `&commentPage=${commentPage}`;
        
        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.commentList;
            let mbtwhy = res.data.mbtwhy;

            setMbtwhy(mbtwhy);
            setComments([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setCommentPage(btn);
            setCommentPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
        })
    };

    // 댓글 상태 값 변경
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setComment({...comment, [name]:value});
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

    const openReportWrite = (e, report) => {
        const url = "/reportwrite/" + report.writerId + '/' + e.target.name;
        window.open(
          url,
          "_blank",
          "width=650,height=450,location=no,status=no,scrollbars=yes"
        );
        // , "noopener, noreferrer"
      };

    const submit=(e)=> {
        e.preventDefault();
    };

    // 페이지네이션
    const PaginationInside = () => {
        // if(errorMsg) return null;
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=commentPageInfo.startPage; i<=commentPageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${page===i? style.activePage: ''}`}><Link to={"/mbtwhydetail?mbti=" + mbti + "&page=" + i + "&sort=" + sort} style={linkStyle} onClick={()=>handleCommentPageNo(i)}>{i}</Link></span>
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

    const dropDownStyle = {
        display:"flex",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
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

    const linkStyle = {
        cursor:"pointer",
        textDecoration: "none",color:"black"
    }

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>ISTP</h1>
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
                            <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                <DropdownToggle style={dropDownStyle}>
                                    <img className={style.dropDownImg} src="/popover-icon.png" alt=""></img>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="mbtwhydetail" onClick={(e)=>{openReportWrite(e, mbtwhy)}}>신고</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                        <div style={{color:"#C5C5C5"}}>
                            {mbtwhy.writeDate}
                            <img className={style.viewIcon} src="/viewIcon-bold.png" alt=""></img>
                            {mbtwhy.viewCount}
                        </div>
                        <div className={style.boardContent}>
                            {mbtwhy.content}
                        </div>
                        <div className={style.boardLow}>
                            <div className={style.bookmarkDiv}>
                                <img src="/bookmark.png" alt=""></img>&nbsp;
                            </div>
                            <div className={style.thumbDiv}>
                                <img src="/thumbIcon.png" alt=""></img>&nbsp;
                                추천&nbsp;
                                {mbtwhy.recommendCnt}
                            </div>
                            <div className={style.listDiv}>
                                <Button style={buttonStyle}>목록</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.commentCountDiv}>
                        <div>
                            댓글&nbsp;
                            {mbtwhy.commentCount}
                        </div>
                    </div>
                </div>
                {/* 게시글 영역 */}
                
                {/* 댓글 영역 */}
                <div>
                    {/* 댓글 목록 */}
                    {comments.length !== 0 && comments.map(comment => {
                        return (
                            <div key={comment.num} className={style.sectionComment}>
                                <div className={style.writerDiv}>
                                    <div>
                                        <div className={style.circleDiv} style={{backgroundColor:`${comment.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                        {comment.mbti}&nbsp;&nbsp;&nbsp;
                                        {comment.writer}
                                    </div>
                                </div>
                                <div className={style.boardContent}>
                                    {comment.content}
                                </div>
                                <div className={style.commentLowDiv}>
                                    <div>
                                        {comment.date}&nbsp;&nbsp;&nbsp;
                                        <Button style={replyButtonStyle}>답글</Button>
                                    </div>
                                    <Button style={replyButtonStyle} name="mbtwhycomment" onClick={(e)=>{openReportWrite(e, comment)}}>신고</Button>
                                </div>
                            </div>
                        )
                    })}

                    {/* 대댓글 */}
                    <div key={replyComment.num} className={style.sectionReply} style={{display:"flex"}}>
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
                    </div>
                    {/* 대댓글 */}

                    {/* 본인 댓글 */}
                    <div key={replyComment.num} className={style.sectionComment} style={{backgroundColor:"#F8F8F8"}}>
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
                    </div>
                    {/* 대댓글 */}

                    {/* 삭제된 댓글 */}
                    <div className={style.sectionDeletedComment}>
                        삭제된 댓글입니다.
                    </div>

                    {/* 페이징 영역 */}
                    {PaginationInside()}

                    {/* 댓글 달기 */}
                    <div>
                        <Input
                            style={inputComment}
                            type="textarea"
                            id="content"
                            name="content"
                            onChange={change}
                            cols="40"
                            rows="15"
                            required="required"
                            value={comment.content}
                            placeholder="댓글을 입력해주세요."
                        />
                        <div className={style.postCommentDiv}>
                            <Button style={buttonStyle}>등록</Button>
                        </div>
                    </div>

                    {/* 답글 달기 */}
                    <div>
                        <div className={style.sectionPostReply}>
                            <img className={style.replyArrowImg} src="/replyArrow.png" alt=""></img>
                            <Input
                                style={inputReply}
                                type="textarea"
                                id="content"
                                name="content"
                                onChange={change}
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
                    </div>

                </div>
                {/* 댓글 영역 */}
            </div>
        </div>
    );
}

export default MbtwhyDetail;
