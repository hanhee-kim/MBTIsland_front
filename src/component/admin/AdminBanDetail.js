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
import { urlroot } from "../../config";

const AdminBanDetail = () => {
    const [report, setReport] = useState({
        num:1,
        userId:"user01",
        warningCount: 3,
        banCount: 1,
        isBanned:"활동 정지",
        banStartDate:"2023.11.11",
        banEndDate:"2023.11.25"
    });

    const [records, setRecords] = useState([
        {
            num:1,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:2,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:3,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },        
        {
            num:4,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:5,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:6,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:7,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:8,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:9,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        },
        {
            num:10,
            reportReason:"광고",
            reportType:"게시글",
            reportDate:"2023.11.04",
            isCompleted:"미처리"
        }
    ]);

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    }

    // 페이징 상태 값
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    // url에 파라미터로 줄 변수 repage
    const reqBoardList = (repage) => {
        // if(!repage) repage = 1;
        axios.get(`${urlroot}/adminreport/${repage}`)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;

            setRecords([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
        })
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
                        <td>{report.userId}</td>
                    </tr>
                    <tr>
                        <td>경고 횟수</td>
                        <td>{report.warningCount}</td>
                    </tr>
                    <tr>
                        <td>정지 횟수</td>
                        <td>{report.banCount}</td>
                    </tr>
                    <tr>
                        <td>상태</td>
                        <td>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div>{report.isBanned}</div>
                                <div><Button style={buttonStyle}>해제</Button></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>정지 기간</td>
                        <td>{report.banStartDate} ~ {report.banEndDate}</td>
                    </tr>
                </table><br/>

                {/* 게시글 영역 */}
                
                {/* 분류 영역 */}
                <div className={style.sortDiv}>
                    신고이력
                </div>
                {/* 분류 영역 */}

                {/* 게시글 영역 */}
                <table className={style.boardTable}>
                    <thead>
                        <tr key="0">
                            <td>신고 사유</td><td>신고 유형</td><td>신고일</td><td>처리</td>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length !== 0 && records.map(record => {
                            return (
                                <tr key={record.num}>
                                    <td>{record.reportReason}</td>
                                    <td>{record.reportType}</td>
                                    <td>{record.reportDate}</td>
                                    <td>{record.isCompleted}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table><br/>
                {/* 게시글 영역 */}

                {/* 하단 버튼 영역 */}
                <div className={style.buttonDiv}>
                    <Button style={buttonStyle}>목록</Button>
                </div>

                {/* 페이징 영역 */}
                <Pagination aria-label="Page navigation example" className={style.pagingLabel}>
                    {
                        pageInfo.curPage===1?
                        <PaginationItem disabled>
                            <PaginationLink previous href="#" />
                        </PaginationItem>:
                        <PaginationItem>
                            {/* <PaginationLink previous href={"/list/" + (pageInfo.curPage - 1)} /> */}
                            <PaginationLink previous onClick={()=>reqBoardList(pageInfo.curPage-1)}/>
                        </PaginationItem>
                    }

                    {                   
                        pageBtn.map(item=>{
                            return(
                                <PaginationItem key={item} className={item===pageInfo.curPage? 'active':''}>
                                    {/* <PaginationLink href={"/list/" + item}> */}
                                    {/* 고유한 id를 넘겨줌 */}
                                    <PaginationLink onClick={() => reqBoardList(item)}>
                                        {item}
                                    </PaginationLink>
                                </PaginationItem>                            
                            )
                        })
                    }

                    {
                        <PaginationItem disabled={pageInfo.curPage === pageInfo.endPage}>
                            {/* <PaginationLink next href={"/list/" + (pageInfo.curPage + 1)}/> */}
                            <PaginationLink next onClick={()=>reqBoardList(pageInfo.curPage+1)}/>
                        </PaginationItem>
                    }
                </Pagination>
                {/* 페이징 영역 */}

            </div>
        </div>
        </>
    );
}

export default AdminBanDetail;