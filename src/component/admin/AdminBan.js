import {
    FormGroup,
    Col,
    Input,
    Button
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNav from "./AdminNav";
import { urlroot } from "../../config";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminReport.module.css";

const AdminBan = () => {
    const [banList, setBanList] = useState([]);

    // 필터링 값
    const [filter, setFilter] = useState("all");

    // 페이징 상태 값
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});

    // 검색이 되었는지 여부
    // 검색되면 true로
    const [isSearch, setIsSearch] = useState(false);
    const [username, setUsername] = useState("");

    // 절대시간
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // navigate
    const navigate = useNavigate();

    // reportDetail 이동
    const goBanDetail = (username) => {
        let defaultUrl = `/adminban/detail/${username}`;
        navigate(defaultUrl, {replace:false});
    };

    // 밴 목록 조회
    const getBanList = (page, filter) => {
        let defaultUrl = `${urlroot}/adminban?page=${page}&filter=${filter}`;
        if(username !== "") defaultUrl += `&username=${username}`;

        axios.get(defaultUrl)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let banList = res.data.banList;

            setBanList([...banList]);
            
            setPage(page);
            setPageInfo({...pageInfo});
        })
        .catch(err=> {
            // console.log(err);
            // setBanList([]);
            // setPageInfo({});
        })
    };

    // page 핸들링
    const handlePage = (pageNo) => {
        setPage(pageNo);
        getBanList(pageNo, filter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // filter 핸들링
    const handleFilter = (filter) => {
        setFilter(filter);
        getBanList(page, filter);
    };

    // search 핸들링 (boardType, reportType)
    const handleSearch = () => {
        getBanList(page, filter);
    };

    useEffect(() => {
        getBanList(page, filter);
    }, []);

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
        <>
        <div>
            <div className={styleFrame.sectionTitle}>신고 목록</div>
            <div className={styleFrame.sectionContents}>
                {/* 검색 영역 */}
                <FormGroup row className={style.sectionSearch}>
                    <Col sm={2}>
                        &nbsp;&nbsp;&nbsp;&nbsp;아이디
                    </Col>
                    <Col sm={2}>
                        <Input type='text' name="username" onChange={(e)=>setUsername(e.target.value)}/>
                    </Col>
                    <Col sm={2}>
                        <Button style={buttonStyle} onClick={()=>handleSearch()}>검색</Button>
                    </Col>
                </FormGroup>
            
                {/* 분류 영역 */}
                <div className={style.filterBtns}>
                    <div>
                        <span className={`${style.filterBtn} ${filter==="all"? style.filterActive :""}`} onClick={() => handleFilter("all")}>전체</span>
                        <span className={`${style.filterBtn} ${filter==="Y"? style.filterActive :""}`} onClick={() => handleFilter("Y")}>활동 정지</span>
                        <span className={`${style.filterBtn} ${filter==="N"? style.filterActive :""}`} onClick={() => handleFilter("N")}>정상</span>
                    </div>
                </div>

                {/* 게시글 영역 */}
                <table className={style.boardTable}>
                    <thead>
                        <tr key="0">
                            <td>아이디</td><td>경고 횟수</td><td>정지 횟수</td><td>상태</td><td>정지 기간</td>
                        </tr>
                    </thead>
                    <tbody>
                        {banList.length !== 0 && banList.map(ban => {
                            return (
                                    <tr key={ban.userIdx} className={style.sectionTr} onClick={()=>goBanDetail(ban.username)}>
                                        <td>{ban.username}</td>
                                        <td>{ban.userWarnCnt}</td>
                                        <td>{ban.userBanCnt}</td>
                                        <td>{ban.isBanned==="Y"? <>정지</>:<>정상</>}</td>
                                        <td>{ban.banDate===null?<></>:<>~ {formatDate(ban.banDate)}</>}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table><br/>

                {/* 페이징 영역 */}
                {banList.length===0?<></>:<PaginationInside/>}
            </div>
        </div>
        </>
    );
}
export default AdminBan;