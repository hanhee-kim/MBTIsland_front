// import React, { useState } from 'react';
import { useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Table } from "reactstrap";
// import { Button, Table } from 'reactstrap';

const MyAlarm = () => {
  // 더미데이터
  const [alarmList] = useState([
    {
      alarmNo:1,
      username:'test',
      alarmType:'댓글', //댓글 , 대댓글 , 경고 , 블라인드처리 
      alarmTargetNo:10,
      alarmTargetFrom:'MBTMI_COMMENT',
      isRead:'N',
      readDate:'2029-03-06T12:12:00',
      updateDate:'2029-03-06T12:12:00',
      alarmContent:'alarmTargetFrom에 대한 alarmType이 있습니다.',
    },
  ]);

   // 체크된 아이템을 담을 배열
   const [checkItems, setCheckItems] = useState([]);

   // 체크박스 단일 선택
   const handleSingleCheck = (checked, no) => {
     if (checked) {
       // 단일 선택 시 체크된 아이템을 배열에 추가
       setCheckItems(prev => [...prev, no]);
     } else {
       // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
       setCheckItems(checkItems.filter((el) => el !== no));
     }
   };
 
   // 체크박스 전체 선택
   const handleAllCheck = (checked) => {
     if(checked) {
       // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
       const noArray = [];
       alarmList.forEach((el) => noArray.push(el.no));
       setCheckItems(noArray);
     }
     else {
       // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
       setCheckItems([]);
     }
   }
   const readAlarm = () => {
     //checkItems를 전송해서 삭제 + list새로 가져오는 작업 필요
    //  알람삭제 ? 읽음처리 ?
   }
   const allRaed = () => {

   }

  return (
    <div className={style.myMbtwhyContainer}>
      <div className={style.myMbtwhyTitle}>* 알림 목록 *</div>
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <div style={{display:'flex',gap:'600px'}}>
          <div>
            <Button color="light" style={{ margin: "10px" }} onClick={readAlarm}>
              읽음
            </Button>
          </div>
          <div>
            <Button color="dark" style={{ margin: "10px" }} onClick={allRaed}>
              모두 읽음
            </Button>
          </div>

        </div>
        <div className={style.tableDiv}>
        <Table className="table-hover" style={{ minWidth: "770px" }}>
          <thead>
            <tr className="text-center">
              <th scope="col" sm={1}>
                <input type="checkbox" name='select-all'
              onChange={(e) => handleAllCheck(e.target.checked)}
              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
              checked={checkItems.length === alarmList.length ? true : false} />
              </th>
              <th scope="col" sm={2}>
                타입
              </th>
              <th scope="col" sm={5}>
                내용
              </th>
              <th scope="col" sm={3}>
                알림 일시
              </th>
              <th scope="col" sm={1}>
                확인
              </th>
            </tr>
          </thead>
          <tbody>
            {alarmList.map((alarm, index) => {
              return (
                <tr key={index}>
                  <td sm={1} className="text-center">
                    <input type="checkbox"  name={`select-${alarm.no}`}
                onChange={(e) => handleSingleCheck(e.target.checked, alarm.no)}
                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                checked={checkItems.includes(alarm.no) ? true : false} />
                  </td>
                  <td sm={2} className="text-center">
                    [ {alarm.alarmType} ]
                  </td>
                  <td
                    sm={5}
                    className="text-truncate"
                    style={{ maxWidth: "600px" }}
                  >
                    {alarm.alarmContent}
                  </td>
                  <td
                    sm={3}
                    className="text-center"
                    style={{ minWidth: "105px" }}
                  >
                    {alarm.updateDate.split("T")[0]}
                  </td>
                  <td sm={1} className="text-center">
                    {alarm.isRead === 'N' ? "안 읽음":"읽음"}
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

export default MyAlarm;