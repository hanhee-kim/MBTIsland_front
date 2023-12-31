import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import AdminNav from "./AdminNav";
import axios from "axios";
import { urlroot } from "../../config";
import Swal from "sweetalert2";

const AdminNotice = () => {
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const location = useLocation();
    useEffect(() => {
        // 로컬 스토리지에서 이전목록값을 읽어서 렌더링되게해야함
        const savedState = localStorage.getItem('adminNoticeValue');
        const initialState = savedState ? JSON.parse(savedState) : { search: null, hidden: null, page: 1 };
    
        // 상세/폼에서 돌아온 경우에만 로컬스토리지의 이전목록값 사용
        if (location.state && location.state.fromDetail) {
            setSearch(initialState.search);
            setHidden(initialState.hidden);
            setPage(initialState.page);
            setActiveFilter(initialState.hidden);
            getNoticeList(initialState.search, initialState.hidden, initialState.page);
        } else {
            // 그 외의 경우에는 초기값 사용하여 렌더링
            setSearch(null);
            setHidden(null);
            setActiveFilter(null);
            setPage(1);
            getNoticeList(null, null, 1);
        }

        // 로컬스토리지 초기화
        localStorage.removeItem("adminNoticeValue");
    }, []);


    // 내비 바의 '공지사항 목록' 재클릭시 초기상태로 재렌더링하게함
    useEffect(() => {
        getNoticeList(null, null, 1);
        setSearch(null);
        setHidden(null);
        setPage(1);
        setPageInfo({});
        setTmpSearch(null);
        setActiveFilter(null);
        setErrorMsg(null);
    }, [location]);

    // localStorage에서 목록의 값을 읽어서 렌더링
    useEffect(() => {
        if (!location.state || !location.state.fromDetail) {
            const savedState = localStorage.getItem('adminNoticeValue');
            const initialState = savedState ? JSON.parse(savedState) : { search: null, hidden: null, page: 1 };

            setSearch(initialState.search);
            setHidden(initialState.hidden);
            setPage(initialState.page);

            getNoticeList(initialState.search, initialState.hidden, initialState.page);
        }
    }, []);


    useEffect(() => {
        getNoticeList(search, hidden, page);
    }, [afterDelOrHide]); // 의존성배열을 비우면 useEffect는 컴포넌트가 처음 렌더링될때에만 실행되고 state를 넣으면 state값이 업데이트될때마다 실행됨


    const updateLocalStorage = (newValue) => {
        const currentValue = {
            search: search,
            hidden: hidden,
            page: page,
        };
        //console.log('$$$ 로컬스토리지에 저장될 currentValue: ', currentValue);
        localStorage.setItem('adminNoticeValue', JSON.stringify({ ...currentValue, ...newValue }));
    };


    // 게시글 제목 클릭시 동적으로 라우터 링크 생성하고 연결
    const navigate = useNavigate();
    const makeFlexibleLink = (post) => {
        const linkTo = `/adminnoticeform/${post.no}`; // 관리자페이지의 공지사항폼 컴포넌트
        navigate(linkTo, {replace:false});
    }

    const getNoticeList = (search, hidden, page) => {
        let defaultUrl = `${urlroot}/noticelist`;

        if (search !== null) defaultUrl += `?search=${search}`;
        if (hidden !== null) defaultUrl += `${search !== null ? '&' : '?'}hidden=${hidden}`;
        if (page !== null) defaultUrl += `${search !== null || hidden !== null ? '&' : '?'}page=${page}`;

        //console.log('요청url:' + defaultUrl);

        axios.get(defaultUrl)
        .then(res=> {
            //console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.noticeList;
            let noticeCnts = res.data.noticeCnts;
            setNoticeList([...list]);
            setPageInfo({...pageInfo});
            setNoticeCnts({...noticeCnts});
            setErrorMsg(null); 
            // errorMsg를 null로 비워줘야 에러 발생 이후 새로운 요청이 성공했을때에 
            // 예외처리(errorMsg에 값이 있을때 랜더링되도록하는)if문에 걸리지 않는다
            setAfterDelOrHide(false); // 일괄삭제 혹은 일괄숨김처리 후 목록을 새로 받아 재렌더링하게함
            setHidden(hidden); // 필터적용된 상태에서 페이지이동시 필터유지되게함
        })
        .catch(err=> {
            //console.log(err);
            if(err.response && err.response.data) {
                //console.log('err.response.data: ' + err.response.data);
                setErrorMsg(err.response.data);
                setNoticeCnts({'totalCnt':0, 'displayCnt':0, 'hiddenCnt':0});
            }
        })
    }

    const handlePageNo = (pageNo) => {
        setPage(pageNo);
        setCheckItems([]);
        //console.log('***클릭된 pageNo:' + pageNo);
        //console.log('***변경된 state page값:' + page); // state는 ui보다 한박자 늦다
        //console.log('현재 적용되는 필터값: ' + hidden);
        //console.log('현재 적용되는 검색어: ' + search);
        getNoticeList(search, hidden, pageNo); // 페이지변경시 필터 유지, 검색어 유지해야함

        updateLocalStorage({ page: pageNo });
    };
    const handleFilterChange = (hidden) => {
        getNoticeList(search, hidden, 1); // 필터변경시 페이지 리셋, 검색어는 유지해야함
        setActiveFilter(hidden);
        setCheckItems([]);

        updateLocalStorage({ hidden: hidden });
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTmpSearch(searchTerm);
    };
    const handleSearch = () => {
        //console.log('검색 수행');
        setSearch(tmpSearch);
        setHidden(null);
        setActiveFilter(null);
        setCheckItems([]);
        getNoticeList(tmpSearch, null, 1); // 검색수행시 페이지 리셋, 필터 리셋해야함 
        // cf. setSearch와 setHidden은 비동기적으로 state를 업데이트하기 때문에(즉시 업데이트x) 
        // tmpSearch대신 search, null대신 hidden을 넣으면 업데이트 이전의 state값이 들어가게된다

        updateLocalStorage({ search: tmpSearch });
    };
    // 엔터키로 검색 수행
    const handleKeyPress = (e) => {
        if (e.key==="Enter") handleSearch();
    }

    
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
        // console.log('체크된 항목:' + checkItems);
        if(checkItems.length===0) {
            Swal.fire({
                title: "체크된 항목이 없습니다.",
                icon: "warning",
            });
            return;
        }
        Swal.fire({
            title: '선택항목을 처리하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${urlroot}/hidenotice/${checkItems}`)
                    .then(res => {
                        Swal.fire({
                            title: "완료되었습니다.",
                            icon: "success",
                        });
                        setCheckItems([]);
                        setAfterDelOrHide(true); // 의존성배열에 추가된 sate를 변경시킴으로써 목록을 다시 조회하여 렌더링되게함
                    })
                    .catch(err => {
                        //console.log(err);
                        Swal.fire({
                            title: 'Error',
                            icon: 'error'
                        });
                    });
            }
        });
    }

    // 일괄 삭제처리
    const deleteNotice = () => {
        // console.log('체크된 항목:' + checkItems);
        if(checkItems.length===0) {
            Swal.fire({
                title: "체크된 항목이 없습니다.",
                icon: "warning",
            });
            return;
        }
        Swal.fire({
            title: '선택항목을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${urlroot}/deletenotice/${checkItems}`)
                    .then(res => {
                        Swal.fire({
                            title: "완료되었습니다.",
                            icon: "success",
                        });
                        setCheckItems([]);
                        setAfterDelOrHide(true); // 의존성배열에 추가된 sate를 변경시킴으로써 목록을 다시 조회하여 렌더링되게함
                    })
                    .catch(err => {
                        //console.log(err);
                        Swal.fire({
                            title: 'Error',
                            icon: 'error'
                        });
                    });
            }
        });
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
                        <input type="text" onChange={handleSearchChange} onKeyDown={(e)=>handleKeyPress(e)}/>
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
                        {hidden===null && <input type="button" value="상태변경" onClick={hideNotice}/>}
                        {hidden==='N' && <input type="button" value="숨김" onClick={hideNotice}/>}
                        {hidden==='Y' && <input type="button" value="숨김해제" onClick={hideNotice}/>}
                        <input type="button" value="삭제" onClick={deleteNotice}/>
                    </span>
                </div>

                <table className={style.table}>
                    <tbody>
                        {errorMsg? (
                            // <tr><td colSpan="4" className={style.errMsg}>{errorMsg}</td></tr>
                            <tr><td colSpan="4" className={style.errMsg}>{JSON.stringify(errorMsg)}</td></tr>
                        ) : (
                            noticeList.length>0 && noticeList.map(post => {
                                return (
                                <tr key={post.no}>
                                    <td>
                                        <input type="checkbox" className={style.checkbox} name={`select-${post.no}`}
                                                            onChange={(e)=>handleSingleCheck(e.target.checked, post.no)}
                                                            checked={checkItems.includes(post.no)? true: false}/> 
                                    </td>
                                    <td onClick={()=>makeFlexibleLink(post)}>{post.title}</td>
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

                {PaginationInside()}

            </div>
        </div>
        </>
    );
}
export default AdminNotice;