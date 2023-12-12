import React, { useEffect, useState } from "react";
import style from "../../css/user/Mypage.module.css";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const MyQnA = (props) => {
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [qnaList,setQnaList] = useState([])
  const user = useSelector((state) => state.persistedReducer.user.user);
  useEffect(() => {
    getMyQnaList(user.userIdx,page);
  },[])
  const getMyQnaList = ( userIdx , page ) => {
    axios
    .get(`http://localhost:8090/questionlist/${userIdx}/${page}`)
    .then((res) => {
      setQnaList([...res.data.quaList]);
      setPageInfo({...res.data.pageInfo});
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const openQnaWrite = () => {
    const url = "/qnawrite";
    window.open(
      url,
      "_blank",
      "width=650,height=700,location=no,status=no,scrollbars=yes"
    );
    // , "noopener, noreferrer"
  };
  const handlePageNo = (pageNo) => {
    setPage(pageNo);
    console.log('***페이지이동***');
    getMyQnaList(user.username , pageNo); 
};
  // 페이지네이션
  const PaginationInside = () => {
    // if(errorMsg) return null;
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
    <div className={style.myQnaContainer}>
      <div className={style.myQnaTitle}>* 문의 내역 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <Button color="light" style={{ margin: "10px" }} onClick={openQnaWrite}>
          문의하기
        </Button>
        {/* <Button color="light" style={{ margin: "10px" }}>
          <Link to="/qnaWrite" target="_blank">
            문의하기
          </Link>
        </Button> */}
        {(qnaList == null || qnaList == "")?
        <div className={style.tableDiv}>
          <div style={{fontSize:'25px',display:'flex',height:"100%"}}>
            <div>* 문의하신 내용이 없습니다. *</div>
          </div>
        </div>:
        <>
        <div className={style.tableDiv}>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr row className="text-center">
              <th scope="col" sm={1}>
                번호
              </th>
              <th scope="col" sm={6}>
                내용
              </th>
              <th scope="col" sm={3}>
                작성일자
              </th>
              <th scope="col" sm={2}>
                답변여부
              </th>
            </tr>
          </thead>
          <tbody>
            {qnaList.map((qna, index) => {
              return (
                <tr key={index}>
                  <td sm={1} className="text-center">
                    {qna.no}
                  </td>
                  <td
                    sm={6}
                    className="text-truncate"
                    style={{ maxWidth: "600px" }}
                  >
                    {qna.content}
                  </td>
                  <td
                    sm={3}
                    className="text-center"
                    style={{ minWidth: "105px" }}
                  >
                    {/* {qna.writedDate} */}
                    {qna.writedDate.split("T")[0]}
                  </td>
                  <td sm={2} className="text-center">
                    {qna.isAnswered === "N" ? "처리중" : "답변완료"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        </div>
        {PaginationInside()}
        </>
      }
      </div>
    </div>
  );
};

export default MyQnA;
