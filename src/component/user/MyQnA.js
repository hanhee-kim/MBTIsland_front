import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const MyQnA = (props) => {
  //더미데이터
  const [qnaList, setQnaList] = useState([
    {
      no: 1,
      title: "fasdasdf",
      content: "fasdddddddfgsdgfsdfasdfasffasd",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 2,
      title: "sdfsdfsdfads",
      content: "affasfdasfsdfsddfs",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 3,
      title: "asdfasd",
      content: "fdasfdasfdsfa",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "Y",
    },
    {
      no: 4,
      title: "sfa",
      content: "fdasfsdafasd",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "Y",
    },
    {
      no: 5,
      title: "fsdfsda",
      content: "sfadfsdafsdfsadfasdf",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 6,
      title: "",
      content: "",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 7,
      title: "",
      content: "",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 8,
      title: "",
      content: "",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 9,
      title: "",
      content: "",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
    {
      no: 10,
      title: "",
      content: "",
      writedDate: "2023-11-11T00:00:00",
      writerId: "",
      isAnswered: "N",
    },
  ]);
  const user = props.user;
  const openQnaWrite = () => {
    const url = "/qnawrite";
    window.open(
      url,
      "_blank",
      "width=650,height=700,location=no,status=no,scrollbars=yes"
    );
    // , "noopener, noreferrer"
  };

  return (
    <div className={style.myQnaContainer}>
      <div className={style.myQnaTitle}>
        * {user.userNickname}의 문의 내역 *
      </div>
      <div style={{ padding: "20px", marginTop: "60px" }}>
        <Button color="light" style={{ margin: "10px" }} onClick={openQnaWrite}>
          문의하기
        </Button>
        {/* <Button color="light" style={{ margin: "10px" }}>
          <Link to="/qnaWrite" target="_blank">
            문의하기
          </Link>
        </Button> */}
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

export default MyQnA;
