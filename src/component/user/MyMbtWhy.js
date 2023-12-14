import React, { useEffect, useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const MyMbtWhy = (props) => {
  const user = useSelector((state) => state.persistedReducer.user.user);
  const [initData, setInitData] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8090/mymbtwhy`, user.username)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //더미데이터
  const [whyList] = useState([
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
      no: 8,
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
      no: 9,
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
      no: 16,
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
      no: 10,
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
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, no) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, no]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== no));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const noArray = [];
      whyList.forEach((el) => noArray.push(el.no));
      setCheckItems(noArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const delWhy = () => {
    //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
  };
  return (
    <div className={style.myMbtwhyContainer}>
      <div className={style.myMbtwhyTitle}>* MBT-WHY *</div>
      {initData ? (
        <div style={{ padding: "20px", marginTop: "10px" }}>
          <Button color="dark" style={{ margin: "10px" }} onClick={delWhy}>
            삭제
          </Button>
          <div className={style.tableDiv}>
            <Table className="table-hover" style={{ minWidth: "770px" }}>
              <thead>
                <tr className="text-center">
                  <th scope="col" sm={1}>
                    <input
                      type="checkbox"
                      name="select-all"
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                      checked={
                        checkItems.length === whyList.length ? true : false
                      }
                    />
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
                        <input
                          type="checkbox"
                          name={`select-${why.no}`}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, why.no)
                          }
                          // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                          checked={checkItems.includes(why.no) ? true : false}
                        />
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
          </div>
          <div className={style.paging}>
            <span>&lt;</span>
            <span
              className={style.activePage}
              style={{ background: "#f8f8f8" }}
            >
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
      ) : (
        <div
          name="notDataDiv"
          style={{
            minHeight: "700px",
            padding: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "25px" }}>
            작성한 MBT-WHY 게시글이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMbtWhy;
