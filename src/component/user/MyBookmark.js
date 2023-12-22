import React, { useEffect, useState } from 'react';
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { urlroot } from "../../config";

const MyBookmark = () => {
  const user = useSelector((state) => state.persistedReducer.user.user);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [initData, setInitData] = useState(true);
  const [bookmarkList, setBookmarkList] = useState([]);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // const path = useLocation().pathname;
  // const user = useSelector((state) => state.persistedReducer.user.user);
  //username맞는 북마크리스트 
  // -> 보드타입(if나누기 꺼내오는 테이블이 달라짐)
  // -> 맞는 보드No로 게시글뽑아서 각 게시글리스트에 담기
  // -> mbtwhy , mbtmi 리스트이름으로 보내기.
  // DTO에서 해당하는 게시글의 제목과 작성일(0000-00-00형태로) 댓글수를 포함해서 가져올것.
  //제목,작성일,댓글수 ( DTO )
  const navigate = useNavigate();
  //더미데이터
  const getMyBookmarkList = (username,page) => {
    console.log("axios들어갈자리");
    axios
      .get(`${urlroot}/mybookmarklist/${username}/${page}`)
      .then((res) => {
        console.log(res);
        setInitData(true);
        setPageInfo(res.data.pageInfo);
        setBookmarkList(res.data.bookmarkList);
      })
      .catch((err) => {
        console.log(err);
        setInitData(false);
      })
  }
  useEffect(() => {
    getMyBookmarkList(user.username,page);
  },[])
  const handlePageNo = (pageNo) => {
    setPage(pageNo);
    console.log("***페이지이동***");
    // getMyBookmarkList(user.username, pageNo);
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
  // const [isBookmarked,setIsBookmarked] = useState(true);
  const changeBookmarkIcon = (e,no,boardType) => {
    console.log("trClick"+no+boardType)
    //해당 북마크 넘버 가져가서 북마크테이블에서 지우기
    //원래 가져온게 (true) 만가져오긴함 true면 false로 ,
    // false로 바꾸면 해당 리스트에서 지우고 한번 더 데이터 가져올지? 
    // const trClick = (bookmark) => {
    //   console.log("trClick ");
    //   if(boardType === 'MBT-WHY'){
    //     console.log("???")
    //     navigate('/mbtwhydetail/:no');
    //   }
    //   else{ //MBTMI
    //    navigate('/mbtmidetail/:no');
    //   }
    // }
  }
    // 체크박스 단일 선택
    const handleSingleCheck = (checked, no) => {
      if (checked) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems((prev) => [...prev, no]);
      } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== no));
      }
      console.log(checkItems);
    };
  
    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
      if (checked) {
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
        const noArray = [];
        bookmarkList.forEach((el) => noArray.push(el.no));
        setCheckItems(noArray);
      } else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
        setCheckItems([]);
      }
    };
    const delBookmark = () => {
      let sendArrayItems = checkItems.join(",");
      console.log(checkItems.type);
      console.log(checkItems);
  
      //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
      axios
        .delete(
          `${urlroot}/deletebookmark?sendArrayItems=${sendArrayItems}`
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "삭제 성공!",
            icon: "success",
          });
          setCheckItems([]);
          getMyBookmarkList(user.username, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };    
  return (
    <div className={style.bookmarkContainer}>
      <div className={style.bookmarkTitle}>* 북마크 *</div>
      {initData ? (
        <div style={{ padding: "20px", marginTop: "10px" }}>
          <Button color="dark" style={{ margin: "10px" }} onClick={delBookmark}>
            북마크 해제
          </Button>
        {/* <div style={{height:'25px'}}></div> */}
        <div className={style.tableDiv}>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr row className="text-center">
            <th scope="col" sm={1}>
                    <input
                      type="checkbox"
                      name="select-all"
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                      checked={
                        checkItems.length === bookmarkList.length ? true : false
                      }
                    />
              </th>
              <th scope="col" sm={1}>
                번호
              </th>
              <th scope="col" sm={2}>
                카테고리
              </th>
              <th scope="col" sm={4}>
                제목 or 내용
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
            {bookmarkList.map((bookmark, index) => {
              return (
                <tr key={index}>
                  <td sm={1} className="text-center">
                        <input
                          type="checkbox"
                          name={`select-${bookmark.no}`}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, bookmark.no)
                          }
                          // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                          checked={checkItems.includes(bookmark.no) ? true : false}
                        />
                      </td>
                  <td sm={1} className="text-center">
                    {bookmark.no}
                  </td>
                  <td sm={2} className="text-center">
                    [ {bookmark.boardType} ]
                  </td>
                  <td
                    sm={4}
                    className="text-truncate"
                    style={{ maxWidth: "400px" }}
                    >
                    {bookmark.boardTitle}
                  </td>
                  <td
                    sm={3}
                    className="text-center"
                    style={{ minWidth: "105px" }}
                    >
                    {formatDate(bookmark.writeDate)}
                  </td>
                  <td sm={1} className="text-center">
                    {bookmark.commentCnt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
            </div>
        {PaginationInside()}
      </div>
      ):(
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
              북마크된 게시글이 없습니다.
            </div>
          </div>
      </>)}
    </div>
  );
};

export default MyBookmark;