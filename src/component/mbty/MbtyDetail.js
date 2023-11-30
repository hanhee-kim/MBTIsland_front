import { useState } from "react";
import { Link } from 'react-router-dom';
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

import style from "../../css/mbty/MbtyDetail.module.css";

function MbtyDetail() {
    const [board, setBoard] = useState(
        {
            num:1,
            mbti:"INTP",
            color:"#9BB7D4",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
            commentCount:2,
            likeCount:1,
            viewCount:23
        }
    );

    const [comments, setComments] = useState([
        {
            num:1,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        },
        {
            num:2,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"난앓아요",
            date:"1일전",
            content:"방귀뿡뿡"
        },
        {
            num:3,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"면발이억수로부드럽네",
            date:"1일전",
            content:"쌀국수 뚝배기!면발이 억수로 부드럽네 한 뚝배기 하실래예?"
        },
        {
            num:4,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"억장이문어찜",
            date:"1일전",
            content:"내공냠냠"
        },
        {
            num:5,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"빵빵이",
            date:"1일전",
            content:"옥지얌"
        }
    ]);
    
    // 페이징 상태 값
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    // 댓글 상태 값
    const [comment, setComment] = useState({num:"", mbti:"", writer:"", date:"", content:""});

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

    // pageChange 함수를 호출한 페이징 영역에서 페이징 항목(1, 2, 3...)들을 인자로 받아옴
    const pageChange = (repage) => {
        reqBoardList(repage);
    };

    // url에 파라미터로 줄 변수 repage
    const reqBoardList = (repage) => {
        // if(!repage) repage = 1;
        axios.get(`http://localhost:8090/mbty/${repage}`)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.commentList;

            setComments([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});
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

    const handleToggle = () => {
        setOpen(!open);
    };

    const submit=(e)=> {

        e.preventDefault();
    };

    const dropDownStyle = {
        display:"flex",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
    }

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray",
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
            <div className={style.sectionPageHeader}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>ISTP</h1>
                </div>

                <div>
                    {/* 게시글 영역 */}
                    <div key={board.num} className={style.sectionBoard}>
                        <Link to={"/detailform/only-detail/" + board.num}></Link>
                        <div className={style.boardWriter}>
                            <div>
                                <div className={style.circleDiv} style={{backgroundColor:`${board.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                {board.mbti}&nbsp;&nbsp;&nbsp;
                                {board.writer}
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
                                    <img className={style.dropDownImg} src="/popover-icon.png"></img>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>신고</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                        <div className={style.boardDate}>
                            {board.date}
                            <img className={style.viewIcon}src="/view-icon.png"></img>
                            {board.viewCount}
                        </div>
                        <div className={style.boardContent}>
                            {board.content}
                        </div>
                        <div className={style.boardLower}>
                            <div className={style.bookmarkDiv}>
                                <img src="/bookmark.png"></img>&nbsp;
                            </div>
                            <div className={style.thumbDiv}>
                                <img src="/thumbIcon.png"></img>&nbsp;
                                추천&nbsp;
                                {board.likeCount}
                            </div>
                            <div className={style.listDiv}>
                                <Button style={buttonStyle}>목록</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.commentCountDiv}>
                        <div>
                            댓글&nbsp;
                            {board.commentCount}
                        </div>
                    </div>

                    
                    {/* 댓글 영역 */}
                    <div>
                        {/* 댓글 목록 */}
                        {comments.length !== 0 && comments.map(comment => {
                            return (
                                <div key={comment.num} className={style.sectionComment}>
                                    <Link to={"/detailform/only-detail/" + comment.num}></Link>
                                    <div className={style.boardWriter}>
                                        <div>
                                            <div className={style.circleDiv} style={{backgroundColor:`${comment.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                            {comment.mbti}&nbsp;&nbsp;&nbsp;
                                            {comment.writer}
                                        </div>
                                        
                                        {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                            <DropdownToggle style={dropDownStyle}>
                                                <img className={style.dropDownImg} src="/popover-icon.png"></img>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>삭제</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> */}
                                        <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                        <DropdownToggle style={dropDownStyle}>
                                                <img className={style.dropDownImg} src="/popover-icon.png"></img>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>답글</DropdownItem>
                                                <DropdownItem>신고</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                    <div className={style.boardContent}>
                                        {comment.content}
                                    </div>
                                    <div className={style.boardDate}>
                                        {comment.date}
                                    </div>
                                </div>
                            )
                        })}

                        {/* 페이징 영역 */}
                        <Pagination aria-label="Page navigation example" className={style.pagingLabel}>
                            {
                                pageInfo.curPage===1?
                                <PaginationItem disabled>
                                    <PaginationLink previous href="#" />
                                </PaginationItem>:
                                <PaginationItem>
                                    {/* <PaginationLink previous href={"/list/" + (pageInfo.curPage - 1)} /> */}
                                    <PaginationLink previous onClick={()=>pageChange(pageInfo.curPage-1)}/>
                                </PaginationItem>
                            }

                            {                   
                                pageBtn.map(item=>{
                                    return(
                                        <PaginationItem key={item} className={item===pageInfo.curPage? 'active':''}>
                                            {/* <PaginationLink href={"/list/" + item}> */}
                                            {/* 고유한 id를 넘겨줌 */}
                                            <PaginationLink onClick={() => pageChange(item)}>
                                                {item}
                                            </PaginationLink>
                                        </PaginationItem>                            
                                    )
                                })
                            }

                            {
                                <PaginationItem disabled={pageInfo.curPage === pageInfo.endPage}>
                                    {/* <PaginationLink next href={"/list/" + (pageInfo.curPage + 1)}/> */}
                                    <PaginationLink next onClick={()=>pageChange(pageInfo.curPage+1)}/>
                                </PaginationItem>
                            }
                        </Pagination>

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
                            <div className={style.replySection}>
                                <img className={style.replyArrowImg} src="/replyArrow.png"></img>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MbtyDetail;
