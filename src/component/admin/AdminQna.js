import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import styleQna from "../../css/admin/AdminQna.module.css";
import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AdminNav from "./AdminNav";
import axios from "axios";
import { urlroot } from "../../config";

const AdminQna = () => {

    const location = useLocation();
    const [questionList, setQuestionList] = useState([]);
    const [questionCnts, setQuestionCnts] = useState({'totalCnt':0, 'answeredCnt':0, 'answeredNotCnt':0});
    const [search, setSearch] = useState(null);
    const [answered, setAnswered] = useState(null);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [tmpSearch, setTmpSearch] = useState(null);
    const [username, setUsername] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {

        // AdminQnaForm.js에서 특정유저의 문의글모아보기 클릭시 파라미터와 함께 navigate됨
        const searchParams = new URLSearchParams(location.search);
        const writerId = searchParams.get('writerId');
        if (writerId) {
            console.log(`모아볼 아이디: ${writerId}`);
            getQuestionList(search, null, 1, writerId);
            setUsername(writerId);

        } else {
            getQuestionList(search, answered, page, username);
        }
    }, [location.search]);

    const getQuestionList = (search, answered, page, username) => {
        let defaultUrl = `${urlroot}/questionlist`;

        if (search !== null) defaultUrl += `?search=${search}`;
        if (answered !== null) defaultUrl += `${search !== null ? '&' : '?'}answered=${answered}`;
        if (page !== null) defaultUrl += `${search !== null || answered !== null ? '&' : '?'}page=${page}`;
        if (username !== null) defaultUrl += `${search !== null || answered !== null || page !== null ? '&' : '?'}username=${username}`;

        console.log('요청url:' + defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.questionList;
            let questionCnts = res.data.questionCnts;
            setQuestionList([...list]);
            setPageInfo({...pageInfo});
            setQuestionCnts({...questionCnts});
            setErrorMsg(null); 
            setAnswered(answered);
            setUsername(username);
        })
        .catch(err=> {
            console.log(err);
            if(err.response && err.response.data) {
                console.log('err.response.data: ' + err.response.data);
                setErrorMsg(err.response.data);
                setQuestionCnts({'totalCnt':0, 'answeredCnt':0, 'answeredNotCnt':0});
            }
        });
    }

    const handlePageNo = (pageNo) => {
        setPage(pageNo);
        console.log('***페이지이동***')
        console.log('현재 적용되는 필터값: ' + answered);
        console.log('현재 적용되는 검색어: ' + search);
        getQuestionList(search, answered, pageNo, username); 
    };
    const handleFilterChange = (answered) => {
        console.log('***필터변경***')
        console.log('현재 적용되는 필터값: ' + answered);
        console.log('현재 적용되는 검색어: ' + search);
        getQuestionList(search, answered, 1, username);
        setActiveFilter(answered);
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };
    const handleSearch = () => {
        console.log('검색 수행');
        setSearch(tmpSearch);
        setAnswered(null);
        setActiveFilter(null);
        getQuestionList(tmpSearch, null, 1, username);
    };

    // 팝오버 오픈 상태
    const [openList, setOpenList] = useState([]);

    useEffect(() => {
        // 렌더링하자마자 모든 팝오버 오픈 상태를 false로 설정
        setOpenList(questionList.map(() => false));
    }, [questionList]);

    // 클릭된 특정한 td의 팝오버 오픈상태를 토글
    const togglePopover = (index, writerId) => {
        const newOpenList = [...openList];
        newOpenList[index] = !newOpenList[index]; // 반대상태로 토글
        setOpenList(newOpenList);
    };

    const getQuestionListOfWriterId = (writerId) => {
        console.log('모아볼 writerId: ', writerId);
        getQuestionList(search, null, 1, writerId); // 문의글모아보기 클릭시 검색값은 유지, answered와 page는 초기값으로 목록 요청
        setUsername(writerId);
        setActiveFilter(null);
        setAnswered(null);
        setPage(1);
    }



    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {
        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setOpenList(questionList.map(() => false));
            } 
        };
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);


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
    const goToAdminQnaForm = (postNo) => {
        const linkTo = `/adminqna/form/${postNo}`;
        navigate(linkTo); // 리다이렉트
    };

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>1:1 문의 답변</div>
            <div className={styleFrame.sectionContents}>
                <div className={style.filterBtns}>
                    <div>
                        <span className={`${style.filterBtn} ${activeFilter===null? style.filterActive :''}`} onClick={() => handleFilterChange(null)}>전체 : {questionCnts.totalCnt}</span>
                        <span className={`${style.filterBtn} ${activeFilter==='Y'? style.filterActive :''}`} onClick={() => handleFilterChange("Y")}>처리완료 : {questionCnts.answeredCnt}</span>
                        <span className={`${style.filterBtn} ${activeFilter==='N'? style.filterActive :''}`} onClick={() => handleFilterChange("N")}>미처리 : {questionCnts.answeredNotCnt}</span>
                    </div>
                    <div className={style.searchBar}>
                        <input type="text" onChange={handleSearchChange}/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} onClick={handleSearch}/>
                    </div>
                </div>
                <table className={styleQna.table}>
                    <thead>
                        <tr>
                            <td>번호</td>
                            <td>문의일</td>
                            <td>제목</td>
                            <td>회원</td>
                            <td>상태</td>
                        </tr>
                    </thead>
                    <tbody>
                        {errorMsg? (
                            // <tr><td colSpan="5" className={styleQna.errMsg}>{errorMsg}</td></tr>
                            <tr><td colSpan="5" className={style.errMsg}>{JSON.stringify(errorMsg)}</td></tr>
                        ) : (
                            questionList.length>0 && questionList.map((post, index) => {
                                return (
                                <tr key={post.no} className={post.isAnswered==='Y'? styleQna.completedQna : ''}>
                                    <td>{post.no}</td>
                                    <td>{formatDate(post.writeDate)}</td>
                                    <td onClick={()=> goToAdminQnaForm(post.no)}>{post.title}</td>
                                    <td onClick={() => togglePopover(index)} id={`popover${index}`}>{post.writerId}</td>
                                    <Popover className={styleQna.popover} placement="bottom" isOpen={openList[index]} target={`popover${index}`} toggle={() => togglePopover(index)}>
                                        <PopoverBody className={styleQna.popoverItem} onClick={() => getQuestionListOfWriterId(post.writerId)}>문의글 모아보기</PopoverBody>
                                    </Popover>
                                    <td>{post.isAnswered==='N'? ('미처리') : ('처리')}</td>
                                </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
                {PaginationInside()}
            </div>
        </div>
        </>
    );
}
export default AdminQna;