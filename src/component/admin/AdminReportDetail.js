import {
    Button
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminReport.module.css";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { urlroot } from "../../config";

const AdminReportDetail = () => {

    // 글 번호, 페이지 번호, 필터링, 게시글 타입, 신고 유형
    const {no, page, filter, boardType, reportType} = useParams();

    const [report, setReport] = useState({
        // no:1,
        // reportedId:"user01",
        // tableType:"MB-TMI",
        // reportType:"게시글",
        // title:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유!",
        // content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
        // files:"1,2,3",
        // reporterId:"user99",
        // reportDate:"2023.12.04",
        // reportReason:"광고",
        // isCompleted:"미처리",
        // isWarned:"미처리"
    });

    // 절대시간
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 이미지 목록
    const [imgList, setImgList] = useState([]);

    useEffect(()=> {
        getReportDetail();
    }, []);

    // 신고 조회
    const getReportDetail = () => {
        let defaultUrl = `${urlroot}/reportdetail/${no}`;

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let report = res.data.report;

            // 사진 set
            if(report.fileIdxs !== null) {
                let imgArr = report.fileIdxs.split(",");
                setImgList(imgArr);
            }

            // 게시글 set
            setReport(report);
        })
        .catch(err=> {
            console.log(err);
        })
    };

    // 목록 가기
    const navigate = useNavigate();
    const goToPreviousList = () => {
        navigate(-1);
    };

    // 경고
    const warning = (username, reportType, tableType, postNo, commentNo) => {
        let defaultUrl = `${urlroot}/reportwarning?username=${username}&reportType=${reportType}&tableType=${tableType}`;
        if(postNo) defaultUrl += `&postNo=${postNo}`;
        if(commentNo) defaultUrl += `&commentNo=${commentNo}`;

        console.log(defaultUrl);

        axios.post(defaultUrl)
        .then(res=> {
            alert("경고 처리 완료");
            getReportDetail();
        })
        .catch(err=> {
            console.log(err);
        })
    };

    // 처리
    const processing = (reportType, tableType, postNo, commentNo) => {
        let defaultUrl = `${urlroot}/reportprocess?reportType=${reportType}&tableType=${tableType}`;
        if(postNo) defaultUrl += `&postNo=${postNo}`;
        if(commentNo) defaultUrl += `&commentNo=${commentNo}`;

        axios.post(defaultUrl)
        .then(res=> {
            alert("처리 완료");
            getReportDetail();
        })
        .catch(err=> {
            console.log(err);
        })
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
                {/* 유형: 게시글 */}
                <table className={style.detailTable}>
                    <tr>
                        <td>피신고자</td>
                        <td>{report.reportedId}</td>
                    </tr>
                    <tr>
                        <td>게시판 명</td>
                        <td>{report.tableType}</td>
                    </tr>
                    <tr>
                        <td>유형</td>
                        <td>{report.reportType}</td>
                    </tr>
                    {report.reportType==="댓글" || report.tableType==="mbtwhy"?
                        <></>
                        :<tr>
                            <td>제목</td>
                            <td>{report.reportedTitle}</td>
                        </tr>
                    }
                    <tr>
                        <td>내용</td>
                        <td>{report.reportedContent}</td>
                    </tr>
                    {report.reportType==="댓글" || report.tableType==="mbtwhy"?
                        <></>
                        :<tr>
                            <td>사진</td>
                            <td>
                                {imgList.length !== 0 && imgList.map(img => {
                                    return (
                                        <img className={style.img} src={`${urlroot}/reportimg/${img}`} alt=''/>        
                                    )
                                })}
                            </td>
                        </tr>
                    }
                    <tr>
                        <td>신고자</td>
                        <td>{report.reporterId}</td>
                    </tr>
                    <tr>
                        <td>신고일</td>
                        <td>{formatDate(report.reportDate)}</td>
                    </tr>
                    <tr>
                        <td>신고 사유</td>
                        <td>{report.reportReason}</td>
                    </tr>
                    <tr>
                        <td>처리 여부</td>
                        <td>{report.isCompleted==="Y"?<>처리</>:<>미처리</>}</td>
                    </tr>
                    <tr>
                        <td>경고 여부</td>
                        <td>{report.isWarned==="Y"?<>경고</>:<>미경고</>}</td>
                    </tr>
                </table><br/>
                {/* 게시글 영역 */}

                {/* 하단 버튼 영역 */}
                <div className={style.buttonDiv}>
                    <div>
                        <Button style={buttonStyle} onClick={()=>goToPreviousList()}>목록</Button>
                    </div>
                    {report.isCompleted==="Y"?
                        <></>
                        :<div>
                            <Button style={buttonStyle} onClick={()=>warning(report.reportedId, report.reportType, report.tableType, report.reportedPostNo, report.reportedCommentNo)}>경고</Button>
                            <Button style={buttonStyle} onClick={()=>processing()}>처리</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminReportDetail;