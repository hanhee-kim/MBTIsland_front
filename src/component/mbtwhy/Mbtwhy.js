import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    FormGroup,
    Col,
    Input,
    Button,
    Popover,
    PopoverBody } from "reactstrap";
import axios from 'axios';
import { urlroot } from "../../config";

import style from "../../css/mbtwhy/Mbtwhy.module.css";

function Mbtwhy() {
    // 로그인 유저 정보]
    const user = useSelector((state) => state.persistedReducer.user);

    // 인기 게시글
    const [hotMbtwhy, setHotMbtwhy] = useState({});

    // Mbtwhy 게시글 목록
    const [mbtwhyList, setMbtwhyList] = useState([]);

    // URL 파라미터
    // MBTI 유형, 페이지 번호, 정렬 옵션, 검색 값
    const {mbti} = useParams();

    // 페이징 상태 값
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});

    // 검색 값
    const [search, setSearch] = useState('');

    // 임시 검색 값
    const [tmpSearch, setTmpSearch] = useState(null);

    // 정렬 값
    const [sort, setSort] = useState("최신순");
    
    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

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
    }
    
    // navigate
    const navigate = useNavigate();

    // 우측 MBTI 탭 변경
    const goMbtwhy = (mbti) => {
        const url = `/mbtwhy/${mbti}`;
        navigate(url);
    }

    // mbtwhydetail 이동
    const goMbtwhyDetail = (no) => {
        let defaultUrl = `/mbtwhydetail/${no}/${mbti}`;

        navigate(defaultUrl);
    }

    // mbtwhywrite 이동
    const goMbtwhyWrite = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        let defaultUrl = `/mbtwhywrite`;
        if(mbti !== null) defaultUrl += `/${mbti}`;
        
        navigate(defaultUrl);
    };
    
    // 게시글 목록 조회
    const getMbtwhyList = (page, search, sort) => {
        let defaultUrl = `${urlroot}/mbtwhy?mbti=${mbti}&page=${page}`;
        if(search !== "") defaultUrl += `&search=${search}`;
        if(sort !== "") defaultUrl += `&sort=${sort}`;

        axios.get(defaultUrl)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let mbtwhyList = res.data.mbtwhyList;
            let hotMbtwhy = res.data.hotMbtwhy;
            // let mbtwhyCnt = res.data.mbtwhyCnt;

            setMbtwhyList([...mbtwhyList]);
            setHotMbtwhy({...hotMbtwhy});
            // setMbtwhyCnt(mbtwhyCnt);
            
            setPageInfo({...pageInfo});
            setPage(page);
        })
        .catch(err=> {
            console.log(err);
            // setMbtwhyList([]);
            // setHotMbtwhy({});
            // setPageInfo({});
            // setMbtwhyCnt(0);
        })
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

    // 팝오버 바깥 영역 클릭 감지
    useEffect(() => {
        clickOutsidePopover();
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    // 의존성 배열에 mbti 추가
    // 의존성 배열 안에 추가된 변수가 변경될 때, useEffect 콜백 실행
    useEffect(() => {
        const searchInput = document.getElementById("searchInput");
        searchInput.value = null;

        setMbtiColorTo();
        setPage(1);
        setSearch("");
        setSort("최신순");
        getMbtwhyList(1, "", "최신순");
    }, [mbti]);

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

    // 검색값 탐지
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setTmpSearch(searchTerm);
    };

    // 검색
    const handleSearch = () => {
        setSearch(tmpSearch);
        setPage(1);
        // 실 검색값은 search이지만
        // 검색은 tmpSearch
        getMbtwhyList(1, tmpSearch, sort);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // page 핸들링
    const handlePage = (pageNo) => {
        setPage(pageNo);
        getMbtwhyList(pageNo, search, sort);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 팝오버 sort 핸들링
    const handleSort = (sortType) => {
        setSort(sortType);
        setOpen(!open);
        getMbtwhyList(page, search, sortType);
        // getMbtwhyList();
    };

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
    };

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    };

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionPageHeader}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader} style={{borderColor:`${mbtiColor}`}}>
                    <h1>{mbti}</h1>
                    <div style={{display:"flex"}}>
                        <div className={style.pageHeaderWriteBtn} onClick={()=>goMbtwhyWrite()}>글 작성</div>
                        <button className={style.popoverButton} onClick={()=>setOpen(!open)} id="Popover1"><img src={"/sortIcon.png" } alt="" className={style.sortImg} />{!sort? "최신순" : sort}</button>
                        <Popover placement="bottom" isOpen={open} target="Popover1" toggle={()=>handleToggle()}>
                            <PopoverBody className={style.popoverItem} onClick={()=>handleSort("최신순")}>최신순</PopoverBody>
                            <PopoverBody className={style.popoverItem} onClick={()=>handleSort("조회순")}>조회순</PopoverBody>
                            <PopoverBody className={style.popoverItem} onClick={()=>handleSort("추천순")}>추천순</PopoverBody>
                        </Popover>
                    </div>
                </div>

                {/* 일간 인기 게시글 영역 */}
                {hotMbtwhy.no?
                    <div className={style.sectionBoards}>
                        <div key={hotMbtwhy.no} className={style.sectionBoard} onClick={()=>goMbtwhyDetail(hotMbtwhy.no)}>
                            <div className={style.hotTag}>
                                &#128293;HOT
                            </div>
                            <div className={style.boardWriter}>
                                <div style={{backgroundColor:`${hotMbtwhy.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                                {hotMbtwhy.writerMbti}&nbsp;&nbsp;&nbsp;
                                {hotMbtwhy.writerNickname}
                            </div>
                            <div className={style.boardDate}>
                                {formatDatetimeGap(hotMbtwhy.writeDate)}
                            </div>
                            <div className={style.boardContent}>
                                {hotMbtwhy.content}
                            </div>
                            <div className={style.boardLow}>
                                <div>
                                    <img src="/commentIcon.png" alt=""></img>
                                    {hotMbtwhy.commentCnt}
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                    <img src="/thumbIcon.png" alt=""></img>
                                    {hotMbtwhy.recommendCnt}
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                    <img src="/viewIcon.png" alt=""></img>
                                    {hotMbtwhy.viewCnt}
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                :<></>}

                {/* 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {mbtwhyList.length !== 0? mbtwhyList.map(mbtwhy => {
                        return (
                            <div className={style.sectionBoard} key={mbtwhy.no} onClick={()=>goMbtwhyDetail(mbtwhy.no)}>
                                <div className={style.boardWriter}>
                                <div style={{backgroundColor:`${mbtwhy.writerMbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                                    {mbtwhy.writerMbti}&nbsp;&nbsp;&nbsp;
                                    {mbtwhy.writerNickname}
                                </div>
                                <div className={style.boardDate}>
                                    {formatDatetimeGap(mbtwhy.writeDate)}
                                </div>
                                <div className={style.boardContent}>
                                    {mbtwhy.content}
                                </div>
                                <div className={style.boardLow}>
                                    <div>
                                        <img src="/commentIcon.png" alt=""></img>
                                        {mbtwhy.commentCnt}
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
                    }):
                    <div className={style.noMbtwhy}>
                        <h3>게시글이 없습니다.</h3>
                    </div>}
                </div>

                {/* 페이징 영역 */}
                {mbtwhyList.length===0?<></>:<PaginationInside/>}

                {/* 검색 영역 */}
                <FormGroup row className={style.sectionSearch}>
                    <Col sm={3}>
                        {/* <Input type='select' name="type">
                            <option value='content'>내용</option>
                            <option value='comment'>댓글</option>
                            <option value='content&comment'>내용 + 댓글</option>
                            <option value='writer'>작성자</option>
                        </Input> */}
                    </Col>
                    <Col sm={6}>
                        <Input type="text" id="searchInput" onChange={handleSearchChange}/>
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
            <section className={style.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                </div>
            </section>
        </div>
    );
}

export default Mbtwhy;
