import React, { useEffect, useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { urlroot } from "../../config";

const MyMbtWhy = (props) => {
  const user = useSelector((state) => state.persistedReducer.user);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // navigate
  const navigate = useNavigate();
  const [initData, setInitData] = useState(true);
  useEffect(() => {
    getMyMbtiList(user.username, page);
  }, []);

  const getMyMbtiList = (username, page) => {
    //console.log(page);
    //console.log("url:" + `${urlroot}/mymbtwhy/${username}/${page}`);
    axios
      .get(`${urlroot}/mymbtwhy/${username}/${page}`)
      .then((res) => {
        //console.log(res);
        setInitData(true);
        setPageInfo(res.data.pageInfo);
        setMbtwhyList(res.data.myMbtwhyList);
      })
      .catch((err) => {
        //console.log(err);
        setInitData(false);
      });
  };
  const handlePageNo = (pageNo) => {
    setPage(pageNo);
    //console.log("***페이지이동***");
    getMyMbtiList(user.username, pageNo);
    //페이지가 변경되면 checkItems 빈배열로 초기화.
    setCheckItems([]);
  };
  // 페이지네이션
  const PaginationInside = () => {
    // if(errorMsg) return null;
    let color = user.userMbtiColor;
    const pageGroup = []; // 렌더링될때마다 빈배열로 초기화됨
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageGroup.push(
        <span
          key={i}
          style={{ border: page === i ? `2px solid ${color}` : "" }}
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

  const [whyList, setMbtwhyList] = useState([]);
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
    //console.log(checkItems);
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
    if (checkItems.length === 0) {
      Swal.fire({
        title: "체크된 항목이 없습니다.",
        icon: "warning",
      });
      return;
    }
    let sendArrayItems = checkItems.join(",");
    //console.log(checkItems.type);
    //console.log(checkItems);

    //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
    axios
      .delete(`${urlroot}/deletembtwhy?sendArrayItems=${sendArrayItems}`)
      .then((res) => {
        //console.log(res);
        Swal.fire({
          title: "삭제 성공!",
          icon: "success",
        });
        setCheckItems([]);

        getMyMbtiList(user.username, 1);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  //tr클릭시(해당 상세로 이동)
  const goMbtwhyDetail = (e, mbtwhy) => {
    // path="/mbtwhydetail/:mbti?/:page?/:search?/:no?"

    let defaultUrl = `/mbtwhydetail`;
    defaultUrl += `/${mbtwhy.no}`;
    defaultUrl += `/${mbtwhy.mbtiCategory}`;
    navigate(defaultUrl);
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
                  <th scope="col" sm={1} style={{ minWidth: "64px" }}>
                    번호
                  </th>
                  <th scope="col" sm={2} style={{ minWidth: "85px" }}>
                    받는 MBTI
                  </th>
                  <th scope="col" sm={4} style={{ minWidth: "400px" }}>
                    내용
                  </th>
                  <th scope="col" sm={3} style={{ minWidth: "112px" }}>
                    작성일
                  </th>
                  <th scope="col" sm={1} style={{ minWidth: "64px" }}>
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
                      <td
                        sm={1}
                        className="text-center"
                        onClick={(e) => goMbtwhyDetail(e, why)}
                      >
                        {why.no}
                      </td>
                      <td
                        sm={2}
                        className="text-center"
                        onClick={(e) => goMbtwhyDetail(e, why)}
                      >
                        {why.mbtiCategory}
                      </td>
                      <td
                        sm={4}
                        className="text-truncate"
                        style={{ maxWidth: "600px" }}
                        onClick={(e) => goMbtwhyDetail(e, why)}
                      >
                        {why.content}
                      </td>
                      <td
                        sm={3}
                        className="text-center"
                        style={{ minWidth: "105px" }}
                        onClick={(e) => goMbtwhyDetail(e, why)}
                      >
                        {formatDate(why.writeDate)}
                      </td>
                      <td
                        sm={1}
                        className="text-center"
                        onClick={(e) => goMbtwhyDetail(e, why)}
                      >
                        {why.recommendCnt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          {PaginationInside()}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default MyMbtWhy;
