import style from "../../css/notice/Notice.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Notice = () => {

    const [noticeList, setNoticeList] = useState([]); // 페이지당 게시글목록(숨김처리x) 
    const [noticeCnt, setNoticeCnt] = useState(0); // 게시글 수(숨김처리x)
    const [search, setSearch] = useState(null); // 검색어
    const [page, setPage] = useState(1); // 페이지 이동번호
    const [pageInfo, setPageInfo] = useState({}); // 페이지 정보(전체페이지, 현재페이지, 시작페이지번호, 끝페이지번호)
    const [tmpSearch, setTmpSearch] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        getNoticeList(search, page);
    }, []);
    
    const getNoticeList = (search, page) => {
        let defaultUrl = 'http://localhost:8090/noticelist?hidden=N';
        if (search !== null) defaultUrl += `&search=${search}`;
        if (page !== null) defaultUrl += `&page=${page}`;

        console.log('요청url:' + defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.noticeList;
            let noticeCnt = res.data.noticeCnts.displayCnt;
            setNoticeList([...list]);
            setPageInfo({...pageInfo});
            setNoticeCnt(noticeCnt);
            setErrorMsg(null);
        })
        .catch(err=> {
            console.log(err);
            if(err.response && err.response.data) {
                console.log('err.response.data: ' + err.response.data);
                setErrorMsg(err.response.data);
                setNoticeCnt(0);
                setPageInfo({});
            }
        })
    }

    const handlePageNo = (pageNo) => {
        setPage(pageNo);
        console.log('현재 적용되는 검색어: ' + search);
        getNoticeList(search, pageNo); // setPage(pageNo)는 업데이트가 지연되기 때문에, state인 page가 아니라 전달인자 pageNo로 요청해야함
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };
    const handleSearch = () => {
        setSearch(tmpSearch);
        getNoticeList(tmpSearch, 1);
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

                <div className={style.boardTitle} >공지사항</div>

                <div className={style.aboveTable}>
                    <h5>총 {noticeCnt}건 현재 {pageInfo.curPage}/{pageInfo.allPage}페이지</h5>
                    <div className={style.searchBar}>
                        <input type="text" onChange={handleSearchChange}/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} onClick={handleSearch}/>
                    </div>
                </div>

                <table className={style.table}>
                    <tbody>
                        {errorMsg? (
                            <tr><td colSpan="4" className={style.errMsg}>{errorMsg}</td></tr>
                        ) : (
                            noticeList.length>0 && noticeList.map(post => {
                                return(
                                <tr key={post.no}>
                                    <td>[공지]</td>
                                    <td>{post.title}</td>
                                    <td>{formatDate(post.writeDate)}</td>
                                    <td><img src={"/view-icon.png" } alt="view" className={style.viewIcon}/>{post.viewCnt}</td>
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
export default Notice;