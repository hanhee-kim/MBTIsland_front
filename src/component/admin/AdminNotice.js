import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import axios from "axios";

const AdminNotice = () => {

    // const { page } = useParams(); // URL에서 현재페이지 파라미터 추출
    const [noticeList, setNoticeList] = useState([]); // 페이지당 게시글목록 
    const [noticeCnts, setNoticeCnts] = useState({'totalCnt':0, 'displayCnt':0, 'hiddenCnt':0}); // 표시할 게시글수들
    const [search, setSearch] = useState(null); // 검색어
    const [hidden, setHidden] = useState(null); // 필터
    const [page, setPage] = useState(1); // 페이지 이동번호
    const [pageInfo, setPageInfo] = useState({}); // 페이지 정보(전체페이지, 현재페이지, 시작페이지번호, 끝페이지번호)
    const [tmpSearch, setTmpSearch] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null); // 현재 적용된 필터
    const [errorMsg, setErrorMsg] = useState(null);
    const [afterDelOrHide, setAfterDelOrHide] = useState(false);
    // const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    

    useEffect(() => {
        getNoticeList(search, hidden, page);
    }, [afterDelOrHide]); // 의존성배열을 비우면 useEffect는 컴포넌트가 처음 렌더링될때에만 실행되고 state를 넣으면 state값이 업데이트될때마다 실행됨

    const getNoticeList = (search, hidden, page) => {

        let defaultUrl = 'http://localhost:8090/noticelist';

        if (search !== null) defaultUrl += `?search=${search}`;
        if (hidden !== null) defaultUrl += `${search !== null ? '&' : '?'}hidden=${hidden}`;
        if (page !== null) defaultUrl += `${search !== null || hidden !== null ? '&' : '?'}page=${page}`;

        console.log('요청url:' + defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.noticeList;
            let noticeCnts = res.data.noticeCnts;
            setNoticeList([...list]);
            setPageInfo({...pageInfo});
            setNoticeCnts({...noticeCnts});
            setErrorMsg(null); 
            setAfterDelOrHide(false); 
            // errorMsg를 null로 비워줘야 에러 발생 이후 새로운 요청이 성공했을때에 
            // 예외처리(errorMsg에 값이 있을때 랜더링되도록하는)if문에 걸리지 않는다
        })
        .catch(err=> {
            console.log(err);
            if(err.response && err.response.data) {
                console.log('err.response.data: ' + err.response.data);
                setErrorMsg(err.response.data);
                setNoticeCnts({'totalCnt':0, 'displayCnt':0, 'hiddenCnt':0});
            }
        })
    }

    const handlePageNo = (pageNo) => {
        setPage(pageNo);
        console.log('***page state변경:' + page);
        getNoticeList(search, hidden, page); // 페이지변경시 필터 유지, 검색어 유지해야함
    };
    const handleFilterChange = (hidden) => {
        getNoticeList(search, hidden, 1); // 필터변경시 페이지 리셋, 검색어는 유지해야함
        setActiveFilter(hidden);
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };
    const handleSearch = () => {
        console.log('검색 수행');
        setSearch(tmpSearch);
        setHidden(null);
        setActiveFilter(null);
        getNoticeList(tmpSearch, null, 1); // 검색수행시 페이지 리셋, 필터 리셋해야함 
        // cf. setSearch와 setHidden은 비동기적으로 state를 업데이트하기 때문에(즉시 업데이트x) 
        // tmpSearch대신 search, null대신 hidden을 넣으면 업데이트 이전의 state값이 들어가게된다
    };

    
    // 체크 선택과 해제
    const [checkItems, setCheckItems] = useState([]); // 체크된 Notice의 no들을 담을 배열
    const handleSingleCheck = (checked, no) => {
        if (checked) {
            setCheckItems(prev => [...prev, no]); // 단일 선택시 체크된 no을 배열에 추가
        } else {
            setCheckItems(checkItems.filter((element) => element !== no)); // 단일 선택해제시 체크된 no을 제외한 배열 (필터)
        }
    };
    const handleAllCheck = (checked) => {
        if(checked) { // 전체 선택시 모든 Notice의 no을 담은 배열로 state업데이트
            const idArray = [];
            noticeList.forEach((element) => idArray.push(element.no));
            setCheckItems(idArray);
        }
        else { // 전체 선택해제시 빈배열로 state업데이트
            setCheckItems([]);
        }
    }

    // 일괄 숨김처리
    const hideNotice = () => {
        console.log('체크된 항목:' + checkItems);
        axios.get(`http://localhost:8090/hidenotice/${checkItems}`)
        .then(res => {
            setCheckItems([]);
            setAfterDelOrHide(true); // 의존성배열에 추가된 sate를 변경시킴으로써 목록을 다시 조회하여 렌더링되게함
        })
        .catch(err => {
            console.log(err);
        })
    }

    // 일괄 삭제처리
    const deleteNotice = () => {
        console.log('체크된 항목:' + checkItems);
        axios.delete(`http://localhost:8090/deletenotice/${checkItems}`)
        .then(res => {
            setCheckItems([]);
            setAfterDelOrHide(true); // 의존성배열에 추가된 sate를 변경시킴으로써 목록을 다시 조회하여 렌더링되게함
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>공지사항 목록</div>
            <div className={styleFrame.sectionContents}>
                <div className={style.filterBtns}>
                    <div>
                        <span className={`${style.filterBtn} ${activeFilter===null? style.filterActive :''}`} onClick={() => handleFilterChange(null)}>전체 : {noticeCnts.totalCnt}</span>
                        <span className={`${style.filterBtn} ${activeFilter==='N'? style.filterActive :''}`} onClick={() => handleFilterChange("N")}>표시 : {noticeCnts.displayCnt}</span>
                        <span className={`${style.filterBtn} ${activeFilter==='Y'? style.filterActive :''}`} onClick={() => handleFilterChange("Y")}>숨김 : {noticeCnts.hiddenCnt}</span>
                    </div>
                    <div className={style.searchBar}>
                        <input type="text" onChange={handleSearchChange}/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} onClick={handleSearch}/>
                    </div>
                </div>
                <div className={style.checkboxAndButtons}>
                    <span>
                        <input type="checkbox" className={style.checkbox} name='select-all' 
                                            onChange={(e)=>handleAllCheck(e.target.checked)} 
                                            checked={checkItems.length===noticeList.length? true: false}/>
                        <span>&nbsp;선택</span>
                    </span>
                    <span>
                        <input type="button" value="숨김" onClick={hideNotice}/>
                        <input type="button" value="숨김해제" onClick={hideNotice}/>
                        <input type="button" value="삭제" onClick={deleteNotice}/>
                    </span>
                </div>

                <table className={style.table}>
                    <tbody>
                        {errorMsg? (
                            <tr><td colSpan="4" className={style.errMsg}>{errorMsg}</td></tr>
                        ) : (
                            noticeList.length>0 && noticeList.map(post => {
                                return (
                                <tr key={post.no}>
                                    <td>
                                        <input type="checkbox" className={style.checkbox} name={`select-${post.no}`}
                                                            onChange={(e)=>handleSingleCheck(e.target.checked, post.no)}
                                                            checked={checkItems.includes(post.no)? true: false}/> 
                                    </td>
                                    <td>{post.title}</td>
                                    <td>{formatDate(post.writeDate)}</td>
                                    <td>
                                        {post.isHidden==='N'? (
                                        <img src={"/viewIcon-bold.png" } alt="" className={style.openEye}/>
                                        ) : (
                                        <img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/>
                                        )}
                                    </td>
                                </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>


                <div className={style.paging}>
                    <span>&lt;</span>
                    <span className={style.activePage} style={{background:'#f8f8f8'}}>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>&gt;</span>
                </div>
            </div>
        </div>
        </>
    );
}
export default AdminNotice;