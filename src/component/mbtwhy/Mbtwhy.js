import { useEffect, useState } from "react";
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

import style from "../../css/mbtwhy/Mbtwhy.module.css";

function Mbtwhy() {

    const [hotMbtwhy, setHotMbtwhy] = useState(
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

    useEffect(() => {
        getMbtwhyList(1, search)
    }, []);

    // Mbtwhy 게시글 목록
    const [mbtwhyList, setMbtwhyList] = useState([]);

    // Mbtwhy 게시글 수
    const [mbtwhyCnt, setMbtwhyCnt] = useState(0);

    // mbti 유형
    const [mbti, setMbti] = useState('istj');
    
    // 페이징 상태 값
    const [page, setPage] = useState([1]);
    const [pageInfo, setPageInfo] = useState({});

    // 검색 값
    const [search, setSearch] = useState(null);

    // 임시 검색 값
    const [tmpSearch, setTmpSearch] = useState(null);

    // 정렬 값
    const [sort, setSort] = useState(null);

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('최신순'); // 기본 선택값

    const handleToggle = () => {
        setOpen(!open);
    };
    
    const handleSelect = (option) => {
        setSelectedOption(option);
        setOpen(false);
    };
    
    // url에 파라미터로 줄 변수 repage
    const getMbtwhyList = (page, search) => {
        let defaultUrl = `http://localhost:8090/mbtwhy?mbti=${mbti}`;
        if(page !== null) defaultUrl += `&page=${page}`;
        if(search !== null) defaultUrl += `&search=${search}`;
        if(sort !== null) defaultUrl += `&sort=${sort}`;

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.mbtwhyList;
            let mbtwhyCnt = res.data.mbtwhyCnt;

            console.log(list);
            setMbtwhyList([...list]);
            setPageInfo({...pageInfo});
            setMbtwhyCnt(mbtwhyCnt);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPage(btn);
            setPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
        })
    };

    const searchSubmit = () => {
        getMbtwhyList(1, search);
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };

    const handleSearch = () => {
        setSearch(tmpSearch);
        console.log(tmpSearch);
        getMbtwhyList(1, tmpSearch);
    }

    const handlePageNo = (pageNo) => {
        setPage(pageNo);
        console.log('현재 적용되는 검색어: ' + search);
        getMbtwhyList(pageNo, search); // setPage(pageNo)는 업데이트가 지연되기 때문에, state인 page가 아니라 전달인자 pageNo로 요청해야함
    };

    // 페이지네이션
    const PaginationInside = () => {
        // if(errorMsg) return null;
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${page===i? style.activePage: ''}`} onClick={()=>handlePageNo(i)}>{i}</span>
            )
        }
        return (
            <div className={style.paging}>
                {!(pageInfo.startPage===1) && (
                    <>
                        <span onClick={()=>handlePageNo(1)}>≪</span>
                        <span onClick={()=>handlePageNo(pageInfo.startPage-10)}>&lt;</span>
                    </>
                )}
                {pageGroup}
                {!(pageInfo.endPage===pageInfo.allPage) && (
                    <>
                        <span onClick={()=>handlePageNo(pageInfo.endPage+1)}>&gt;</span>
                        <span onClick={()=>handlePageNo(pageInfo.allPage)}>≫</span>
                    </>
                )}
            </div>
        );
    }

    const sortStyle = {
        margin:"0 auto",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
        color:"black",
        fontWeight:"bold"
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
                            <img className={style.sortImg} src="/sortIcon.png" alt=""></img>
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
                    <Link to={"/detailform/only-detail/" + hotMbtwhy.num} style={{textDecoration:"none"}}>
                        <div key={hotMbtwhy.num} className={style.sectionBoard}>
                            <div className={style.hotTag}>
                                &#128293;HOT
                            </div>
                            <div className={style.boardWriter}>
                                <div style={{backgroundColor:`${hotMbtwhy.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                {hotMbtwhy.mbti}&nbsp;&nbsp;&nbsp;
                                {hotMbtwhy.writer}
                            </div>
                            <div className={style.boardDate}>
                                {hotMbtwhy.date}
                            </div>
                            <div className={style.boardContent}>
                                {hotMbtwhy.content}
                            </div>
                            <div className={style.boardLow}>
                                <div>
                                    <img src="/commentIcon.png" alt=""></img>
                                    {hotMbtwhy.commentCount}
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                    <img src="/thumbIcon.png" alt=""></img>
                                    {hotMbtwhy.likeCount}
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                    <img src="/viewIcon.png" alt=""></img>
                                    {hotMbtwhy.viewCount}
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {mbtwhyList.length !== 0 && mbtwhyList.map(mbtwhy => {
                        return (
                            <Link to={"/detailform/only-detail/" + mbtwhy.num} style={{textDecoration:"none"}}>
                                <div key={mbtwhy.no} className={style.sectionBoard}>
                                    <div className={style.boardWriter}>
                                    <div style={{backgroundColor:`${mbtwhy.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                        {mbtwhy.mbtiCategory}&nbsp;&nbsp;&nbsp;
                                        {mbtwhy.writerNickname}
                                    </div>
                                    <div className={style.boardDate}>
                                        {mbtwhy.writeDate}
                                    </div>
                                    <div className={style.boardContent}>
                                        {mbtwhy.content}
                                    </div>
                                    <div className={style.boardLow}>
                                        <div>
                                            <img src="/commentIcon.png" alt=""></img>
                                            {/* {mbtwhy.commentCount} */}
                                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div>
                                            <img src="/thumbIcon.png" alt=""></img>
                                            {mbtwhy.recommendCnt}
                                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div>
                                            <img src="/viewIcon.png" alt=""></img>
                                            {mbtwhy.viewCnt}
                                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div><br/><br/>

                {/* 페이징 영역 */}
                {PaginationInside()}

                {/* 검색 영역 */}
                <FormGroup row className={style.sectionSearch}>
                    <Col sm={3}>
                        <Input type='select' name="type">
                            <option value='content'>내용</option>
                            <option value='comment'>댓글</option>
                            <option value='content&comment'>내용 + 댓글</option>
                            <option value='writer'>작성자</option>
                        </Input>
                    </Col>
                    <Col sm={6}>
                        <Input type="text" onChange={handleSearchChange}/>
                    </Col>
                    <Col sm={3}>
                        <Button style={buttonStyle} onClick={handleSearch}>검색</Button>
                    </Col>
                </FormGroup>
            </div>

            {/* 우측 사이드 영역 */}
            <div className={style.container}>
                <div className={style.sectionSide}>
                    <div style={{backgroundColor:"#ADB1B0"}}><Link to="/mbtwhy/istj" style={linkStyle}><h5>ISTJ</h5></Link></div>
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

export default Mbtwhy;
