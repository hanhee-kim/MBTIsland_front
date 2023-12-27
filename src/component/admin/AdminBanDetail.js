import {
    Button
} from "reactstrap";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';
import AdminNav from "./AdminNav";
import { urlroot } from "../../config";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminReport.module.css";

const AdminBanDetail = () => {
    const {username} = useParams();

    // 경고 내역
    const [ban, setBan] = useState({});

    // 신고 목록
    const [reportList, setReportList] = useState([]);

    // 페이징 상태 값
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});

    // 절대시간
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 목록 가기
    const navigate = useNavigate();
    const goToPreviousList = () => {
        navigate(-1);
    };

    // reportDetail 이동
    const goReportDetail = (no) => {
        let defaultUrl = `/adminreport/detail/${no}`;
        navigate(defaultUrl, {replace:false});
    };

    // 경고 내역 조회
    const getBanDetail = () => {
        let defaultUrl = `${urlroot}/adminbandetail/${username}`;

        axios.get(defaultUrl)
        .then(res=> {
            let bannedUser = res.data.bannedUser;

            // 게시글 set
            setBan(bannedUser);
        })
        .catch(err=> {
            console.log(err);
        })
    };

    // 신고 목록 조회
    const getReportList = (page) => {
        axios.get(`${urlroot}/adminreport/${username}/${page}`)
        .then(res=> {
            let pageInfo = res.data.pageInfo;
            let reportList = res.data.reportList;


            setReportList([...reportList]);
            
            setPage(page);
            setPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
            // setReportList([]);
            // setPageInfo({});
        })
    };

    // 경고 해제
    const unfreeze = () => {
        let defaultUrl = `${urlroot}/unfreezeban/${username}`;

        axios.post(defaultUrl)
        .then(res=> {
            Swal.fire({
                title: "정지 처리 완료",
                icon: "success",
            });
            getBanDetail();
        })
        .catch(err=> {
            console.log(err);
        })
    };

    useEffect(() => {
        getBanDetail();
        getReportList(page);
    }, []);

    // page 핸들링
    const handlePage = (pageNo) => {
        setPage(pageNo);
        getReportList(pageNo);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className={styleFrame.sectionTitle}>신고 내역</div>
            <div className={styleFrame.sectionContents}>
            
                {/* 게시글 영역 */}
                <table className={style.detailTable}>
                    <tr>
                        <td>아이디</td>
                        <td>{ban.username}</td>
                    </tr>
                    <tr>
                        <td>경고 횟수</td>
                        <td>{ban.userWarnCnt}</td>
                    </tr>
                    <tr>
                        <td>정지 횟수</td>
                        <td>{ban.userBanCnt}</td>
                    </tr>
                    <tr>
                        <td>상태</td>
                        <td>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div>{ban.isBanned==="Y"? <>정지</>:<>정상</>}</div>
                                {ban.isBanned==="Y"?
                                    <div><Button style={buttonStyle} onClick={()=>unfreeze()}>해제</Button></div>
                                    :<></>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>정지 기간</td>
                        <td>{ban.banDate===null?<></>:<>~ {formatDate(ban.banDate)}</>}</td>
                    </tr>
                </table><br/>
                
                {/* 분류 영역 */}
                <div className={style.sortDiv}>
                    신고이력
                </div>

                {/* 게시글 영역 */}
                <table className={style.boardTable}>
                    <thead>
                        <tr key="0">
                            <td>신고 사유</td><td>신고 유형</td><td>신고일</td><td>처리</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.length !== 0 && reportList.map(report => {
                            return (
                                <tr key={report.no} className={style.sectionTr} onClick={()=>goReportDetail(report.no)}>
                                    <td>{report.reportReason}</td>
                                    <td>{report.reportType}</td>
                                    <td>{formatDate(report.reportDate)}</td>
                                    <td>{(report.isCompleted)==="Y"? <>처리</> : <>미처리</>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table><br/>

                {/* 하단 버튼 영역 */}
                <div className={style.buttonDiv}>
                    <Button style={buttonStyle} onClick={()=>goToPreviousList()}>목록</Button>
                </div>

                {/* 페이징 영역 */}
                {reportList.length===0?<></>:<PaginationInside/>}

            </div>
        </div>
        </>
    );
}

export default AdminBanDetail;