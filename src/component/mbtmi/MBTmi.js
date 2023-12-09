import { Popover, PopoverBody, Table } from "reactstrap";

import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MBTmi = () => {

    const [weeklyHotList, setWeeklyHotList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [mbtmiList, setMbtmiList] = useState([]);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [category, setCategory] = useState(null);
    const [type, setType] = useState(null);
    const [search, setSearch] = useState(null);
    const [tmpSearch, setTmpSearch] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);


    useEffect(() => {
        getWeeklyHotList();
        getNewlyMbtmiList(category, type, search, page);
    }, []);

    const getWeeklyHotList = () => {
        axios.get(`http://localhost:8090/weeklyhotmbtmi`)
        .then(res=> {
            console.log(res);
            let list = res.data;
            setWeeklyHotList([...list]);
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





    // const [weeklyHotPosts, setWeeklyHotPosts] = useState([
    //     {postNo: 22, category: '잡담', title: '잡담 게시판의 인기 게시글 제목', commentCnt: 103, writedate: '2일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 112},
    //     {postNo: 44, category: '연애', title: '연애 게시판의 인기 게시글 제목', commentCnt: 99, writedate: '3일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 55},
    //     {postNo: 66, category: '회사', title: '회사 게시판의 인기 게시글 제목', commentCnt: 88, writedate: '1일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 22},
    //     {postNo: 88, category: '학교', title: '학교 게시판의 인기 게시글 제목', commentCnt: 77, writedate: '4일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 33},
    //     {postNo: 110, category: '취미', title: '취미 게시판의 인기 게시글 제목취미 게시판의 인기 게시글 제목취미 게시판의 인기 게시글 제목', commentCnt: 111, writedate: '6일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 44},
    // ]);
    // const [mbtmiListByPaging, setMbtmiListByPaging] = useState([
    //     {postNo: 222, category: '연애', title: '연애 게시판의 최신 게시글 제목', commentCnt: 0, writedate: '1분 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 0},
    //     {postNo: 221, category: '회사', title: '회사 게시판의 최신 게시글 제목회사 게시판의 최신 게시글 제목회사 게시판의 최신 게시글 제목', commentCnt: 0, writedate: '1분 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 0},
    //     {postNo: 220, category: '잡담', title: '잡담 게시판의 최신 게시글 제목', commentCnt: 2, writedate: '1시간 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 2},
    //     {postNo: 199, category: '잡담', title: '잡담 게시판의 최신 게시글 제목', commentCnt: 4, writedate: '2일 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 0},
    //     {postNo: 198, category: '취미', title: '취미 게시판의 최신 게시글 제목', commentCnt: 6, writedate: '3주 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 3},
    //     {postNo: 197, category: '학교', title: '학교 게시판의 최신 게시글 제목', commentCnt: 0, writedate: '3달 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 1},
    //     {postNo: 196, category: '회사', title: '회사 게시판의 최신 게시글 제목', commentCnt: 0, writedate: '11달 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 5},
    //     {postNo: 195, category: '잡담', title: '잡담 게시판의 최신 게시글 제목', commentCnt: 12, writedate: '2년 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 30},
    //     {postNo: 194, category: '잡담', title: '잡담 게시판의 최신 게시글 제목', commentCnt: 8, writedate: '12년 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 40},
    //     {postNo: 193, category: '취미', title: '취미 게시판의 최신 게시글 제목취미 게시판의 최신 게시글 제목취미 게시판의 최신 게시글 제목', commentCnt: 9, writedate: '13년 전', writerMbti: 'ESFP', writerNickname: '포로리', recommentCnt: 100},
    // ]);

    const [open,setOpen]=useState(false);
    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {
        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setOpen(false);
            } 
        };
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);




    const handlePageNo = (pageNo) => {
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
                                    <tr key={post.postNo}>
                                        <td>[{post.category}]</td>
                                        <td>
                                            <span className={style.overflow}>{post.title}</span>&nbsp;&nbsp;
                                            <span>[{post.commentCnt}]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <small>{formatDate(post.writeDate)}</small>
                                        </td>
                                        <td>
                                            <div className={style.profileColor}/>&nbsp;
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
                        <button className={style.activeCategory}>잡담</button>
                        <button>연애</button>
                        <button>회사</button>
                        <button>학교</button>
                        <button>취미</button>
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
                                <tr>
                                    <td>
                                        <div className={style.td1row}>
                                            <div className={style.profileColor}/>&nbsp;
                                            <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                                            <small>{formatDate(post.writeDate)}</small>
                                        </div>
                                        <div className={style.td2row}>
                                            <span className={style.overflowLong}>{post.title}</span>
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