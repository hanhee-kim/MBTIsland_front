import React, { useState } from 'react';
import style from "../../css/user/Mypage.module.css";
import { Table } from 'reactstrap';

const MyNote = () => {
  //더미데이터
  const [noteList] = useState([
    {
      noteNo:1,
      sentUsername:'',
      noteContent: '',
      receiveUsername:'',
      sentDate:'0000-00-00T00:00:00',
      noteIsRead:'N',
    }, 
  ]);

  // const openNoteWrite = (sent_username) => {
  //   const url = "/notewrite";
  //   window.open(
  //     url,
  //     "_blank",
  //     "width=650,height=700,location=no,status=no,scrollbars=yes"
  //   );
  //   // , "noopener, noreferrer"
  // };


  return (
    <div className={style.myQnaContainer}>
      <div className={style.myQnaTitle}>* 문의 내역 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
      <div style={{height:'25px'}}></div>
        <div className={style.tableDiv}>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr row className="text-center">
              <th scope="col" sm={1}>
                번호
              </th>
              <th scope="col" sm={5}>
                내용
              </th>
              <th scope="col" sm={3}>
                작성일자
              </th>
              <th scope="col" sm={3}>
                보낸이
              </th>
            </tr>
          </thead>
          <tbody>
            {noteList.map((qna, index) => {
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