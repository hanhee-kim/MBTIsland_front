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

const AdminReport = () => {
    // 신고 게시글 목록
    const [reportList, setReportList] = useState([]);

    // 페이징 상태 값
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});

    // 필터링 값
    const [filter, setFilter] = useState("all");

    // 게시판 유형
    const [boardType, setBoardType] = useState("all");

    // 신고 사유
    const [reportType, setReportType] = useState("전체");

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
    const goReportDetail = (no) => {
        let defaultUrl = `/adminreport/detail/${no}`;
                            // (page? `/${page}` : "") +
                            // (filter? `/${filter}` : "") +
                            // (boardType? `/${boardType}` : "") +
                            // (reportType? `/${reportType}` : "");
        navigate(defaultUrl, {replace:false});
    };

    // 신고 목록 조회
    const getReportList = (page, filter) => {
        axios.get(`${urlroot}/adminreport/${page}/${filter}/${boardType}/${reportType}`)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let reportList = res.data.reportList;

            setReportList([...reportList]);
            
            setPage(page);
            setPageInfo({...pageInfo});
        })
        .catch(err=> {
            //console.log(err);
            // setReportList([]);
            // setPageInfo({});
        })
    };

    useEffect(() => {
        getReportList(page, filter);
    }, []);

    // page 핸들링
    const handlePage = (pageNo) => {
        setPage(pageNo);
        getReportList(pageNo, filter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // filter 핸들링
    const handleFilter = (filter) => {
        setFilter(filter);
        getReportList(page, filter);
    };

    // search 핸들링
    const handleSearch = () => {
        getReportList(page, filter);
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

    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>신고 목록</div>
            <div className={styleFrame.sectionContents}>
                {/* 검색 영역 */}
                <FormGroup row className={style.sectionSearch}>
                    <Col sm={2}>
                        &nbsp;&nbsp;&nbsp;&nbsp;게시판 명
                    </Col>
                    <Col sm={2}>
                        <Input type='select' name="type" onChange={(e)=>setBoardType(e.target.value)}>
                            <option value='all'>전체</option>
                            <option value='mbtmi'>MB-TMI</option>
                            <option value='mbtwhy'>MBT-Why</option>
                            <option value='mbattle'>MBattle</option>
                        </Input>
                    </Col>
                    <Col sm={2}>
                        &nbsp;&nbsp;&nbsp;&nbsp;신고 사유
                    </Col>
                    <Col sm={2}>
                        <Input type='select' name="type" onChange={(e)=>setReportType(e.target.value)}>
                            <option value='전체'>전체</option>
                            <option value='광고'>광고</option>
                            <option value='욕설'>욕설</option>
                            <option value='도배'>도배</option>
                        </Input>
                    </Col>
                    <Col sm={4}>
                        <Button style={buttonStyle} onClick={()=>handleSearch()}>검색</Button>
                    </Col>
                </FormGroup>
            
                {/* 분류 영역 */}
                <div className={style.filterBtns}>
                    <div>
                        <span className={`${style.filterBtn} ${filter==="all"? style.filterActive :""}`} onClick={() => handleFilter("all")}>전체</span>
                        <span className={`${style.filterBtn} ${filter==="Y"? style.filterActive :""}`} onClick={() => handleFilter("Y")}>처리</span>
                        <span className={`${style.filterBtn} ${filter==="N"? style.filterActive :""}`} onClick={() => handleFilter("N")}>미처리</span>
                    </div>
                </div>

                {/* 게시글 영역 */}
                <table className={style.boardTable}>
                    <thead>
                        <tr key="0">
                            <td>피신고자</td><td>내용</td><td>신고자</td><td>신고일</td><td>신고 사유</td><td>처리 여부</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.length !== 0 && reportList.map(report => {
                            return (
                                    <tr key={report.no} className={style.sectionTr} onClick={()=>goReportDetail(report.no)}>
                                        <td>{report.reportedId}</td>
                                        <td><div className={style.boardContent}>{(report.reportedTitle)!==null?(report.reportedTitle):(report.reportedContent)}</div></td>
                                        <td>{report.reporterId}</td>
                                        <td>{formatDate(report.reportDate)}</td>
                                        <td>{report.reportReason}</td>
                                        <td>{(report.isCompleted)==="Y"? <>처리</> : <>미처리</>}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table><br/>

                {/* 페이징 영역 */}
                {reportList.length===0?<></>:<PaginationInside/>}
            </div>
        </div>
        </>
    );
}
export default AdminReport;