import React, { useState } from 'react';
import style from "../../css/user/Mypage.module.css";
import { Table } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
// import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const MyBookmark = () => {
  // const path = useLocation().pathname;
  // const user = useSelector((state) => state.persistedReducer.user.user);
  //username맞는 북마크리스트 
  // -> 보드타입(if나누기 꺼내오는 테이블이 달라짐)
  // -> 맞는 보드No로 게시글뽑아서 각 게시글리스트에 담기
  // -> mbtwhy , mbtmi 리스트이름으로 보내기.
  // DTO에서 해당하는 게시글의 제목과 작성일(0000-00-00형태로) 댓글수를 포함해서 가져올것.
  const navigate = useNavigate();
  //더미데이터
  const [bookmarkList] = useState([
    {
      no:1,
      username:'test',
      postNo:10,
      boardType:'MBT-WHY',
      title:'ㅅㄷㄴ',
      writeDate:'2020-12-23',
      recommendCnt:'19'
    },
    {
      no:2,
      username:'test',
      postNo:10,
      boardType:'MB-TMI',
      title:'ㅅㄷㄴffffff',
      writeDate:'2020-02-23',
      recommendCnt:'19'
    },
    {
      no:3,
      username:'test',
      postNo:15,
      boardType:'MB-TMI',
      title:'rrssrrsesdfeeffffff',
      writeDate:'2020-12-23',
      recommendCnt:'19'
    },
    {
      no:4,
      username:'test',
      postNo:12,
      boardType:'MBT-WHY',
      title:'ㅅㄷㄴ',
      writeDate:'2020-12-02',
      recommendCnt:'1'
    },
    {
      no:5,
      username:'test',
      postNo:13,
      boardType:'MBT-WHY',
      title:'testtest',
      writeDate:'2020-12-20',
      recommendCnt:'9'
    },
  ]);
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
      
  return (
    <div className={style.bookmarkContainer}>
      <div className={style.bookmarkTitle}>* 북마크 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <div style={{height:'25px'}}></div>
        <div className={style.tableDiv}>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr row className="text-center">
              <th scope="col" sm={1}>
                <img src={"../bookmark-icon-.png"} alt='bookmark' width={'20px'} height={'30px'}/>
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
            {bookmarkList.map((bookmark, index) => {
              return (
                <tr key={index} onClick={(e)=>changeBookmarkIcon(e,bookmark.no,bookmark.boardType)} >
                  <td sm={1} className="text-center">
                    <img src='' alt='' />
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
                      {/* {bookmark.title} */}
                    {/* <Link to={bookmark.boardType === 'MBT-WHY' ? '' : '' }> */}
                      {bookmark.title}
                    {/* </Link> */}
                  </td>
                  <td
                    sm={3}
                    className="text-center"
                    style={{ minWidth: "105px" }}
                    >
                    {bookmark.writeDate}
                  </td>
                  <td sm={1} className="text-center">
                    {bookmark.recommendCnt}
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

export default MyBookmark;