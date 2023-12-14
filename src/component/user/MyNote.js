import React, { useEffect, useState } from "react";
import style from "../../css/user/Mypage.module.css";
import {
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
// import { Link } from 'react-router-dom';
import NoteDetail from "./NoteDetail";
import { Dropdown } from "bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const MyNote = () => {
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [noteType,setNoteType] = useState('');
  const [readType,setReadType] = useState('');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const [noteList, setNoteList] = useState([]);

  const goNoteDetail = (e, note) => { //tr클릭시
    if(note.receiveUsername == user.username){
      const url = "/notedetail/" + note.noteNo;
      window.open(
        url,
        "_blank",
        "width=650,height=700,location=no,status=no,scrollbars=yes"
      );
    }
    else if(note.sentUsername == user.username){
      const url = "/sentnotedetail/"+ note.noteNo;
      window.open(
        url,
        "_blank",
        "width=650,height=700,location=no,status=no,scrollbars=yes"
      )
    }
  };
  const [isRead, setIsRead] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filterChange, setFilterChange] = useState("");
  const user = useSelector((state) => state.persistedReducer.user.user);
 
  const getMyNoteList = (username, noteType, readType , page) => {
    let defaultUrl = "http://localhost:8090/notelistofuser";
    console.log(user.username);
    console.log(username);
    defaultUrl += `?username=${username}`;
    if (noteType !== null || noteType !== '')  //보낸쪽지인지 받은 쪽지인지 (기본 : 보낸 쪽지)
      defaultUrl += `${username !== null ? "&" : "?"}noteType=${noteType}`;
    if (readType !== null || readType !== '')  //읽었는지 안읽었는지 모두인지
      defaultUrl += `${username !== null || noteType !== null ? "&" : "?"}readType=${readType}`;
    if (page !== null || page !== '') //페이지를 클릭했는지?
      defaultUrl += `${
        username !== null || noteType !== null || readType !== null ? "&" : "?"
      }page=${page}`;


    console.log("요청url:" + defaultUrl);

    axios
      .get(defaultUrl)
      .then((res) => {
        let pageInfo = res.data.pageInfo;
        let list = res.data.noteList;
        setNoteList([...list]);
        setPageInfo({ ...pageInfo });
      })
      .catch((err) => {
        console.log(err);
        setNoteList([]);
      });

  };

  useEffect(()=>{
    setNoteType('receive')
    getMyNoteList(user.username,'receive',null,page);
  },[])

  //보낸쪽지 눌렀을떄 ,받은쪽지 눌렀을때
  const changeNoteType = (e , type) => {
    setNoteType(type);
    console.log("username : "+user.username+"noteT : "+type+"readT : "+readType+"page : "+page);

    getMyNoteList(user.username,type,readType,page);
  };
  //필터 눌렀을때
  const changeFilter = (e, type) => {
    console.log(type);
    //type : all / read / noRead
    setReadType(type);
    getMyNoteList(user.username,noteType,type,page);
  };

  // 페이지네이션
  const PaginationInside = () => {
    // if(errorMsg) return null;
    const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageGroup.push(
        <span
          key={i}
          className={`${page === i ? style.activePage : ""}`}
          onClick={() => handlePageNo(i)}
        >
          {i}
        </span>
      );
    }
    return (
      <div className={style.paging}>
        {!(pageInfo.startPage === 1) && (
          <>
            <span onClick={() => handlePageNo(1)}>≪</span>
            <span onClick={() => handlePageNo(pageInfo.startPage - 10)}>
              &lt;
            </span>
          </>
        )}
        {pageGroup}
        {!(pageInfo.endPage === pageInfo.allPage) && (
          <>
            <span onClick={() => handlePageNo(pageInfo.endPage + 1)}>&gt;</span>
            <span onClick={() => handlePageNo(pageInfo.allPage)}>≫</span>
          </>
        )}
      </div>
    );
  };
  const handlePageNo = (pageNo) => {
    setPage(pageNo);
    console.log("***페이지이동***");
    // getMyQnaList(user.username, answered, pageNo);
  };
  return (
    <div className={style.myNoteContainer}>
      <div className={style.myNoteTitle}>* 쪽지 목록 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
      <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Button color="light" style={{minWidth:'80px'}} onClick={(e)=>changeNoteType(e,'receive')}>
              받은쪽지
            </Button>
            <Button color="dark" style={{minWidth:'80px'}} onClick={(e)=>changeNoteType(e,'sent')}>
              보낸쪽지
            </Button>
            <ButtonDropdown
                    direction="left"
                    isOpen={openDropdown}
                    toggle={() => setOpenDropdown(!openDropdown)}
                    style={{marginLeft:'470px'}}
                  >
                    <DropdownToggle
                      caret
                      style={{
                        backgroundColor: "#fdfdfd00",
                        height: "35px",
                        color: "black",
                        border: "none",
                      }}
                      size="lg"
                    >
                      읽음여부
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={(e) => changeFilter(e, null)}>
                        모두
                      </DropdownItem>
                      <DropdownItem onClick={(e) => changeFilter(e, "Y")}>
                        읽음
                      </DropdownItem>
                      <DropdownItem onClick={(e) => changeFilter(e, "N")}>
                        안읽음
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
          </div>
          <div style={{marginTop:'5px',display:'flex',gap:'10px'}}>
            {/* {noteType} */}
            {noteType === 'sent' ?
            <>
            <div style={{width:'80px'}}></div>
            <div style={{width:'80px',border:'1px solid black'}}></div>
            </>
            :
            <>
            <div style={{width:'80px',border:'1px solid black'}}></div>
            <div style={{width:'80px'}}></div>
            </>
          }
          </div>
        </div>
        {noteList == null || noteList == '' ? 
        <>
        <div className={style.tableDiv}>
            <div
              style={{
                fontSize: "25px",
                display: "flex",
                minHeight: "580px",
                alignItems: "center",
              }}
            >
              {noteType == 'sent' ?
              <div style={{ textAlign: "center", width: "98%" }}>
                * 보낸 쪽지가 없습니다. *
              </div> :
              <div style={{ textAlign: "center", width: "98%" }}>
              * 받은 쪽지가 없습니다. *
              </div>
              }
            </div>
          </div>
        </> 
        : 
        <>
        
        
        <div className={style.tableDiv}>
          <Table className="table-hover" style={{ minWidth: "770px" }}>
            <thead>
              <tr row className="text-center">
                <th scope="col" sm={1}>
                  번호
                </th>
                  {noteType == 'sent'?
                <th scope="col" sm={1}>
                  받는이
                </th>
                :
                <th scope="col" sm={1}>
                  보낸이
                </th>
                  }
                <th scope="col" sm={4} style={{minWidth:'280px'}}>
                  내용
                </th>
                <th scope="col" sm={3}>
                  작성일자
                </th>
                <th scope="col" sm={3}>
                  읽음여부
                </th>
              </tr>
            </thead>
            <tbody>
              {noteList.map((note, index) => {
                return (
                  <tr
                    key={index}
                    onClick={(e) => {
                      goNoteDetail(e, note);
                    }}
                  >
                    <td sm={1} className="text-center">
                      {note.noteNo}
                    </td>
                    {noteType == 'sent'?
                    <td sm={1} className="text-center">
                      {note.receiveUserNick}
                    </td>
                    :
                    <td sm={1} className="text-center">
                      {note.sentUserNick}
                    </td>
                    }
                    <td
                      sm={4}
                      className="text-truncate"
                      style={{ maxWidth: "500px" }}
                    >
                      {note.noteContent}
                    </td>
                    <td
                      sm={3}
                      className="text-center"
                      style={{ minWidth: "105px" }}
                    >
                      {formatDate(note.sentDate)}
                    </td>
                    <td sm={3} className="text-center">
                      {note.noteIsRead === "N" ? "안 읽음" : "읽음"}
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

export default MyNote;
