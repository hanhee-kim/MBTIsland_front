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
import React, { useState } from "react";
import axios from 'axios';
import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminReport.module.css";
import AdminNav from "./AdminNav";
import { urlroot } from "../../config";

const AdminBan = () => {
    const [boards, setBoards] = useState([
        {
            num:1,
            userId:"user01",
            warningCount: 3,
            banCount: 1,
            isBanned:"활동 정지",
            banStartDate:"2023.11.11",
            banEndDate:"2023.11.25"
        },
        {
            num:2,
            userId:"user02",
            warningCount: 1,
            banCount: 0,
            isBanned:"정상",
            banStartDate:"",
            banEndDate:""
        },
        {
            num:3,
            userId:"user03",
            warningCount: 1,
            banCount: 0,
            isBanned:"정상",
            banStartDate:"",
            banEndDate:""
        },        
        {
            num:4,
            userId:"user04",
            warningCount: 6,
            banCount: 2,
            isBanned:"활동 정지",
            banStartDate:"2023.11.01",
            banEndDate:"2023.11.30"
        },
        {
            num:5,
            userId:"user05",
            warningCount: 2,
            banCount: 0,
            isBanned:"정상",
            banStartDate:"",
            banEndDate:""
        },
        {
            num:6,
            userId:"user06",
            warningCount: 3,
            banCount: 1,
            isBanned:"활동 정지",
            banStartDate:"2023.11.11",
            banEndDate:"2023.11.25"
        },
        {
            num:7,
            userId:"user07",
            warningCount: 4,
            banCount: 1,
            isBanned:"활동 정지",
            banStartDate:"2023.11.11",
            banEndDate:"2023.11.25"
        },
        {
            num:8,
            userId:"user08",
            warningCount: 4,
            banCount: 1,
            isBanned:"활동 정지",
            banStartDate:"2023.11.11",
            banEndDate:"2023.11.25"
        },
        {
            num:9,
            userId:"user09",
            warningCount: 8,
            banCount: 2,
            isBanned:"활동 정지",
            banStartDate:"2023.11.01",
            banEndDate:"2023.11.30"
        },
        {
            num:10,
            userId:"user10",
            warningCount: 1,
            banCount: 0,
            isBanned:"정상",
            banStartDate:"",
            banEndDate:""
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

    const [id, setId] = useState('');

    const searchSubmit = () => {
        reqBoardSearch(1);
    };

    // url에 파라미터로 줄 변수 repage
    const reqBoardList = (repage) => {
        // if(!repage) repage = 1;
        axios.get(`${urlroot}/adminban/${repage}`)
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
        if(id==='') {
            alert('아이디를 입력하세요.');
            return;
        }

        axios.get(`${urlroot}/boardsearch/${repage}/${id}`)
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
                        &nbsp;&nbsp;&nbsp;&nbsp;아이디
                    </Col>
                    <Col sm={2}>
                        <Input type='text' name="id" onChange={(e)=>setId(e.target.value)}/>
                    </Col>
                    <Col sm={2}>
                        <Button style={buttonStyle} onClick={searchSubmit}>검색</Button>
                    </Col>
                </FormGroup>
                {/* 검색 영역 */}
            
                {/* 분류 영역 */}
                <div className={style.sortDiv}>
                    <div>전체</div>&nbsp;&nbsp;&nbsp;
                    <div style={{color:"#C5C5C5"}}>활동 정지</div>&nbsp;&nbsp;&nbsp;
                    <div style={{color:"#C5C5C5"}}>정상</div>&nbsp;&nbsp;&nbsp;
                </div>
                {/* 분류 영역 */}

                {/* 게시글 영역 */}
                <table className={style.boardTable}>
                    <thead>
                        <tr key="0">
                            <td>아이디</td><td>경고 횟수</td><td>정지 횟수</td><td>상태</td><td>정지 기간</td>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.length !== 0 && boards.map(board => {
                            return (
                                    <tr key={board.num}>
                                        <td>{board.userId}</td>
                                        <td>{board.warningCount}</td>
                                        <td>{board.banCount}</td>
                                        <td>{board.isBanned}</td>
                                        <td>{board.banStartDate} ~ {board.banEndDate}</td>
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
export default AdminBan;