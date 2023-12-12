import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
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

    // 인기 게시글 더미 데이터
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
    // const [mbtwhyCnt, setMbtwhyCnt] = useState(0);

    // URL 파라미터
    // MBTI 유형, 페이지 번호, 정렬 옵션, 검색 값
    const {mbti} = useParams();
    console.log(mbti);
    // const formatMbti = mbti.startsWith(':') ? mbti.substring(1) : mbti;
    // const formatPage = page.startsWith(':') ? page.substring(1) : page;
    // const formatSort = sort.startsWith(':') ? sort.substring(1) : sort;
    // const formatSearch = search.startsWith(':') ? search.substring(1) : search;

    // const [mbti, setMbti] = useState(mbtiType);
    // console.log(mbti);

    // 페이징 상태 값
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});

    // 검색 값
    const [search, setSearch] = useState('');

    // 임시 검색 값
    const [tmpSearch, setTmpSearch] = useState(null);

    // 정렬 값
    const [sort, setSort] = useState("new");
    
    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

    // navigate
    const navigate = useNavigate();

    // 우측 MBTI 탭 변경
    const goMbtwhy = (mbti) => {
        const url = `/mbtwhy/${mbti}`;
        navigate(url);
    }

    // mbtwhydetail 이동
    const goMbtwhyDetail = (no) => {
        let defaultUrl = `/mbtwhydetail`;
        if(mbti !== null) defaultUrl += `/${mbti}`;
        if(page !== null) defaultUrl += `/${page}`;
        if(search) defaultUrl += `/${search}`;
        if(sort !== null) defaultUrl += `/${sort}`;
        if(no !== null) defaultUrl += `/${no}`;

        navigate(defaultUrl);
    }
    
    // url에 파라미터로 줄 변수 repage
    const getMbtwhyList = (pageNo, searchValue, sortType) => {
        console.log(sortType);
        let defaultUrl = `http://localhost:8090/mbtwhy?mbti=${mbti}`;
        if(page !== null) defaultUrl += `&page=${pageNo}`;
        if(search !== null) defaultUrl += `&search=${searchValue}`;
        if(sort !== null) defaultUrl += `&sort=${sortType}`;

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.mbtwhyList;
            // let mbtwhyCnt = res.data.mbtwhyCnt;

            setMbtwhyList([...list]);
            setPageInfo({...pageInfo});
            // setMbtwhyCnt(mbtwhyCnt);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
        })
        .catch(err=> {
            console.log(err);
            setMbtwhyList([]);
            setPageInfo({});
            // setMbtwhyCnt(0);
        })
    };

    // 의존성 배열에 mbti 추가
    // 의존성 배열 안에 추가된 변수가 변경될 때, useEffect 콜백 실행
    useEffect(() => {
        getMbtwhyList(page, search, sort);
    }, [mbti]);

    // 검색값 탐지
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };

    // 검색
    const handleSearch = () => {
        setSearch(tmpSearch);
        
        console.log(tmpSearch);
        getMbtwhyList(page, tmpSearch, sort);
    };

    // page 핸들링
    const handlePage = (pageNo) => {
        setPage(pageNo);
        getMbtwhyList(pageNo, search, sort);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // sort 핸들링
    const handleSort = (sortType) => {
        setSort(sortType);
        setOpen(!open);
        getMbtwhyList(page, search, sortType);
        // getMbtwhyList();
    }

    // Toggle 핸들링
    const handleToggle = () => {
        setOpen(!open);
    };

    // 페이지네이션
    const PaginationInside = () => {
        const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
        for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
            pageGroup.push(
                <span key={i} className={`${page===i? style.activePage: ''}`} onClick={()=>handlePage(i)}>{i}</span>
            )
        }
        return (
            <div className={style.paging}>
                {!(pageInfo.startPage===1) && (
                    <>
                        <span onClick={()=>handlePage(1)}>≪</span>
                        <span onClick={()=>handlePage(pageInfo.startPage-10)}>&lt;</span>
                    </>
                )}
                {pageGroup}
                {!(pageInfo.endPage===pageInfo.allPage) && (
                    <>
                        <span onClick={()=>handlePage(pageInfo.endPage+1)}>&gt;</span>
                        <span onClick={()=>handlePage(pageInfo.allPage)}>≫</span>
                    </>
                )}
            </div>
        );
    }

    const sortStyle = {
        margin:"0 auto",
        border:"none",
        boxShadow:"none",
        background:"white",
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
                    <button onClick={()=>setOpen(!open)} id="Popover1" style={buttonStyle}><img src={"/sortIcon.png" } alt="" className={style.sortIcon} /></button>
                    <Popover placement="bottom" isOpen={open} target="Popover1" toggle={()=>handleToggle()}>
                        <PopoverBody className={style.popoverItem} onClick={()=>handleSort("new")}>최신순</PopoverBody>
                        <PopoverBody className={style.popoverItem} onClick={()=>handleSort("view")}>조회순</PopoverBody>
                        <PopoverBody className={style.popoverItem} onClick={()=>handleSort("recommend")}>추천순</PopoverBody>
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
                            <div className={style.sectionBoard} key={mbtwhy.no} onClick={()=>goMbtwhyDetail(mbtwhy.no)}>
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
                        )
                    })}
                </div>

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
                        <Button style={buttonStyle} onClick={()=>handleSearch()}>검색</Button>
                    </Col>
                </FormGroup>
            </div>

            {/* 우측 사이드 영역 */}
            <div className={style.container}>
                <div className={style.sectionSide}>
                    {/* <div style={{backgroundColor:"#ADB1B0"}} onClick={handleMbti}><h5>ISTJ</h5></div> */}
                    <div style={{backgroundColor:"#ADB1B0"}} onClick={()=>goMbtwhy("istj")}><h5>ISTJ</h5></div>
                    <div style={{backgroundColor:"#F2DCB3"}} onClick={()=>goMbtwhy("isfj")}><h5>ISFJ</h5></div>
                    <div style={{backgroundColor:"#EAEFF9"}} onClick={()=>goMbtwhy("infj")}><h5>INFJ</h5></div>
                    <div style={{backgroundColor:"#D8D4EA"}} onClick={()=>goMbtwhy("intj")}><h5>INTJ</h5></div>
                    <div style={{backgroundColor:"#4D6879"}} onClick={()=>goMbtwhy("istp")}><h5>ISTP</h5></div>
                    <div style={{backgroundColor:"#BDC9A6"}} onClick={()=>goMbtwhy("isfp")}><h5>ISFP</h5></div>
                    <div style={{backgroundColor:"#648181"}} onClick={()=>goMbtwhy("infp")}><h5>INFP</h5></div>
                    <div style={{backgroundColor:"#9BB7D4"}} onClick={()=>goMbtwhy("intp")}><h5>INTP</h5></div>
                    <div style={{backgroundColor:"#D8927A"}} onClick={()=>goMbtwhy("estp")}><h5>ESTP</h5></div>
                    <div style={{backgroundColor:"#F0A4AB"}} onClick={()=>goMbtwhy("esfp")}><h5>ESFP</h5></div>
                    <div style={{backgroundColor:"#FFD966"}} onClick={()=>goMbtwhy("enfp")}><h5>ENFP</h5></div>
                    <div style={{backgroundColor:"#B6634A"}} onClick={()=>goMbtwhy("entp")}><h5>ENTP</h5></div>
                    <div style={{backgroundColor:"#596D55"}} onClick={()=>goMbtwhy("estj")}><h5>ESTJ</h5></div>
                    <div style={{backgroundColor:"#E6D0CE"}} onClick={()=>goMbtwhy("esfj")}><h5>ESFJ</h5></div>
                    <div style={{backgroundColor:"#82B8AD"}} onClick={()=>goMbtwhy("enfj")}><h5>ENFJ</h5></div>
                    <div style={{backgroundColor:"#35598F"}} onClick={()=>goMbtwhy("entj")}><h5>ENTJ</h5></div>
                </div>
            </div>
        </div>
    );
}

export default Mbtwhy;
