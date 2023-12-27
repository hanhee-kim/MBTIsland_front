import React, { useEffect, useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { urlroot } from "../../config";

const MyMbtmi = (props) => {
  const user = useSelector((state) => state.persistedReducer.user);
  const [initData, setInitData] = useState(true);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  // navigate
  const navigate = useNavigate();
  const [tmiList,setTmiList] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  //서버와 통신할 메소드 정의
  const getMyMbtmiList = (username,page) => {
    console.log(page);
    console.log("url:" + `${urlroot}/mbtmilist?username=${username}&page=${page}`);

    axios
      .get(`${urlroot}/mbtmilist?username=${username}&page=${page}`)
      .then((res) => {
        console.log(res);
        setInitData(true);
        setPageInfo(res.data.pageInfo);
        setTmiList(res.data.mbtmiList);
      })
      .catch((err) => {
        console.log(err);
        setInitData(false);
      });
  };
  useEffect(() => {
    //tmi controller + 변수 담아 맵핑
    getMyMbtmiList(user.username,page);
  }, []);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, no) => {
    console.log(no);
    console.log(checkItems);
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
      const idArray = [];
      tmiList.forEach((el) => idArray.push(el.no));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const delTmi = () => {
    if(checkItems.length===0) {
      Swal.fire({
          title: "체크된 항목이 없습니다.",
          icon: "warning",
      });
      return;
    }
    //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
    let sendArrayItems = checkItems.join(",");
    console.log(checkItems.type);
    console.log(checkItems);

    //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
    axios
      .delete(
        `${urlroot}/deletembtmilist?sendArrayItems=${sendArrayItems}`
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "삭제 성공!",
          icon: "success",
        });
        setCheckItems([]);

        getMyMbtmiList(user.username, page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //tr 클릭시 detail로 이동
  const goMyMbtmiDetail = (e, tmi) => {
    navigate(`/mbtmidetail/${tmi.no}`);
  };
  const handlePageNo = (pageNo) => {
    setPage(pageNo);
    console.log("***페이지이동***");
    getMyMbtmiList(user.username,pageNo);
    // getMyMbtmiList(user.username, pageNo);
    //페이지가 변경되면 checkItems 빈배열로 초기화.
    setCheckItems([]);

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

  return (
    <div className={style.myMbtmiContainer}>
      <div className={style.myMbtmiTitle}>* MB-TMI *</div>
      {initData ? (
        <>
          <div style={{ padding: "20px", marginTop: "10px" }}>
            <Button color="dark" style={{ margin: "10px" }} onClick={delTmi}>
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
                          checkItems.length === tmiList.length ? true : false
                        }
                      />
                    </th>
                    <th scope="col" sm={1}>
                      번호
                    </th>
                    <th scope="col" sm={2}>
                      카테고리
                    </th>
                    <th scope="col" sm={4} style={{ minWidth: "200px" }}>
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
                          <input
                            type="checkbox"
                            name={`select-${tmi.no}`}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, tmi.no)
                            }
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={checkItems.includes(tmi.no) ? true : false}
                          />
                        </td>
                        <td sm={1} className="text-center" onClick={(e) => goMyMbtmiDetail(e, tmi)}>
                          {tmi.no}
                        </td>
                        <td sm={2} className="text-center" onClick={(e) => goMyMbtmiDetail(e, tmi)}>
                          [ {tmi.category} ]
                        </td>
                        <td
                          sm={4}
                          className="text-truncate"
                          style={{ maxWidth: "400px" }}
                          onClick={(e) => goMyMbtmiDetail(e, tmi)}
                        >
                          {tmi.title}
                        </td>
                        <td
                          sm={3}
                          className="text-center"
                          style={{ minWidth: "105px" }}
                          onClick={(e) => goMyMbtmiDetail(e, tmi)}
                        >
                          {formatDate(tmi.writeDate)}
                        </td>
                        <td sm={1} className="text-center" onClick={(e) => goMyMbtmiDetail(e, tmi)}>
                          {tmi.recommendCnt}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            {PaginationInside()}
          </div>
        </>
      ) : (
        <div
          name="notDataDiv"
          style={{
            minHeight: "700px",
            padding: "100px",
            display: "flex",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          <div style={{ fontSize: "25px" }}>
            작성한 MB-TMI 게시글이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMbtmi;
