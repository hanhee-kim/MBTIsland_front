import { Popover, PopoverBody, Table } from "reactstrap";

import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useRef, useState } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { urlroot } from "../../config";
import Swal from "sweetalert2";



/* 재사용성을 높이기 위해 외부에 선언한 페이지네이션 */
const PaginationOutside = ({ pageInfo, handlePageNo }) => {
    //console.log('PaginationOutside에서 출력한 pageInfo : ', pageInfo);
    const isFirstGroup = pageInfo.startPage===1;
    const isLastGroup = pageInfo.endPage===pageInfo.allPage;
    const pageGroup = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageGroup.push(
            <span key={i} className={`${pageInfo.curPage===i? style.activePage : ""}`} onClick={() => handlePageNo(i)}>{i}</span>
        );
    }

    return (
        <div className={style.paging}>
            {!isFirstGroup && (
                <>
                    <span onClick={() => handlePageNo(1)}>≪</span>
                    <span onClick={() => handlePageNo(pageInfo.startPage - 10)}>&lt;</span>
                </>
            )}
            {pageGroup}
            {!isLastGroup && (
                <>
                    <span onClick={() => handlePageNo(pageInfo.endPage + 1)}>&gt;</span>
                    <span onClick={() => handlePageNo(pageInfo.allPage)}>≫</span>
                </>
            )}
        </div>
    );
};



const MBTmi = () => {

    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user);

    const [weeklyHotList, setWeeklyHotList] = useState([]);
    const [errorMsgWeekly, setErrorMsgWeekly] = useState("");
    const [errorMsgNewly, setErrorMsgNewly] = useState("");
    // 절대시간
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

        // if(seconds<60) return `${seconds}초 전`;
        // else 
        if(minutes<60) return `${minutes}분 전`;
        else if(hours<24) return `${hours}시간 전`;
        else if(days<7) return `${days}일 전`;
        else if(weeks<4) return `${weeks}주 전`;
        else if(months<12) return `${months}달 전`;
        else return `${years}년 전`;
    }
    const [mbtmiList, setMbtmiList] = useState([]);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");
    const [tmpSearch, setTmpSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("");
    // localStorage에 저장된 이전 목록의 값을 사용하여 최신글목록이 받아와진 상태인지 여부(로컬스토리지 사용여부)
    const [usedLocalStorage, setUsedLocalStorage] = useState(false);


    // 헤더의 MB-TMI메뉴 재클릭시 초기상태로 재렌더링하게함
    const location = useLocation();
    useEffect(() => {
        if (!location.state || !location.state.fromDetail) {
            setWeeklyHotList([]);
            setErrorMsgWeekly("");
            setErrorMsgNewly("");
            setMbtmiList([]);
            setPage(1);
            setPageInfo({});
            setCategory("");
            setSort("");
            setSearch("");
            setTmpSearch("");
            setActiveCategory("");
            setOpen(false);
            setCheckedRadioValues({group1: '', group2: '', group3: '', group4: ''});
            setType("");
            // 초기값으로 목록 렌더링되도록 함
            getWeeklyHotList();
            getNewlyMbtmiList("", "", "", 1, "");
            // localStorage 초기화
            localStorage.removeItem('mbtmiListPrevValue');
        }
    }, [location]);


    useEffect(() => {
        // localStorage에 저장된 이전의 목록 정보를 읽음
        const savedPrevListValue = localStorage.getItem('mbtmiListPrevValue');
        const prevListValue = savedPrevListValue ? JSON.parse(savedPrevListValue) : null;
    
        if (prevListValue) { // state업데이트
            setPage(parseInt(prevListValue.curPage, 10));
            setCategory(prevListValue.curCategory);
            setActiveCategory(prevListValue.curCategory);
            setType(prevListValue.curType);
            setSearch(prevListValue.curSearchTerm);
            setSort(prevListValue.curSort);
            setCheckedRadioValues(prevListValue.checkedRadioValues);
            setUsedLocalStorage(true);
        } else { // 초기 데이터 로딩
            getWeeklyHotList();
            getNewlyMbtmiList("", "", "", 1, "");
        }
    
        // 로컬스토리지 초기화
        localStorage.removeItem("mbtmiListPrevValue");
    }, []);
    
    useEffect(() => {
        // usedLocalStorage가 true인 경우에만(usedLocalStorage===true라는 것은 localStorage를 사용한 상태라는 것으로, localStorage를 읽지 않고 렌더링해야하는 경우에 해당)
        if (usedLocalStorage) {
            getNewlyMbtmiList(category, type, search, page, sort);
            getWeeklyHotList();
        }
    }, [usedLocalStorage, category, type, search, page, sort]);


    // localStorage에 저장된 mbtmiListPrevValue객체를 업데이트하는 함수로, handlePageNo 등에서 호출됨
    const updateLocalStorage = (newValue) => {
        // //console.log('updateLocalStorage가 받은 인자: ', newValue);
        const valueToSave = {
            curPage: page,
            curCategory: category,
            curType: type,
            curSearchTerm: search,
            curSort: sort,
            checkedRadioValues: checkedRadioValues, // 라디오버튼의 checked를 유지시키기 위하여 저장
            ...newValue
        };
        //console.log('$$$ 로컬스토리지에 저장될 valueToSave: ', valueToSave);
        localStorage.setItem('mbtmiListPrevValue', JSON.stringify(valueToSave)); // localStorage에는 문자열만 저장 가능
    };

    const getWeeklyHotList = () => {
        axios.get(`${urlroot}/weeklyhotmbtmi`)
        .then(res=> {
            // //console.log(res);
            let list = res.data.weeklyHotMbtmiList;
            setWeeklyHotList([...list]);
            setErrorMsgWeekly("");
        })
        .catch(err=> {
            //console.log(err);
            if(err.response && err.response.data) {
                //console.log('err.response.data: ' + err.response.data);
                setErrorMsgWeekly(err.response.data);
            }
        })
    }

    const getNewlyMbtmiList = (paramCategory, paramType, paramSearch, paramPage, paramSort) => {
        //console.log('getNewlyMbtmiList이 호출됨! ', 'paramPage: ', paramPage, "paramType: ", paramType, ", checkedRadioValues: ",  checkedRadioValues);

        let defaultUrl = `${urlroot}/mbtmilist`;

        if (paramCategory !== "") defaultUrl += `?category=${paramCategory}`;
        if (paramType !== "") defaultUrl += `${paramCategory !== "" ? '&' : '?'}type=${paramType}`;
        if (paramSearch !== "") defaultUrl += `${paramCategory !== "" || paramType !== "" ? '&' : '?'}search=${paramSearch}`;
        if (paramPage !== "") defaultUrl += `${paramCategory !== "" || paramType !== "" || paramSearch !== "" ? '&' : '?'}page=${paramPage}`;
        if (paramSort !== "") defaultUrl += `${paramCategory !== "" || paramType !== "" || paramSearch !== "" || paramPage !== "" ? '&' : '?'}sort=${paramSort}`;

        //console.log('*** 요청url:' + defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            //console.log('최신글목록 요청결과: ', res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.mbtmiList;
            setMbtmiList([...list]);
            setPageInfo({...pageInfo});
            setErrorMsgNewly("");
        })
        .catch(err=> {
            if(err.response && err.response.data) {
                //console.log('err.response.data: ' + err.response.data);
                setErrorMsgNewly(err.response.data);
                setPageInfo({});
            }
        })
    }

    const [open,setOpen]=useState(false);
    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    const clickOutsidePopover = (event) => {
        const popoverElements = document.querySelectorAll(".popover");

        // 이벤트객체와 해당하는 target속성이 정의되어 있는지 확인 (null 또는 undefined인 target에 접근할때  "Cannot read properties of undefined" 에러가 발생하기 때문에 if문으로 감싼다)
        if(event && event.target) {

            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setOpen(false);
            } 
        }
    };
    useEffect(() => {
        clickOutsidePopover();
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    const goToMbtmiForm = () => {
        //console.log('유저정보: ', user.username, ", 정지여부: ", user.isBanned);
        if(!user.username) {
            Swal.fire({
                title: "로그인해주세요.",
                icon: "warning",
            });
            return;
        }
        if(user.isBanned==='Y') {
            Swal.fire({
                title: "정지 상태에서는 글을 작성하실 수 없습니다.",
                icon: "warning",
            });
            return;
        }
        if(user.userRole==='ROLE_ADMIN') {
            Swal.fire({
                title: "게시판 이용을 위해 일반회원으로 로그인해주세요.",
                icon: "warning",
            });
            return;
        }
        
        navigate(`/mbtmiform`);
    };


    const handlePageNo = (pageNo) => {
        // 현재 페이지번호를 localStorage에 저장
        // localStorage.setItem('curPage', pageNo.toString());

        // 함수를 이용하여 현재 페이지번호를 localStorage에 저장
        updateLocalStorage({ curPage: pageNo });

        setPage(pageNo);
        // //console.log('현재 적용되는 검색어: ' + search);
        getNewlyMbtmiList(category, type, search, pageNo, sort);
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
        
        // 현재 검색값을 localStorage에 저장
        // localStorage.setItem('curSearchTerm', searchTerm);
    };
    const handleSearch = () => {
        // 함수를 이용하여 현재 검색값을 localStorage에 저장
        updateLocalStorage({ curSearchTerm: tmpSearch });

        setSearch(tmpSearch);
        setPage(1);
        getNewlyMbtmiList(category, type, tmpSearch, 1, sort); // 페이지번호만 리셋
    }
    // 엔터키로 검색 수행
    const handleKeyPress = (e) => {
        if (e.key==="Enter") handleSearch();
    }

    // 카테고리 변경
    const handleCategoryChange = (categoryParam) => {
        // 함수를 이용하여 현재 카테고리값을 localStorage에 저장
        updateLocalStorage({ curCategory: categoryParam });

        getNewlyMbtmiList(categoryParam, type, search, 1, sort); // 카테고리 변경시 페이지는 리셋, 타입과 검색어와 정렬은 유지
        setPage(1);
        setCategory(categoryParam);
        setActiveCategory(categoryParam);
    };

    // MBTI필터 변경
    const [checkedRadioValues, setCheckedRadioValues] = useState({group1: '', group2: '', group3: '', group4: ''});
    const handleRadioCheck = (group, value) => {
        // //console.log('handleRadioCheck함수 실행!');
        setCheckedRadioValues(prev=> ({
            ...prev, [group]: value
        }));
        //console.log('value: ', value);
    };

    useEffect(() => {
        // checkedRadioValues 중 하나라도 초기값(빈문자열)이 아닌 경우에만 실행되도록 if문으로 감싼다 (초기렌더링시에  자동실행되지 않도록)
        // if (Object.values(checkedRadioValues).some(value => value !== ''))  {

        // 적어도 한번 렌더링 된 이후(초기 렌더링이 아닌 경우) && 하나라도 초기값이 아닌 경우에만 실행되도록 함
        if (Object.values(checkedRadioValues).some(value => value !== ''))  {
            //console.log('checkedRadioValues: ', checkedRadioValues);
            const onlyValuesExceptKeys = Object.values(checkedRadioValues);
            setType(onlyValuesExceptKeys.join(''));
        }
    }, [checkedRadioValues]);
    useEffect(()=> {
        // type이 초기값이 아닌 경우에만 실행되도록 if문으로 감싼다
        if(type!=="") {
            // 함수를 이용하여 현재 mbti타입값을 localStorage에 저장
            updateLocalStorage({ curType: type });

            // //console.log("category: ", category);
            //console.log("type: ", type);
            // //console.log("search: ", search);
            setPage(page); // setPage(1)
            getNewlyMbtmiList(category, type, search, page, sort); // getNewlyMbtmiList(category, type, search, 1, sort);
        }
    }, [type]);

    // MBTI필터, 카테고리 리셋 버튼
    const refreshFilter = (refreshTarget) => {
        // //console.log('refreshRadioCheck함수 실행!');
        setErrorMsgNewly("");

        if(refreshTarget==='typeFilter') {
            //console.log('typeFilter를 리셋');
            getNewlyMbtmiList(category, "", search, 1, sort);
            setCheckedRadioValues({group1: '', group2: '', group3: '', group4: ''});
            setType("");
            setPage(1);

            // type필터값 리셋시 localStorage 업데이트
            updateLocalStorage({ curType: "", checkedRadioValues: {group1: '', group2: '', group3: '', group4: ''}, curPage: 1 });

        } else {
            //console.log('categoryFilter를 리셋');
            getNewlyMbtmiList("", type, search, 1, sort);
            setCategory("");
            setActiveCategory("");
            setPage(1);

            // category필터값 리셋시 localStorage 업데이트
            updateLocalStorage({ curCategory: "", curPage: 1 });
        }
    }

    // 정렬값 변경
    const handleSort = (paramSort) => {
        // 함수를 이용하여 현재 mbti타입값을 localStorage에 저장
        updateLocalStorage({ curSort: paramSort });

        setSort(paramSort);
        setOpen(!open); // 팝오버 닫기
        getNewlyMbtmiList(category, type, search, 1, paramSort); // 페이지번호만 리셋
    }


    // 페이지네이션
    const PaginationInside = () => {
        if(errorMsgNewly!=="") return null;
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
        // //console.log('no, category, type, search, page: ' + post.no + ", " + category + ", " + type + ", " + search + ", " + page);
        const linkTo = `/mbtmidetail/${post.no}` +
                        (category? `/${category}` : '') +
                        (type? `/${type}` : '') +
                        (search? `/${search}` : '') +
                        (page? `/${page}` : '');
        navigate(linkTo, {replace:false});
    }


    return (
        
        <>
        <div className={style.container} id="top">
            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>
            <div className={style.boardTitleB}>
                <div className={style.boardTitleTextArea}>
                    <p>MB-TMI</p>
                    <p>유형별로 모여 자유롭게 이야기를 나눌 수 있는 공간</p>
                </div>
                <div>
                    <img alt="tmi" src={"/tmi.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                </div>
            </div>
                <h5 className={style.weekyHotPostsTitle}>&#128293;주간 인기글</h5>
                <div className={style.weeklyHotPosts}>
                    <table className={style.weeklyPostsTable}>
                        <tbody>
                            {errorMsgWeekly!==""? (
                                // <tr><td colSpan="4" className={style.errMsg}>{errorMsgWeekly}</td></tr>
                                <tr><td colSpan="4" className={style.errMsg}>{JSON.stringify(errorMsgWeekly)}</td></tr>
                            ) : (
                                weeklyHotList.length>0 && weeklyHotList.map(post => {
                                    return (
                                    <tr key={post.no} onClick={()=>makeFlexibleLink(post)}>
                                        <td>[{post.category}]</td>
                                        <td>
                                            <span className={style.overflow}>{post.title}</span>&nbsp;&nbsp;
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
                        <img src={"/refreshIcon.png" } alt="" className={style.refreshIcon} onClick={() => refreshFilter('categlryFilter')}/>
                    </div>
                    <div className={style.mbtiFilterBtns}> 
                        <span>&#128204;</span>&nbsp;&nbsp;
                        <input type="radio" id="mbtiE" name="group1" value="E" onChange={(e)=>handleRadioCheck('group1', e.target.value)} checked={checkedRadioValues['group1']==='E'? true: false} /><label htmlFor="mbtiE" className={style.uncheckedRadioLabel}>E</label>
                        <input type="radio" id="mbtiI" name="group1" value="I" onChange={(e)=>handleRadioCheck('group1', e.target.value)} checked={checkedRadioValues['group1']==='I'? true: false} /><label htmlFor="mbtiI" className={style.uncheckedRadioLabel}>I</label>
                        &nbsp;&nbsp;+&nbsp;&nbsp;
                        <input type="radio" id="mbtiN" name="group2" value="N" onChange={(e)=>handleRadioCheck('group2', e.target.value)} checked={checkedRadioValues['group2']==='N'? true: false} /><label htmlFor="mbtiN" className={style.uncheckedRadioLabel}>N</label>
                        <input type="radio" id="mbtiS" name="group2" value="S" onChange={(e)=>handleRadioCheck('group2', e.target.value)} checked={checkedRadioValues['group2']==='S'? true: false} /><label htmlFor="mbtiS" className={style.uncheckedRadioLabel}>S</label>
                        &nbsp;&nbsp;+&nbsp;&nbsp;
                        <input type="radio" id="mbtiF" name="group3" value="F" onChange={(e)=>handleRadioCheck('group3', e.target.value)} checked={checkedRadioValues['group3']==='F'? true: false} /><label htmlFor="mbtiF" className={style.uncheckedRadioLabel}>F</label>
                        <input type="radio" id="mbtiT" name="group3" value="T" onChange={(e)=>handleRadioCheck('group3', e.target.value)} checked={checkedRadioValues['group3']==='T'? true: false} /><label htmlFor="mbtiT" className={style.uncheckedRadioLabel}>T</label>
                        &nbsp;&nbsp;+&nbsp;&nbsp;
                        <input type="radio" id="mbtiJ" name="group4" value="J" onChange={(e)=>handleRadioCheck('group4', e.target.value)} checked={checkedRadioValues['group4']==='J'? true: false} /><label htmlFor="mbtiJ" className={style.uncheckedRadioLabel}>J</label>
                        <input type="radio" id="mbtiP" name="group4" value="P" onChange={(e)=>handleRadioCheck('group4', e.target.value)} checked={checkedRadioValues['group4']==='P'? true: false} /><label htmlFor="mbtiP" className={style.uncheckedRadioLabel}>P</label>
                        <img src={"/refreshIcon.png" } alt="" className={style.refreshIcon}  onClick={()=>refreshFilter('typeFilter')}/>
                    </div>
                </div>

                <div className={style.aboveTable}>
                    <span>
                        <button onClick={()=>setOpen(!open)} id="Popover1"><img src={"/sortIcon.png" } alt="" className={style.sortIcon} />{!sort? '최신순' : sort}</button>
                        <Popover className={style.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                            <PopoverBody className={style.popoverItem} onClick={()=>handleSort("최신순")}>최신순</PopoverBody>
                            <PopoverBody className={style.popoverItem} onClick={()=>handleSort("조회순")}>조회순</PopoverBody>
                            <PopoverBody className={style.popoverItem} onClick={()=>handleSort("추천순")}>추천순</PopoverBody>
                            {/* <PopoverBody className={style.popoverItem} onClick={()=>handleSort("댓글순")}>댓글순</PopoverBody> */}
                        </Popover>
                        <button onClick={goToMbtmiForm}><img src={"/writebtnIcon.png" } alt="" className={style.writebtnIcon} />작성하기</button>
                    </span>
                    <div className={style.searchBar}>
                        <input type="text" onChange={handleSearchChange} onKeyDown={(e)=>handleKeyPress(e)}/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} onClick={handleSearch}/>
                    </div>
                </div>
                <table className={style.mbtmiTable}>
                    <tbody>
                        {errorMsgNewly!==""? (
                            // <tr><td className={style.errMsg}>{errorMsgNewly}</td></tr> // 리액트는 렌더링할 자식 요소로 문자열 또는 숫자를 기대하며 객체는 유효하지 않다고 판단하여 에러를 발생시킬수 있기 때문에 객체는 JSON.stringify()를 이용한다
                            <tr><td className={style.errMsg}>{JSON.stringify(errorMsgNewly)}</td></tr>
                        ) : (
                            mbtmiList.length>0 && mbtmiList.map(post => {
                                return(
                                <tr key={post.no} onClick={()=>makeFlexibleLink(post)}>
                                    <td>
                                        <div className={style.td1row}>
                                            <div className={style.profileColor} style={{ background: post.writerMbtiColor, borderColor: post.writerMbtiColor }}/>&nbsp;
                                            <span>{post.writerMbti}&nbsp;{post.writerNickname}</span>
                                            <small>{formatDatetimeGap(post.writeDate)}</small>
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
                {/* <PaginationOutside pageInfo={pageInfo} handlePageNo={handlePageNo} /> */}
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