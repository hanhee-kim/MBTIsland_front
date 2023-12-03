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
    FormGroup,
    Col,
    Input,
    Button } from "reactstrap";
import axios from 'axios';

import style from "../../css/mbattle/MBattle.module.css";

function MBattle() {

    const [boards, setBoard] = useState([
        {
            num:1,
            title:"깻잎 떼주는 남친",
            voteCount:12
        },
        {
            num:2,
            title:"똥맛 카레 vs 카레맛 똥",
            voteCount:25
        },
        {
            num:3,
            title:"탕수육 부먹 or 찍먹",
            voteCount:43
        },        
        {
            num:4,
            title:"퇴사 고?",
            voteCount:27
        }
    ]);

    const [hotBoards, setHotBoards] = useState([
        {
            num:1,
            title:"탕수육 부먹 or 찍먹",
            voteCount:43
        },
        {
            num:2,
            title:"퇴사 고?",
            voteCount:27
        }
    ]);

    // 페이징 상태 값
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('최신순'); // 기본 선택값

    // 검색이 되었는지 여부
    // 검색되면 true로
    const [isSearch, setIsSearch] = useState(false);

    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleToggle = () => {
        setOpen(!open);
    };
    
    const handleSelect = (option) => {
        setSelectedOption(option);
        setOpen(false);
    };

    // pageChange 함수를 호출한 페이징 영역에서 페이징 항목(1, 2, 3...)들을 인자로 받아옴
    const pageChange = (repage) => {
        // 검색되었다면 (isSearch가 true인 경우)
        if(isSearch) reqBoardSearch(repage);
        // 검색되지 않았다면 (isSearch가 false인 경우)
        else reqBoardList(repage);
    };
    
    // url에 파라미터로 줄 변수 repage
    const reqBoardList = (repage) => {
        // if(!repage) repage = 1;
        axios.get(`http://localhost:8090/mbattle/${repage}`)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;

            setBoard([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});

            // 검색이 아닌, 페이징된 상태이므로
            // 검색 여부를 위한 isSearch 변수를 false로
            setIsSearch(false);
        })
        .catch(err=> {
            console.log(err);
        })
    };

    const searchSubmit = () => {
        reqBoardSearch(1);
    };

    // 페이지 별 검색
    const reqBoardSearch = (repage) => {
        if(type==='') {
            alert('검색 타입을 선택하세요.');
            return;
        }

        axios.get(`http://localhost:8090/boardsearch/${repage}/${type}/${keyword}`)
        .then(res=> {
            console.log(res);

            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;

            setBoard([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});

            // 검색이 아닌, 페이징된 상태이므로
            // 검색 여부를 위한 isSearch 변수를 false로
            setIsSearch(true);
        })
        .catch(err=> {
            console.log(err);
        });
    };

    const sortStyle = {
        width:"15%",
        margin:"0 auto",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
        color:"black",
        fontWeight:"bold"
    }

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    }

    const boardVoteButton = {
        fontWeight:"bold",
        fontSize:"small",
        backgroundColor:"#1FAB70",
        lineHeight:"10px"
    }

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>M-Battle</h1>
                    <div className={style.pageHeaderLow}>
                        <div className={style.pageHeaderContent}>MBTI 유형 별 성향을 알아보세요!</div>
                        <div className={style.pageHeaderWriteBtn}>글 작성</div>
                        <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                            <DropdownToggle style={sortStyle}>
                                <img className={style.sortImg} src="/sortIcon.png" alt=""></img>
                                {selectedOption}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleSelect('최신순')}>최신순</DropdownItem>
                                <DropdownItem onClick={() => handleSelect('조회순')}>조회순</DropdownItem>
                                <DropdownItem onClick={() => handleSelect('투표순')}>투표순</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>

                </div>
                {/* 게시판 헤더 영역 */}

                {/* 인기 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {hotBoards.length !== 0 && hotBoards.map(hotBoard => {
                        return (
                            <div key={hotBoard.num} className={style.sectionBoard}>
                                <div className={style.boardImages}>
                                    <div>
                                        <img src="/thumbIcon.png" alt=""></img>
                                    </div>
                                    <div>
                                        <img src="/thumbIcon.png" alt=""></img>
                                    </div>
                                </div>
                                <div className={style.boardContents}>
                                    <Link to={"/detailform/only-detail/" + hotBoard.num} style={{textDecoration:"none"}}>
                                        <div className={style.boardTitle}>
                                            {hotBoard.title}
                                        </div>
                                        <div className={style.boardContentsLow}>
                                            <div className={style.boardVotedCount}>
                                                {hotBoard.voteCount}명 투표
                                                &#128293;
                                            </div>&nbsp;&nbsp;
                                            <div>
                                                <Button style={boardVoteButton}>투표하기</Button>
                                                {/* <Button>투표완료</Button> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* 인기 게시글 영역 */}

                {/* 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {boards.length !== 0 && boards.map(board => {
                        return (
                            <div key={board.num} className={style.sectionBoard}>
                                <div className={style.boardImages}>
                                    <div>
                                        <img src="/thumbIcon.png" alt=""></img>
                                    </div>
                                    <div>
                                        <img src="/thumbIcon.png" alt=""></img>
                                    </div>
                                </div>
                                <div className={style.boardContents}>
                                    <Link to={"/detailform/only-detail/" + board.num} style={{textDecoration:"none"}}>
                                        <div className={style.boardTitle}>
                                            주제:{board.title}
                                        </div>
                                        <div className={style.boardContentsLow}>
                                            <div className={style.boardVotedCount}>
                                                {board.voteCount}명 투표
                                            </div>&nbsp;&nbsp;
                                            <div>
                                                <Button style={boardVoteButton}>투표하기</Button>
                                                {/* <Button>투표완료</Button> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* 게시글 영역 */}

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
                {/* 페이징 영역 */}

                {/* 검색 영역 */}
                <FormGroup row className={style.sectionSearch}>
                    <Col sm={3}>
                        <Input type='select' name="type" onChange={(e)=>setType(e.target.value)}>
                            <option value='content'>제목</option>
                            <option value='comment'>내용</option>
                            <option value='content&comment'>제목 + 내용</option>
                            <option value='writer'>댓글</option>
                        </Input>
                    </Col>
                    <Col sm={6}>
                        <Input type="text" name="keyword" onChange={(e)=>setKeyword(e.target.value)}/>
                    </Col>
                    <Col sm={3}>
                        <Button style={buttonStyle} onClick={searchSubmit}>검색</Button>
                    </Col>
                </FormGroup>
                {/* 검색 영역 */}
            </div>
            {/* 중앙 영역 */}
        </div>
    );
}

export default MBattle;
