import React, { useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from "reactstrap";
import { useSelector } from "react-redux";

const MyMbtWhy = (props) => {
  // const user = useSelector((state) => state.persistedReducer.user.user);
  //더미데이터
  const [whyList, setWhyList] = useState([
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      content: "test1test1teesttest1test1te1test1test1test1test1test1teest1",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 2,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 3,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 4,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 5,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 6,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 6,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 6,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 6,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
    {
      no: 6,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ISTJ",
      content: "test1test1test1test1test1test1test1test1test1",
      writeDate: "2023-10-11",
      viewCnt: 10,
      recommendCnt: 10,
      isBlocked: false,
    },
  ]);
  return (
    <div className={style.myMbtwhyContainer}>
      <div className={style.myMbtwhyTitle}>* MBT-WHY *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <Button color="dark" style={{ margin: "10px" }}>
          삭제
        </Button>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr row className="text-center">
              <th scope="col" sm={1}>
                <input type="checkbox" value="all" />
              </th>
              <th scope="col" sm={1}>
                번호
              </th>
              <th scope="col" sm={2}>
                받는 MBTI
              </th>
              <th scope="col" sm={4}>
                내용
              </th>
              <th scope="col" sm={3}>
                작성일
              </th>
              <th scope="col" sm={1}>
                댓글수
              </th>
            </tr>
          </thead>
          <tbody>
            {whyList.map((why, index) => {
              return (
                <tr key={index}>
                  <td sm={1} className="text-center">
                    <input type="checkbox" name="no" value={why.no} />
                  </td>
                  <td sm={1} className="text-center">
                    {why.no}
                  </td>
                  <td sm={2} className="text-center">
                    {why.mbtiType}
                  </td>
                  <td
                    sm={4}
                    className="text-truncate"
                    style={{ maxWidth: "600px" }}
                  >
                    {why.content}
                  </td>
                  <td
                    sm={3}
                    className="text-center"
                    style={{ minWidth: "105px" }}
                  >
                    {why.writeDate}
                  </td>
                  <td sm={1} className="text-center">
                    {why.recommendCnt}
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

export default MyMbtWhy;
