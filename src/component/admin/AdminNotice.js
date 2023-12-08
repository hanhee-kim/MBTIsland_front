import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import axios from "axios";

const AdminNotice = () => {

    // const { page } = useParams(); // URL에서 현재페이지 파라미터 추출
    const [page, setPage] = useState(1);
    const [noticeList, setNoticeList] = useState([]); // 페이지당 게시글목록 
    const [noticeCnts, setNoticeCnts] = useState({'totalCnt':0, 'displayCnt':0, 'hiddenCnt':0}); // 표시할 게시글수들
    const [pageInfo, setPageInfo] = useState({}); // 페이지 정보(전체페이지, 현재페이지, 시작페이지번호, 끝페이지번호)
    const [tmpSearch, setTmpSearch] = useState(null); // 임시 검색어
    const [search, setSearch] = useState(null); // 검색어
    const [hidden, setHidden] = useState(null); // 필터
    const [activeFilter, setActiveFilter] = useState(null); // 현재 적용된 필터
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        getNoticeList(search, hidden, page);
    }, []); // 의존성배열을 비우면 useEffect는 컴포넌트가 처음 렌더링될때에만 실행되고 state를 넣으면 state값이 업데이트될때마다 실행됨

    const getNoticeList = (search, hidden, page) => {
    // const getNoticeList = async (search, hidden, page) => {

        let defaultUrl = 'http://localhost:8090/noticelist';

        if (search !== null) defaultUrl += `?search=${search}`;
        if (hidden !== null) defaultUrl += `${search !== null ? '&' : '?'}hidden=${hidden}`;
        if (hidden !== null) defaultUrl += `${page !== null ? '&' : '?'}page=${page}`;

        axios.get(defaultUrl)
            .then(res=> {
                console.log(res);
                let pageInfo = res.data.pageInfo;
                let list = res.data.noticeList;
                let noticeCnts = res.data.noticeCnts;
                setNoticeList([...list]);
                setPageInfo({...pageInfo});
                setNoticeCnts({...noticeCnts});
                setErrorMsg(null); // errorMsg를 null로 비워줘야 에러 발생 이후 새로운 요청이 성공했을때에 예외처리(errorMsg에 값이 있을때 랜더링되도록하는)if문에 걸리지 않는다
            })
            .catch(err=> {
                console.log(err);
                if(err.response && err.response.data) {
                    console.log('err.response.data: ' + err.response.data);
                    setErrorMsg(err.response.data);
                    setNoticeCnts({'totalCnt':0, 'displayCnt':0, 'hiddenCnt':0});
                }
            })

        // try {
        //     const res = await axios.get(defaultUrl);
        //     console.log(res);
    
        //     let pageInfo = res.data.pageInfo;
        //     let list = res.data.noticeList;
        //     let noticeCnts = res.data.noticeCnts;
        //     setNoticeList([...list]);
        //     setPageInfo({...pageInfo});
        //     setNoticeCnts({...noticeCnts});
        //     setErrorMsg(null); // errorMsg를 null로 비워줘야 에러 발생 이후 새로운 요청이 성공했을때에 예외처리(errorMsg에 값이 있을때 랜더링되도록하는)if문에 걸리지 않는다
        // } catch (err) {
        //     console.log(err);
        //     if(err.response && err.response.data) {
        //         console.log('err.response.data: ' + err.response.data);
        //         setErrorMsg(err.response.data);
        //     }
        // }
    }

    const handlePageChange = (pageNum) => {
        setPage(pageNum);
        navigate(`/noticelist/${page}`);
        getNoticeList(search, hidden, page);
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
        getNoticeList(tmpSearch, hidden, 1); // 검색수행시 페이지와 필터 리셋해야함
    };

    // axios 요청 전 state업데이트 보장하도록 getNoticeList를 동기요청함수로 변경해둠
    // const handleSearch = async () => { 
    //     console.log('검색 수행');
    //     setSearch(tmpSearch);
    //     setHidden(null);
    //     setActiveFilter(null);
    //     await getNoticeList(tmpSearch, hidden, 1); // 검색수행시 페이지와 필터 리셋해야함
    // };

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
                        <input type="checkbox" className={style.checkbox}/><span>&nbsp;선택</span>
                    </span>
                    <span>
                        <input type="button" value="숨김"/>
                        <input type="button" value="삭제"/>
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
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>{post.title}</td>
                                    <td>{formatDate(post.writeDate)}</td>
                                    <td>
                                        {post.isHided==='N'? (
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


                {/* <div className={style.paging}>
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
                </div> */}
                <div className={style.paging}>
                    {Array.from({ length: pageInfo.totalPages }, (_, index) => (
                    <span key={index + 1} className={page === index + 1 ? style.activePage : ""} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </span>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
export default AdminNotice;