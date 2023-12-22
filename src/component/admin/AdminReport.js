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

const AdminReport = () => {
    const [boards, setBoards] = useState([
        {
            num:1,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"미처리"
        },
        {
            num:2,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"미처리"
        },
        {
            num:3,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"미처리"
        },        
        {
            num:4,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"미처리"
        },
        {
            num:5,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"처리 완료"
        },
        {
            num:6,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"처리 완료"
        },
        {
            num:7,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"처리 완료"
        },
        {
            num:8,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"처리 완료"
        },
        {
            num:9,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"처리 완료"
        },
        {
            num:10,
            reportedId:"user01",
            content:"리얼바카라애플카지노스팸-사다리타기게임인디벳주소긴급공유! 지금 바로 들어오세요!! 당장 당장 다앋ㅇ다아당ㅈ앙당장",
            reporterId:"user99",
            reportDate:"2023.12.04",
            reportReason:"광고",
            isCompleted:"처리 완료"
        }
    ]);

    // 페이징 상태 값
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    
    // pageChange 함수를 호출한 페이징 영역에서 페이징 항목(1, 2, 3...)들을 인자로 받아옴
    const pageChange = (repage) => {
        // 검색되었다면 (isSearch가 true인 경우)
        if(isSearch) reqBoardSearch(repage);
        // 검색되지 않았다면 (isSearch가 false인 경우)
        else reqBoardList(repage);
    };

    // 검색이 되었는지 여부
    // 검색되면 true로
    const [isSearch, setIsSearch] = useState(false);

    const [boardType, setBoardType] = useState('');
    const [reportType, setReportType] = useState('');

    const searchSubmit = () => {
        reqBoardSearch(1);
    };

    // url에 파라미터로 줄 변수 repage
    const reqBoardList = (repage) => {
        // if(!repage) repage = 1;
        axios.get(`${urlroot}/adminreport/${repage}`)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;

            setBoards([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});

            // 검색이 아닌, 페이징된 상태이므로
            // 검색 여부를 위한 isSearch 변수를 false로
            setIsSearch(false);
        })
        .catch(err=> {
            console.log(err);
        })
    };


    // 페이지 별 검색
    const reqBoardSearch = (repage) => {
        if(boardType==='') {
            alert('게시판 타입을 선택하세요.');
            return;
        } else if (reportType==='') {
            alert('신고 사유를 선택하세요.');
            return;
        }

        axios.get(`${urlroot}/boardsearch/${repage}/${boardType}/${reportType}`)
        .then(res=> {
            console.log(res);

            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;

            setBoards([...list]);
            
            let btn = [];
            for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
                btn.push(i)
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});

            // 검색이 아닌, 페이징된 상태이므로
            // 검색 여부를 위한 isSearch 변수를 false로
            setIsSearch(true);
        })
        .catch(err=> {
            console.log(err);
        });
    };

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    }

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
                            <option value='all'>전체</option>
                            <option value='advertisement'>광고</option>
                            <option value='swearword'>욕설</option>
                            <option value='spam'>도배</option>
                        </Input>
                    </Col>
                    <Col sm={4}>
                        <Button style={buttonStyle} onClick={searchSubmit}>검색</Button>
                    </Col>
                </FormGroup>
                {/* 검색 영역 */}
            
                {/* 분류 영역 */}
                <div className={style.sortDiv}>
                    <div>전체</div>&nbsp;&nbsp;&nbsp;
                    <div style={{color:"#C5C5C5"}}>처리완료</div>&nbsp;&nbsp;&nbsp;
                    <div style={{color:"#C5C5C5"}}>미처리</div>&nbsp;&nbsp;&nbsp;
                </div>
                {/* 분류 영역 */}

                {/* 게시글 영역 */}
                <table className={style.boardTable}>
                    <thead>
                        <tr key="0">
                            <td>피신고자</td><td>내용</td><td>신고자</td><td>신고일</td><td>신고 사유</td><td>처리 여부</td>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.length !== 0 && boards.map(board => {
                            return (
                                    <tr key={board.num}>
                                        <td>{board.reportedId}</td>
                                        <td><div className={style.boardContent}>{board.content}</div></td>
                                        <td>{board.reporterId}</td>
                                        <td>{board.reportDate}</td>
                                        <td>{board.reportReason}</td>
                                        <td>{board.isCompleted}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table><br/>
                {/* 게시글 영역 */}

                {/* 페이징 영역 */}
                <Pagination aria-label="Page navigation example" className={style.pagingLabel}>
                    {
                        pageInfo.curPage===1?
                        <PaginationItem disabled>
                            <PaginationLink previous href="#" />
                        </PaginationItem>:
                        <PaginationItem>
                            {/* <PaginationLink previous href={"/list/" + (pageInfo.curPage - 1)} /> */}
                            <PaginationLink previous onClick={()=>pageChange(pageInfo.curPage-1)}/>
                        </PaginationItem>
                    }

                    {                   
                        pageBtn.map(item=>{
                            return(
                                <PaginationItem key={item} className={item===pageInfo.curPage? 'active':''}>
                                    {/* <PaginationLink href={"/list/" + item}> */}
                                    {/* 고유한 id를 넘겨줌 */}
                                    <PaginationLink onClick={() => pageChange(item)}>
                                        {item}
                                    </PaginationLink>
                                </PaginationItem>                            
                            )
                        })
                    }

                    {
                        <PaginationItem disabled={pageInfo.curPage === pageInfo.endPage}>
                            {/* <PaginationLink next href={"/list/" + (pageInfo.curPage + 1)}/> */}
                            <PaginationLink next onClick={()=>pageChange(pageInfo.curPage+1)}/>
                        </PaginationItem>
                    }
                </Pagination>
                {/* 페이징 영역 */}
            </div>
        </div>
        </>
    );
}
export default AdminReport;