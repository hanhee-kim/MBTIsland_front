import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
    FormGroup,
    Col,
    Input,
    Button,
    Popover,
    PopoverBody } from "reactstrap";
import axios from 'axios';

import style from "../../css/mbtwhy/Mbtwhy.module.css";

function Mbtwhy() {

    const [hotMbtwhy, setHotMbtwhy] = useState(
        {
            no:1,
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

    // Mbtwhy 게시글 목록
    const [mbtwhyList, setMbtwhyList] = useState([]);

    // Mbtwhy 게시글 수
    const [mbtwhyCnt, setMbtwhyCnt] = useState(0);

    // useLocation
    const location = useLocation(); // 훅 사용하여 현재 위치 정보 가져옴
    const queryParams = new URLSearchParams(location.search); // URL에서 쿼리 문자열을 객체로 파싱

    // mbti 값
    const mbtiValue = queryParams.get('mbti');
    const [mbti, setMbti] = useState(mbtiValue);

    // 페이징 상태 값
    const pageValue = queryParams.get('page');
    const [page, setPage] = useState(pageValue);
    const [pageInfo, setPageInfo] = useState({});

    // 검색 값
    const [search, setSearch] = useState(null);


    // 임시 검색 값
    const [tmpSearch, setTmpSearch] = useState(null);


    // 정렬 값
    const sortValue = queryParams.get('sort');
    const [sort, setSort] = useState(sortValue);

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('최신순'); // 기본 선택값
    
    // url에 파라미터로 줄 변수 repage
    const getMbtwhyList = (mbti, page, search, sort) => {
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

            setMbtwhyList([...list]);
            setPageInfo({...pageInfo});
            setMbtwhyCnt(mbtwhyCnt);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPage(page);
            setPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
            setMbtwhyCnt(0);
            setPageInfo({});
            setMbtwhyList([]);
        })
    };

    useEffect(() => {
        console.log("유즈 이펙트! page는 " + page + ", mbti는 " + mbti);
        getMbtwhyList(mbti, page, search, sort);
    }, []);

    const searchSubmit = () => {
        getMbtwhyList(mbti, 1, search);
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };

    const handleSearch = () => {
        setSearch(tmpSearch);
        console.log(tmpSearch);
        getMbtwhyList(mbti, 1, tmpSearch, sort);
    }



    // mbti 핸들링
    const handleMbti = (mbtiCategory) => {
        setMbti(mbtiCategory);

        console.log('현재 적용되는 검색어: ' + search);
        console.log('현재 적용되는 정렬 옵션: ' + sort);
        getMbtwhyList(mbtiCategory, 1, search, sort);
    }

    // page 핸들링
    const handlePageNo = (pageNo) => {
        setPage(pageNo);

        console.log('현재 적용되는 mbti: ' + mbti);
        console.log('현재 적용되는 검색어: ' + search);
        getMbtwhyList(mbti, pageNo, search, sort); // setPage(pageNo)는 업데이트가 지연되기 때문에, state인 page가 아니라 전달인자 pageNo로 요청해야함
    };

    // Toggle 핸들링
    const handleToggle = () => {
        setOpen(!open);
    };

    // sort 핸들링
    const handleSort = (sortType) => {
        setSort(sortType);
        setOpen(false);
        console.log(page);

        console.log('현재 적용되는 mbti: ' + mbti);
        console.log('현재 적용되는 검색어: ' + search);
        getMbtwhyList(mbti, page, search, sort);
    }

    // 페이지네이션
    const PaginationInside = () => {
        // if(errorMsg) return null;
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${page===i? style.activePage: ''}`}><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + i + "&sort=" + sort} style={linkStyle} onClick={()=>handlePageNo(i)}>{i}</Link></span>
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
                    <h1>{mbti}</h1>
                    <h6>글 작성</h6>
                    {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                        <DropdownToggle style={sortStyle}>
                            <img className={style.sortImg} src="/sortIcon.png" alt=""></img>
                            {sort}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + page + "?sort=new"} style={linkStyle} onClick={() => handleSort('new')}>최신순</Link></DropdownItem>
                            <DropdownItem><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + page + "?sort=view"} style={linkStyle} onClick={() => handleSort('view')}>조회순</Link></DropdownItem>
                            <DropdownItem><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + page + "?sort=recommend"} style={linkStyle} onClick={() => handleSort('recommend')}>추천순</Link></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown> */}

                    <button onClick={()=>setOpen(!open)} id="Popover1" className={style.button}><img src={"/sortIcon.png" } alt="" className={style.sortIcon} /></button>
                    <Popover placement="bottom" isOpen={open} target="Popover1" toggle={handleToggle}>
                        <PopoverBody className={style.popoverItem}><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + page + "&sort=new"} style={linkStyle} onClick={() => handleSort('new')}>최신순</Link></PopoverBody>
                        <PopoverBody className={style.popoverItem}><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + page + "&sort=view"} style={linkStyle} onClick={() => handleSort('view')}>조회순</Link></PopoverBody>
                        <PopoverBody className={style.popoverItem}><Link to={"/mbtwhy?mbti=" + mbti + "&page=" + page + "&sort=recommend"} style={linkStyle} onClick={() => handleSort('recommend')}>추천순</Link></PopoverBody>
                    </Popover>
                    
                </div>

                {/* 인기 게시글 영역 */}
                <div className={style.sectionBoards}>
                    <Link to={"/mbtwhydetail"} style={{textDecoration:"none"}}>
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
                            // <Link key={mbtwhy.no} to={"/mbtwhydetail?mbti=" + mbti + "&page=" + page + "&search=" + search + "&sort=" + sort + "&no=" + mbtwhy.no + "&commentPage=1"} style={{textDecoration:"none"}}>
                                <Link key={mbtwhy.no} to={"/mbtwhydetail?&no=" + mbtwhy.no + "&commentPage=1"} style={{textDecoration:"none"}}>
                                <div className={style.sectionBoard}>
                                    <div className={style.boardWriter}>
                                    <div style={{backgroundColor:`${mbtwhy.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                                        {mbtwhy.writerMbti}&nbsp;&nbsp;&nbsp;
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
                        <Input type="text"/>
                    </Col>
                    <Col sm={3}>
                        <Button style={buttonStyle} onClick={handleSearch}>검색</Button>
                    </Col>
                </FormGroup>
            </div>

            {/* 우측 사이드 영역 */}
            <div className={style.container}>
                <div className={style.sectionSide}>
                    {/* <div style={{backgroundColor:"#ADB1B0"}} onClick={handleMbti}><h5>ISTJ</h5></div> */}
                    <div style={{backgroundColor:"#ADB1B0"}}><Link to={"/mbtwhy?mbti=istj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('istj')}><h5>ISTJ</h5></Link></div>
                    <div style={{backgroundColor:"#F2DCB3"}}><Link to={"/mbtwhy?mbti=isfj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('isfj')}><h5>ISFJ</h5></Link></div>
                    <div style={{backgroundColor:"#EAEFF9"}}><Link to={"/mbtwhy?mbti=infj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('infj')}><h5>INFJ</h5></Link></div>
                    <div style={{backgroundColor:"#D8D4EA"}}><Link to={"/mbtwhy?mbti=intj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('intj')}><h5>INTJ</h5></Link></div>
                    <div style={{backgroundColor:"#4D6879"}}><Link to={"/mbtwhy?mbti=istp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('istp')}><h5>ISTP</h5></Link></div>
                    <div style={{backgroundColor:"#BDC9A6"}}><Link to={"/mbtwhy?mbti=isfp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('isfp')}><h5>ISFP</h5></Link></div>
                    <div style={{backgroundColor:"#648181"}}><Link to={"/mbtwhy?mbti=infp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('infp')}><h5>INFP</h5></Link></div>
                    <div style={{backgroundColor:"#9BB7D4"}}><Link to={"/mbtwhy?mbti=intp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('intp')}><h5>INTP</h5></Link></div>
                    <div style={{backgroundColor:"#D8927A"}}><Link to={"/mbtwhy?mbti=estp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('estp')}><h5>ESTP</h5></Link></div>
                    <div style={{backgroundColor:"#F0A4AB"}}><Link to={"/mbtwhy?mbti=esfp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('esfp')}><h5>ESFP</h5></Link></div>
                    <div style={{backgroundColor:"#FFD966"}}><Link to={"/mbtwhy?mbti=enfp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('enfp')}><h5>ENFP</h5></Link></div>
                    <div style={{backgroundColor:"#B6634A"}}><Link to={"/mbtwhy?mbti=entp&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('entp')}><h5>ENTP</h5></Link></div>
                    <div style={{backgroundColor:"#596D55"}}><Link to={"/mbtwhy?mbti=estj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('estj')}><h5>ESTJ</h5></Link></div>
                    <div style={{backgroundColor:"#E6D0CE"}}><Link to={"/mbtwhy?mbti=esfj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('esfj')}><h5>ESFJ</h5></Link></div>
                    <div style={{backgroundColor:"#82B8AD"}}><Link to={"/mbtwhy?mbti=enfj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('enfj')}><h5>ENFJ</h5></Link></div>
                    <div style={{backgroundColor:"#35598F"}}><Link to={"/mbtwhy?mbti=entj&page=1&sort=" + sort} style={linkStyle} onClick={()=>handleMbti('entj')}><h5>ENTJ</h5></Link></div>
                </div>
            </div>
        </div>
    );
}

export default Mbtwhy;
