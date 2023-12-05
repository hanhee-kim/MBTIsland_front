import {
    Nav,
    NavItem,
    NavLink,
    FormGroup,
    Col,
    Input,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink } from "reactstrap";
import { useState } from "react";
import axios from 'axios';
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminReport.module.css";
import React from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminReportDetail = () => {
    const [report, setReport] = useState({
        num:1,
        reportedId:"user01",
        tableType:"MB-TMI",
        reportType:"게시글",
        title:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유!",
        content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
        files:"1,2,3",
        reporterId:"user99",
        reportDate:"2023.12.04",
        reportReason:"광고",
        isCompleted:"미처리",
        isWarned:"미처리"
    });

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    }

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
                    <tr>
                        <td>제목</td>
                        <td>{report.title}</td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>{report.content}</td>
                    </tr>
                    <tr>
                        <td>사진</td>
                        <td>{report.files}</td>
                    </tr>
                    <tr>
                        <td>신고자</td>
                        <td>{report.reporterId}</td>
                    </tr>
                    <tr>
                        <td>신고일</td>
                        <td>{report.reportDate}</td>
                    </tr>
                    <tr>
                        <td>신고 사유</td>
                        <td>{report.reportReason}</td>
                    </tr>
                    <tr>
                        <td>처리 여부</td>
                        <td>{report.isCompleted}</td>
                    </tr>
                    <tr>
                        <td>경고 여부</td>
                        <td>{report.isWarned}</td>
                    </tr>
                </table><br/>
                {/* 게시글 영역 */}

                {/* 게시글 영역 */}
                {/* 유형: 댓글 */}
                {/* <table className={style.reportDetailTable}>
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
                        <td>댓글</td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>{report.content}</td>
                    </tr>
                    <tr>
                        <td>신고자</td>
                        <td>{report.reporterId}</td>
                    </tr>
                    <tr>
                        <td>신고일</td>
                        <td>{report.reportDate}</td>
                    </tr>
                    <tr>
                        <td>신고 사유</td>
                        <td>{report.reportReason}</td>
                    </tr>
                    <tr>
                        <td>처리 여부</td>
                        <td>{report.isCompleted}</td>
                    </tr>
                    <tr>
                        <td>경고 여부</td>
                        <td>{report.isWarned}</td>
                    </tr>
                </table><br/> */}
                {/* 게시글 영역 */}

                {/* 하단 버튼 영역 */}
                <div className={style.buttonDiv}>
                    <div>
                        <Button style={buttonStyle}>목록</Button>
                    </div>
                    <div>
                        <Button style={buttonStyle}>경고</Button>
                        <Button style={buttonStyle}>처리</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminReportDetail;