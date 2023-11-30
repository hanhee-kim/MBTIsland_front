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

import style from "../../css/mbty/Mbty.module.css";

function Mbty() {

    const [boards, setBoard] = useState([
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
        },
        {
            num:2,
            mbti:"INTP",
            color:"#9BB7D4",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
            commentCount:2,
            likeCount:1,
            viewCount:23
        },
        {
            num:3,
            mbti:"INTP",
            color:"#9BB7D4",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
            commentCount:2,
            likeCount:1,
            viewCount:23
        },
        {
            num:4,
            mbti:"INTP",
            color:"#9BB7D4",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
            commentCount:2,
            likeCount:1,
            viewCount:23
        },
        {
            num:5,
            mbti:"INTP",
            color:"#9BB7D4",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"ISTJ들은 ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.ISTJ들은 대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요.대체 왜 그러죠? 진짜 숨을 끊어버리고 싶어요. 이거 제가 잘못한 건가요? 저 인간 진짜",
            commentCount:2,
            likeCount:1,
            viewCount:23
        }
    ]);

    const [hotBoard, setHotBoard] = useState(
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
        axios.get(`http://localhost:8090/mbty/${repage}`)
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
    }

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
        margin:"0 auto",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
        color:"black"
    }
    
    const linkStyle = {
        cursor:"pointer",
        textDecoration: "none",color:"black"
    }

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    }

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionPageHeader}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>ISTP</h1>
                    <h6>글 작성</h6>
                    <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                        <DropdownToggle style={sortStyle}>
                            <img className={style.sortImg} src="/sortIcon.png"></img>
                            {selectedOption}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleSelect('최신순')}>최신순</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('조회순')}>조회순</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('추천순')}>추천순</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>

                {/* 인기 게시글 영역 */}
                <div className={style.sectionBoards}>
                    <div key={hotBoard.num} className={style.sectionBoard}>
                        <Link to={"/detailform/only-detail/" + hotBoard.num}></Link>
                        <div className={style.hotTag}>
                            &#128293;HOT
                        </div>
                        <div className={style.boardWriter}>
                            <div style={{backgroundColor:`${hotBoard.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                            {hotBoard.mbti}&nbsp;&nbsp;&nbsp;
                            {hotBoard.writer}
                        </div>
                        <div className={style.boardDate}>
                            {hotBoard.date}
                        </div>
                        <div className={style.boardContent}>
                            {hotBoard.content}
                        </div>
                        <div className={style.boardLower}>
                            <div>
                                <img src="/commentIcon.png"></img>
                                {hotBoard.commentCount}
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <img src="/thumbIcon.png"></img>
                                {hotBoard.likeCount}
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <img src="/view-icon.png"></img>
                                {hotBoard.viewCount}
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </div>

                {/* 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {boards.length !== 0 && boards.map(board => {
                        return (
                            <div key={board.num} className={style.sectionBoard}>
                                <Link to={"/detailform/only-detail/" + board.num}></Link>
                                <div className={style.boardWriter}>
                                <div style={{backgroundColor:`${board.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                    {board.mbti}&nbsp;&nbsp;&nbsp;
                                    {board.writer}
                                </div>
                                <div className={style.boardDate}>
                                    {board.date}
                                </div>
                                <div className={style.boardContent}>
                                    {board.content}
                                </div>
                                <div className={style.boardLower}>
                                    <div>
                                        <img src="/commentIcon.png"></img>
                                        {board.commentCount}
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>
                                        <img src="/thumbIcon.png"></img>
                                        {board.likeCount}
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>
                                        <img src="/view-icon.png"></img>
                                        {board.viewCount}
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        )
                    })}
                </div><br/><br/>

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

                {/* 검색 영역 */}
                <FormGroup row className={style.sectionSearch}>
                    <Col sm={3}>
                        <Input type='select' name="type" onChange={(e)=>setType(e.target.value)}>
                            <option value='content'>내용</option>
                            <option value='comment'>댓글</option>
                            <option value='content&comment'>내용 + 댓글</option>
                            <option value='writer'>작성자</option>
                        </Input>
                    </Col>
                    <Col sm={6}>
                        <Input type="text" name="keyword" onChange={(e)=>setKeyword(e.target.value)}/>
                    </Col>
                    <Col sm={3}>
                        <Button style={buttonStyle} onClick={searchSubmit}>검색</Button>
                    </Col>
                </FormGroup>
            </div>

            {/* 우측 사이드 영역 */}
            <div className={style.container}>
                <div className={style.sectionSide}>
                    <div style={{backgroundColor:"#ADB1B0"}}><Link to="/mbty/istj" style={linkStyle}><h5>ISTJ</h5></Link></div>
                    <div style={{backgroundColor:"#F2DCB3"}}><Link to="/isfj" style={linkStyle}><h5>ISFJ</h5></Link></div>
                    <div style={{backgroundColor:"#EAEFF9"}}><h5>INFJ</h5></div>
                    <div style={{backgroundColor:"#D8D4EA"}}><h5>INTJ</h5></div>
                    <div style={{backgroundColor:"#4D6879"}}><h5>ISTP</h5></div>
                    <div style={{backgroundColor:"#BDC9A6"}}><h5>ISFP</h5></div>
                    <div style={{backgroundColor:"#648181"}}><h5>INFP</h5></div>
                    <div style={{backgroundColor:"#9BB7D4"}}><h5>INTP</h5></div>
                    <div style={{backgroundColor:"#D8927A"}}><h5>ESTP</h5></div>
                    <div style={{backgroundColor:"#F0A4AB"}}><h5>ESFP</h5></div>
                    <div style={{backgroundColor:"#FFD966"}}><h5>ENFP</h5></div>
                    <div style={{backgroundColor:"#B6634A"}}><h5>ENTP</h5></div>
                    <div style={{backgroundColor:"#596D55"}}><h5>ESTJ</h5></div>
                    <div style={{backgroundColor:"#E6D0CE"}}><h5>ESFJ</h5></div>
                    <div style={{backgroundColor:"#82B8AD"}}><h5>ENFJ</h5></div>
                    <div style={{backgroundColor:"#35598F"}}><h5>ENTJ</h5></div>
                </div>
            </div>
        </div>
    );
}

export default Mbty;
