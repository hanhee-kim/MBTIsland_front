import { useState } from "react";
import { Link } from 'react-router-dom';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
    } from "reactstrap";
import Swal from "sweetalert2";
import axios from 'axios';

import style from "../../css/mbty/MbtyDetail.module.css";

function MbtyDetail() {
    const [board, setBoard] = useState(
        {
            num:1,
            mbti:"INTP",
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
            mbti:"INTP",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        },
        {
            num:2,
            mbti:"INTP",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        },
        {
            num:3,
            mbti:"INTP",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        },
        {
            num:4,
            mbti:"INTP",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        },
        {
            num:5,
            mbti:"INTP",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
        }
    ]);

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const submit=(e)=> {

        e.preventDefault();
    };

    const popOverStyle = {
        display:"flex",
        marginLeft:"500px",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
    }

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray",
    }

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionPageHeader}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>ISTP</h1>
                </div>

                {/* 게시글 영역*/}
                <div>
                    <div key={board.num} className={style.sectionBoard}>
                        <Link to={"/detailform/only-detail/" + board.num}></Link>
                        <div className={style.boardWriter}>
                            <div style={{backgroundColor:"#9BB7D4"}}> </div>&nbsp;&nbsp;&nbsp;
                            {board.mbti}&nbsp;&nbsp;&nbsp;
                            {board.writer}
                            <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                <DropdownToggle style={popOverStyle}>
                                    <img className={style.popOverImg} src="/popover-icon.png"></img>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>수정</DropdownItem>
                                    <DropdownItem>삭제</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                <DropdownToggle style={popOverStyle}>
                                    <img className={style.popOverImg} src="/popover-icon.png"></img>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>신고</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown> */}
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
                    <div className={style.sectionComments}>
                        <div>
                            댓글&nbsp;
                            {board.commentCount}
                        </div>
                    </div>

                    {/* 댓글 영역 */}
                    <div>
                        <div className={style.sectionComments}>
                            {comments.length !== 0 && comments.map(comment => {
                                return (
                                    <div key={comment.num} className={style.sectionComment}>
                                        <Link to={"/detailform/only-detail/" + comment.num}></Link>
                                        <div className={style.boardWriter}>
                                            <div style={{backgroundColor:"#9BB7D4"}}> </div>&nbsp;&nbsp;&nbsp;
                                            {comment.mbti}&nbsp;&nbsp;&nbsp;
                                            {comment.writer}
                                            <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                                <DropdownToggle style={popOverStyle}>
                                                    <img className={style.popOverImg} src="/popover-icon.png"></img>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>삭제</DropdownItem>
                                                </DropdownMenu>
                                            </ButtonDropdown>
                                            {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                                <DropdownToggle style={popOverStyle}>
                                                    <img className={style.popOverImg} src="/popover-icon.png"></img>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>답글</DropdownItem>
                                                    <DropdownItem>신고</DropdownItem>
                                                </DropdownMenu>
                                            </ButtonDropdown> */}
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
                        </div><br/><br/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MbtyDetail;
