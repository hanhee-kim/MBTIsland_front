import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    Popover,
    PopoverBody,
    FormGroup,
    Col,
    Input,
    Button } from "reactstrap";
import axios from 'axios';

import style from "../../css/mbattle/MBattle.module.css";
import { urlroot } from "../../config";

function MBattle() {
    // 로그인 유저 정보]
    const user = useSelector((state) => state.persistedReducer.user);

    // 인기 게시글
    const [hotMbattleList, setHotMbattleList] = useState([]);

    // Mbtwhy 게시글 목록
    const [mbattleList, setMbattleList] = useState([]);

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

    // navigate
    const navigate = useNavigate();
    
    // mbattlewrite 이동
    const goMbattleWrite = () => {
        if(!user.username) {
            alert("로그인해주세요.");
            return;
        }

        navigate("/mbattlewrite");
    };

    // mbattleDetail 이동
    const goMbattleDetail = (no) => {
        navigate(`/mbattledetail/${no}`);
    };
    
    // 게시글 목록 조회
    const getMbattleList = (page, search, sort) => {
        let defaultUrl = `${urlroot}/mbattle?page=${page}`;
        if(search !== "") defaultUrl += `&search=${search}`;
        if(sort !== "") defaultUrl += `&sort=${sort}`;

        axios.get(defaultUrl)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let mbattleList = res.data.mbattleList;
            let hotMbattleList = res.data.hotMbattleList;

            setMbattleList([...mbattleList]);
            setHotMbattleList([...hotMbattleList]);
            
            setPageInfo({...pageInfo});
            setPage(page);
        })
        .catch(err=> {
            console.log(err);
            // setMbattleList([]);
            // setHotMbattleList([]);
            // setPageInfo({});
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

        setPage(1);
        setSearch("")
        setSort("최신순");
        getMbattleList(1, "", "최신순");
    }, []);

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
        getMbattleList(1, tmpSearch, sort);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // page 핸들링
    const handlePage = (pageNo) => {
        setPage(pageNo);
        getMbattleList(pageNo, search, sort);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 팝오버 sort 핸들링
    const handleSort = (sortType) => {
        setSort(sortType);
        setOpen(!open);
        getMbattleList(page, search, sortType);
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

    const boardVoteButton = {
        fontWeight:"bold",
        fontSize:"small",
        backgroundColor:"#1FAB70",
        lineHeight:"10px"
    };

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>M-Battle</h1>
                    <div>
                        <div className={style.pageHeaderContent}>MBTI 유형 별 성향을 알아보세요!</div>
                        <div style={{display:"flex"}}>
                            <div className={style.pageHeaderWriteBtn} onClick={()=>goMbattleWrite()}>글 작성</div>
                            <button className={style.popoverButton} onClick={()=>setOpen(!open)} id="Popover1"><img src={"/sortIcon.png" } alt="" className={style.sortImg} />{!sort? "최신순" : sort}</button>
                            <Popover placement="bottom" isOpen={open} target="Popover1" toggle={()=>handleToggle()}>
                                <PopoverBody className={style.popoverItem} onClick={()=>handleSort("최신순")}>최신순</PopoverBody>
                                <PopoverBody className={style.popoverItem} onClick={()=>handleSort("조회순")}>조회순</PopoverBody>
                                <PopoverBody className={style.popoverItem} onClick={()=>handleSort("투표순")}>투표순</PopoverBody>
                            </Popover>
                        </div>
                    </div>
                </div>
                {/* 게시판 헤더 영역 */}

                {/* 인기 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {hotMbattleList.length !== 0 && hotMbattleList.map(hotMbattle => {
                        return (
                            <div key={hotMbattle.no} className={style.sectionBoard}>
                                <div className={style.boardImages}>
                                    {hotMbattle.fileIdx1 !== null?
                                        <div>
                                            <img src={`${urlroot}/mbattleimg/${hotMbattle.fileIdx1}`} alt=''/>
                                        </div>
                                        :<div className={style.voteItemDiv}>{hotMbattle.voteItem1}</div>
                                    }
                                    {hotMbattle.fileIdx2 !== null?
                                        <div>
                                            <img src={`${urlroot}/mbattleimg/${hotMbattle.fileIdx2}`} alt=''/>
                                        </div>
                                        :<div className={style.voteItemDiv}>{hotMbattle.voteItem2}</div>
                                    }
                                </div>
                                <div className={style.boardContents} onClick={()=>goMbattleDetail(hotMbattle.no)}>
                                    <div className={style.boardTitle}>
                                        {hotMbattle.title}
                                    </div>
                                    <div className={style.boardContentsLow}>
                                        <div className={style.boardVotedCount}>
                                            {hotMbattle.voteCnt}명 투표
                                            &#128293;
                                        </div>&nbsp;&nbsp;
                                        <div>
                                            <Button style={boardVoteButton}>투표하기</Button>
                                            {/* <Button>투표완료</Button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* 인기 게시글 영역 */}

                {/* 게시글 영역 */}
                <div className={style.sectionBoards}>
                    {mbattleList.length !== 0? mbattleList.map(mbattle => {
                        return (
                            <div key={mbattle.no} className={style.sectionBoard}>
                                <div className={style.boardImages}>
                                    {mbattle.fileIdx1 !== null?
                                        <div>
                                            <img src={`${urlroot}/mbattleimg/${mbattle.fileIdx1}`} alt=''/>
                                        </div>
                                        :<div className={style.voteItemDiv}>{mbattle.voteItem1}</div>
                                    }
                                    {mbattle.fileIdx2 !== null?
                                        <div>
                                            <img src={`${urlroot}/mbattleimg/${mbattle.fileIdx2}`} alt=''/>
                                        </div>
                                        :<div className={style.voteItemDiv}>{mbattle.voteItem2}</div>
                                    }
                                </div>
                                <div className={style.boardContents} onClick={()=>goMbattleDetail(mbattle.no)}>
                                    <div className={style.boardTitle}>
                                        {mbattle.title}
                                    </div>
                                    <div className={style.boardContentsLow}>
                                        <div className={style.boardVotedCount}>
                                            {mbattle.voteCnt}명 투표
                                        </div>&nbsp;&nbsp;
                                        <div>
                                            <Button style={boardVoteButton}>투표하기</Button>
                                            {/* <Button>투표완료</Button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }):
                    <div className={style.noMbattle}>
                        <h3>게시글이 없습니다.</h3>
                    </div>}
                </div>
                {/* 게시글 영역 */}

                {/* 페이징 영역 */}
                {mbattleList.length===0?<></>:<PaginationInside/>}

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
                {/* 검색 영역 */}
            </div>
            {/* 중앙 영역 */}
        </div>
    );
}

export default MBattle;
