import React, { useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from "reactstrap";

const MyMbtmi = (props) => {
  const user = props.user;
  //더미데이터
  const [tmiList, setTmiList] = useState([
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제목tdeestt1",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제dddddddddddddddddddddddddddddddddddddddddddddddddddddddd목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제dddddddddddddddddddddddddddddddddddddddddddddddddddddddd목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제dddddddddddddddddddddddddddddddddddddddddddddddddddddddd목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제dddddddddddddddddddddddddddddddddddddddddddddddddddddddd목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
    {
      no: 1,
      writerId: "test1",
      writerNickname: "test1",
      writerMbti: "test1",
      writerMbtiColor: "#FFD966",
      mbtiType: "ENFP",
      title: "제dddddddddddddddddddddddddddddddddddddddddddddddddddddddd목",
      category: "잡담",
      content:
        "test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1",
      fileIndexs: "1,2,3,4",
      writeDate: "2023-11-11",
      viewCnt: 1,
      recommendCnt: 1,
      isBlocked: false,
    },
  ]);
  return (
    <div className={style.myMbtmiContainer}>
      <div className={style.myMbtmiTitle}>* {user.userNickname}의 MB-TmI *</div>
      <div style={{ padding: "20px", marginTop: "60px" }}>
        <Button color="dark" style={{ margin: "10px" }}>
          삭제
        </Button>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr row className="text-center">
              <th scope="col" sm={1}>
                <input type="checkbox" />
              </th>
              <th scope="col" sm={1}>
                번호
              </th>
              <th scope="col" sm={2}>
                카테고리
              </th>
              <th scope="col" sm={4}>
                제목
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
            {tmiList.map((tmi, index) => {
              return (
                <tr key={index}>
                  <td sm={1} className="text-center">
                    <input type="checkbox" name="no" value={tmi.no} />
                  </td>
                  <td sm={1} className="text-center">
                    {tmi.no}
                  </td>
                  <td sm={2} className="text-center">
                    [ {tmi.category} ]
                  </td>
                  <td
                    sm={4}
                    className="text-truncate"
                    style={{ maxWidth: "400px" }}
                  >
                    {tmi.title}
                  </td>
                  <td
                    sm={3}
                    className="text-center"
                    style={{ minWidth: "105px" }}
                  >
                    {tmi.writeDate}
                  </td>
                  <td sm={1} className="text-center">
                    {tmi.recommendCnt}
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

export default MyMbtmi;
