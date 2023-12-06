import React, { useState } from "react";
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

const MyNote = () => {
  //더미데이터
  const [noteList, setNoteList] = useState([
    {
      noteNo: 1,
      sentUsername: "158432AE25",
      sentUserNick: "보노보노",
      noteContent: "노트 내용",
      receiveUsername: "123456AA7891011",
      receiveUserNick: "나",
      sentDate: "0000-00-00T00:00:00",
      noteIsRead: "N",
    },
    {
      noteNo: 2,
      sentUsername: "158432AE25",
      sentUserNick: "보노보노",
      noteContent: "노트 내용",
      receiveUsername: "123456AA7891011",
      receiveUserNick: "나",
      sentDate: "0000-00-00T00:00:00",
      noteIsRead: "N",
    },
  ]);

  const NoteDetail = (e, note) => {
    const url = "/notedetail/:" + note.noteNo;
    window.open(
      url,
      "_blank",
      "width=650,height=700,location=no,status=no,scrollbars=yes"
    );
  };
  const [isRead, setIsRead] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filterChange, setFilterChange] = useState("");
  //보낸쪽지 눌렀을떄
  const sentNote = () => {};
  //받은쪽지 눌렀을때
  const receiveNote = () => {};
  const readFilter = (e, read) => {
    setIsRead(!isRead);
    console.log(read);
    // setNoteList({...noteList}); //읽음 처리or안읽음 된 List 다시 가져오기
  };
  //필터 눌렀을때
  const changeFilter = (e, type) => {
    //type : all / read / noRead
  };

  return (
    <div className={style.myNoteContainer}>
      <div className={style.myNoteTitle}>* 쪽지 목록 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Button color="dark" onClick={sentNote}>
              보낸쪽지
            </Button>
            <Button color="light" onClick={receiveNote}>
              받은쪽지
            </Button>
          </div>
          <div></div>
        </div>
        <div className={style.tableDiv}>
          <Table className="table-hover" style={{ minWidth: "770px" }}>
            <thead>
              <tr row className="text-center">
                <th scope="col" sm={1}>
                  번호
                </th>
                <th scope="col" sm={1}>
                  보낸이
                </th>
                <th scope="col" sm={4}>
                  내용
                </th>
                <th scope="col" sm={3}>
                  작성일자
                </th>
                <th scope="col" sm={3}>
                  <ButtonDropdown
                    direction="right"
                    isOpen={openDropdown}
                    toggle={() => setOpenDropdown(!openDropdown)}
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
                      <DropdownItem onClick={(e) => changeFilter(e, "all")}>
                        모두
                      </DropdownItem>
                      <DropdownItem onClick={(e) => changeFilter(e, "read")}>
                        읽음
                      </DropdownItem>
                      <DropdownItem onClick={(e) => changeFilter(e, "noRead")}>
                        안읽음
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  {/* {isRead ? (
                    <span onClick={(e) => readFilter(e, "notRead")}>
                      안 읽음
                    </span>
                  ) : (
                    <span onClick={(e) => readFilter(e, "read")}>읽음</span>
                  )} */}
                </th>
              </tr>
            </thead>
            <tbody>
              {noteList.map((note, index) => {
                return (
                  <tr
                    key={index}
                    onClick={(e) => {
                      NoteDetail(e, note);
                    }}
                  >
                    <td sm={1} className="text-center">
                      {note.noteNo}
                    </td>
                    <td sm={1} className="text-center">
                      {note.sentUserNick}
                    </td>
                    <td
                      sm={4}
                      className="text-truncate"
                      style={{ maxWidth: "600px" }}
                    >
                      {note.noteContent}
                    </td>
                    <td
                      sm={3}
                      className="text-center"
                      style={{ minWidth: "105px" }}
                    >
                      {note.sentDate.split("T")[0]}
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
        <div className={style.paging}>
          <span>&lt;</span>
          <span className={style.activePage} style={{ background: "#f8f8f8" }}>
            1
          </span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default MyNote;
