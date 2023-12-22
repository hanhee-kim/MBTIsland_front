// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import style from "../../css/user/Mypage.module.css";
import {
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// import { Button, Table } from 'reactstrap';
import { urlroot } from "../../config";

const MyAlarm = () => {
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [type, setType] = useState(null);
  const [filterChange, setFilterChange] = useState("");
  const [alarmList, setAlarmList] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const user = useSelector((state) => state.persistedReducer.user.user);

  useEffect(() => {
    getMyAlarmList(user.username, type, page);
  }, []);

  const getMyAlarmList = (username, type, page) => {
    let defaultUrl = `${urlroot}/alarmList`;
    defaultUrl += `?username=${username}`;
    if (type != null) {
      defaultUrl += `&type=${type}`;
    }
    if (page !== null || page !== "") {
      defaultUrl += `&page=${page}`;
    }
    console.log("요청url : " + defaultUrl);

    axios
      .get(defaultUrl)
      .then((res) => {
        console.log(res);
        let pageInfo = res.data.pageInfo;
        let list = res.data.alarmList;
        setAlarmList([...list]);
        setPageInfo({ ...pageInfo });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        if (
          err.response.data.err == "해당 알림없음." ||
          err.response.data.err == "알림에 대한 해당 댓글이 존재하지 않음"
        ) {
          console.log(alarmList);
          setAlarmList(err.response.data.alarmList);
        }
      });
  };

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, no) => {
    if (checked) {
      console.log(checkItems);
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
      alarmList.forEach((el) => noArray.push(el.alarmNo));
      setCheckItems(noArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const readAlarm = () => {
    //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
    //  알람삭제 ? 읽음처리 ?
    let arrayItems = checkItems.join(",");
    axios
      .put(`${urlroot}/updatealarmisread?arrayItems=${arrayItems}`)
      .then((res) => {
        console.log(res);
        setFilterChange("읽음처리");
        setCheckItems([]);
        Swal.fire({
          title: "읽음 처리 성공!",
          icon: "success",
        });
        getMyAlarmList(user.username, type, page);
      })
      .catch((err) => {
        console.log(err.response.data);
        let errLog = err.response.data;
        Swal.fire({
          title: "읽음처리 실패!",
          text: errLog,
          icon: "error",
        });
      });
  };
  const allRaed = () => {
    axios
      .put(
        `${urlroot}/updatealarmisreadall?username=${user.username}`
      )
      .then((res) => {
        console.log(res);
        setFilterChange("모두읽음처리");
        setCheckItems([]);
        Swal.fire({
          title: "모두 읽음 처리 성공!",
          icon: "success",
        });
        getMyAlarmList(user.username, type, page);
      })
      .catch((err) => {
        console.log(err.response.data);
        let errLog = err.response.data;
        Swal.fire({
          title: "모두 읽음 처리 실패!",
          text: errLog,
          icon: "error",
        });
      });
  };

  //필터버튼 눌렀을때
  const changeFilter = (e, type) => {
    // type : all / comment / warning / ban / answer
    if (type === null) {
      setType(null);
    } else {
      setType(type);
    }
    setFilterChange("타입필터적용");
    getMyAlarmList(user.username, type, page);
  };
  //tr클릭시 해당알림의 게시글로 이동할때
  const goDetail = (e, alarm) => {
    //useNavigate();사용해서
    const no = alarm.detailNo;
    switch (alarm.detailType) {
      case "MBTMI":
        navigate("/mbtmidetail/" + no);
        break;
      case "MBTWHY":
        navigate("/mbtwhydetail/" + no);
        break;
      case "MBATTLE":
        navigate("/mbattledetail/" + no);
        break;
      case "NOTE":
        let noteNo = no;
        const noteUrl = "/notedetail/" + noteNo;
        window.open(
          noteUrl,
          "_blank",
          "width=650,height=700,location=no,status=no,scrollbars=yes"
        );
        break;
      case "QUESTION":
        const questionUrl = "/questiondetail/" + no;
        window.open(
          questionUrl,
          "_blank",
          "width=720,height=780,location=no,status=no,scrollbars=yes"
        );

        break;
      case "SWAL":
        Swal.fire({
          title: "",
          text: "",
          icon: "",
        });
        break;
      default:
        return;
    }
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
    getMyAlarmList(user.username, type, pageNo);
  };
  return (
    <div className={style.myAlarmContainer}>
      <div className={style.myAlarmTitle}>* 알림 목록 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            color="light"
            style={{ margin: "10px", minWidth: "82px" }}
            onClick={(e) => readAlarm(e)}
          >
            읽음
          </Button>

          <Button
            color="dark"
            style={{ margin: "10px", minWidth: "82px" }}
            onClick={(e) => allRaed(e)}
          >
            모두 읽음
          </Button>

          <ButtonDropdown
            direction="left"
            isOpen={openDropdown}
            toggle={() => setOpenDropdown(!openDropdown)}
            style={{ marginLeft: "470px" }}
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
              타입
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={(e) => changeFilter(e, null)}>
                모두
              </DropdownItem>
              <DropdownItem onClick={(e) => changeFilter(e, "쪽지")}>
                쪽지
              </DropdownItem>
              <DropdownItem onClick={(e) => changeFilter(e, "댓글")}>
                댓글
              </DropdownItem>
              <DropdownItem onClick={(e) => changeFilter(e, "경고")}>
                경고
              </DropdownItem>
              <DropdownItem onClick={(e) => changeFilter(e, "제재")}>
                제재
              </DropdownItem>
              <DropdownItem onClick={(e) => changeFilter(e, "문의답글")}>
                문의답글
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        {alarmList != null ? (
          <>
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
                          checkItems.length === alarmList.length ? true : false
                        }
                      />
                    </th>
                    <th scope="col" sm={2} style={{ minWidth: "110px" }}>
                      타입
                    </th>
                    <th scope="col" sm={5} style={{ minWidth: "400px" }}>
                      내용
                    </th>
                    <th scope="col" sm={3} style={{ minWidth: "110px" }}>
                      알림 일시
                    </th>
                    <th scope="col" sm={1} style={{ minWidth: "95px" }}>
                      확인
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alarmList.map((alarm, index) => {
                    return (
                      <tr
                        key={index}
                        
                      >
                        <td sm={1} className="text-center">
                          <input
                            type="checkbox"
                            name={`select-${alarm.alarmNo}`}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, alarm.alarmNo)
                            }
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={
                              checkItems.includes(alarm.alarmNo) ? true : false
                            }
                          />
                        </td>
                        <td sm={2} className="text-center" onClick={(e) => {
                          goDetail(e, alarm);
                        }}>
                          [ {alarm.alarmType} ]
                        </td>
                        <td
                          sm={5}
                          className="text-truncate"
                          style={{ maxWidth: "400px" }}
                          onClick={(e) => {
                            goDetail(e, alarm);
                          }}
                        >
                          {alarm.alarmContent}
                        </td>
                        <td
                          sm={3}
                          className="text-center"
                          style={{ minWidth: "105px" }}
                          onClick={(e) => {
                            goDetail(e, alarm);
                          }}
                        >
                          {formatDate(alarm.alarmUpdateDate)}
                        </td>
                        <td sm={1} className="text-center" onClick={(e) => {
                          goDetail(e, alarm);
                        }}>
                          {alarm.alarmIsRead === "N" ? "안 읽음" : "읽음"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            {PaginationInside()}
          </>
        ) : (
          <>
            <div
              style={{
                textAlign: "center",
                width: "98%",
                minHeight: "580px",
                fontSize: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {type != null ? (
                <div>* {type}에 대한 알림이 존재하지 않습니다. *</div>
              ) : (
                <div>* 알림이 존재하지 않습니다. *</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAlarm;
