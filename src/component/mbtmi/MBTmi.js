import { Popover, PopoverBody, Table } from "reactstrap";

import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MBTmi = () => {

    const [weeklyHotList, setWeeklyHotList] = useState([]);
    const [commentCntList, setCommentCntList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
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
    const [mbtmiList, setMbtmiList] = useState([]);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [category, setCategory] = useState(null);
    const [type, setType] = useState(null);
    const [search, setSearch] = useState(null);
    const [tmpSearch, setTmpSearch] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);


    useEffect(() => {
        // localStorage에 저장된 페이지 정보를 읽음
        const storedInfo = localStorage.getItem('curPage');
        if(storedInfo) {
            setPage(parseInt(storedInfo, 10)); // 페이지넘버
        }

        getWeeklyHotList();
        getNewlyMbtmiList(category, type, search, page);
    }, []);

    const getWeeklyHotList = () => {
        axios.get(`http://localhost:8090/weeklyhotmbtmi`)
        .then(res=> {
            console.log(res);
            let list = res.data.weeklyHotMbtmiList;
            let commentCntList = res.data.commentCntList;
            setWeeklyHotList([...list]);
            setCommentCntList([...commentCntList]);
            setErrorMsg(null);
        })
        .catch(err=> {
            console.log(err);
            if(err.response && err.response.data) {
                console.log('err.response.data: ' + err.response.data);
                setErrorMsg(err.response.data);
            }
        })
    }

    const getNewlyMbtmiList = (category, type, search, page) => {
        let defaultUrl = 'http://localhost:8090/mbtmilist';

        if (category !== null) defaultUrl += `?category=${category}`;
        if (type !== null) defaultUrl += `${category !== null ? '&' : '?'}type=${type}`;
        if (search !== null) defaultUrl += `${category !== null || type !== null ? '&' : '?'}search=${search}`;
        if (page !== null) defaultUrl += `${category !== null || type !== null || search !== null ? '&' : '?'}page=${page}`;

        console.log('*** 요청url:' + defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.mbtmiList;
            setMbtmiList([...list]);
            setPageInfo({...pageInfo});
            setErrorMsg(null);
        })
        .catch(err=> {
            if(err.response && err.response.data) {
                console.log('err.response.data: ' + err.response.data);
                setErrorMsg(err.response.data);
                setPageInfo({});
            }
        })
    }

    const [open,setOpen]=useState(false);
    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    const clickOutsidePopover = (event) => {
        const popoverElements = document.querySelectorAll(".popover");
        // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
        if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
            setOpen(false);
        } 
    };
    useEffect(() => {
        clickOutsidePopover();
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);




    const handlePageNo = (pageNo) => {
        // 현재 페이지번호를 localStorage에 저장
        localStorage.setItem('curPage', pageNo.toString());

        setPage(pageNo);
        console.log('현재 적용되는 검색어: ' + search);
        getNewlyMbtmiList(category, type, search, pageNo); // 1,2,3번째 인자: state에 저장된 기존의 값
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };
    const handleSearch = () => {
        setSearch(tmpSearch);
        setPage(1);
        getNewlyMbtmiList(category, type, tmpSearch, 1); // 페이지번호만 리셋
    }


    // 페이지네이션
    const PaginationInside = () => {
        if(errorMsg) return null;
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

    // 게시글 제목 클릭시 동적으로 라우터 링크 생성하고 연결
    const navigate = useNavigate();
    const makeFlexibleLink = (post) => {
        // alert('no, category, type, search, page: ' + post.no + ", " + category + ", " + type + ", " + search + ", " + page);
        const linkTo = `/mbtmidetail/${post.no}` +
                        (category? `/${category}` : '') +
                        (type? `/${type}` : '') +
                        (search? `/${search}` : '') +
                        (page? `/${page}` : '');
        navigate(linkTo, {replace:false});
    }

    // 카테고리 변경
    const handleCategoryChange = (categoryParam) => {
        getNewlyMbtmiList(categoryParam, type, search, 1); // 카테고리 변경시 페이지는 리셋, 타입과 검색어는 유지
        setPage(1);
        setCategory(categoryParam);
        setActiveCategory(categoryParam);
    };


    return (
        <>
        <div className={style.container} id="top">
            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>
                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>
                <h5 className={style.weekyHotPostsTitle}>&#128293;주간 인기글</h5>
                <div className={style.weeklyHotPosts}>
                    <table className={style.weeklyPostsTable}>
                        <tbody>
                            {errorMsg? (
                                <tr><td colSpan="4" className={style.errMsg}>{errorMsg}</td></tr>
                            ) : (
                                weeklyHotList.length>0 && weeklyHotList.map(post => {
                                    return (
                                    <tr key={post.no}>
                                        <td>[{post.category}]</td>
                                        <td>
                                            <span className={style.overflow} onClick={()=>makeFlexibleLink(post)}>{post.title}</span>&nbsp;&nbsp;
                                            <span>[{post.commentCnt}]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <small>{formatDatetimeGap(post.writeDate)}</small>
                                        </td>
                                        <td>
                                            <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>&nbsp;
                                            <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                                        </td>
                                        <td>
                                            <img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;
                                            <small>{post.recommendCnt}</small>
                                        </td>
                                    </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={style.categoryAndFilter}>
                    <div className={style.categoryBtns}>
                        <span>&#128270;</span>
                        <button className={activeCategory==='잡담'? style.activeCategory :''} onClick={() => handleCategoryChange('잡담')}>잡담</button>
                        <button className={activeCategory==='연애'? style.activeCategory :''} onClick={() => handleCategoryChange('연애')}>연애</button>
                        <button className={activeCategory==='회사'? style.activeCategory :''} onClick={() => handleCategoryChange('회사')}>회사</button>
                        <button className={activeCategory==='학교'? style.activeCategory :''} onClick={() => handleCategoryChange('학교')}>학교</button>
                        <button className={activeCategory==='취미'? style.activeCategory :''} onClick={() => handleCategoryChange('취미')}>취미</button>
                        <img src={"/refreshIcon.png" } alt="" className={style.refreshIcon} onClick={() => handleCategoryChange(null)}/>
                    </div>
                    <div className={style.mbtiFilterBtns}> 
                        <span>&#128204;</span>&nbsp;&nbsp;
                        <input type="radio" id="mbtiE" name="mbti1"/><label for="mbtiE">E</label>
                        <input type="radio" id="mbtiI" name="mbti1"/><label for="mbtiI">I</label>
                        &nbsp;&nbsp;+&nbsp;&nbsp;
                        <input type="radio" id="mbtiN" name="mbti2"/><label for="mbtiN">N</label>
                        <input type="radio" id="mbtiS" name="mbti2"/><label for="mbtiS">S</label>
                        &nbsp;+&nbsp;
                        <input type="radio" id="mbtiF" name="mbti3"/><label for="mbtiF">F</label>
                        <input type="radio" id="mbtiT" name="mbti3"/><label for="mbtiT">T</label>
                        &nbsp;+&nbsp;
                        <input type="radio" id="mbtiJ" name="mbti4"/><label for="mbtiJ">J</label>
                        <input type="radio" id="mbtiP" name="mbti4"/><label for="mbtiP">P</label>
                        <img src={"/refreshIcon.png" } alt="" className={style.refreshIcon} />
                    </div>
                </div>

                <div className={style.aboveTable}>
                    <span>
                        <button onClick={()=>setOpen(!open)} id="Popover1"><img src={"/sortIcon.png" } alt="" className={style.sortIcon} />최신순</button>
                        <Popover className={style.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                            <PopoverBody className={style.popoverItem}>최신순</PopoverBody>
                            <PopoverBody className={style.popoverItem}>조회수</PopoverBody>
                            <PopoverBody className={style.popoverItem}>댓글수</PopoverBody>
                        </Popover>
                        <button><img src={"/writebtnIcon.png" } alt="" className={style.writebtnIcon} />작성하기</button>
                    </span>
                    <div className={style.searchBar}>
                        <input type="text" onChange={handleSearchChange}/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} onClick={handleSearch}/>
                    </div>
                </div>
                <table className={style.mbtmiTable}>
                    <tbody>
                        {errorMsg? (
                            <tr><td className={style.errMsg}>{errorMsg}</td></tr>
                        ) : (
                            mbtmiList.length>0 && mbtmiList.map(post => {
                                return(
                                <tr key={post.no}>
                                    <td>
                                        <div className={style.td1row}>
                                            <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>&nbsp;
                                            <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                                            <small>{formatDatetimeGap(post.writeDate)}</small>
                                        </div>
                                        <div className={style.td2row}>
                                            <span className={style.overflowLong} onClick={()=>makeFlexibleLink(post)}>{post.title}</span>
                                            <span>
                                                <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;{post.recommendCnt}</small>
                                                <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;{post.commentCnt}</small>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
                {PaginationInside()}
            </section>
            <section className={style.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                </div>
            </section>
        </div>
        </>
    );
}
export default MBTmi;