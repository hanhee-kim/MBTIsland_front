import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../../css/common/Header.module.css";
import { Button, Popover, PopoverBody } from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { urlroot } from "../../config";
import Swal from "sweetalert2";

const Header = () => {
  // const token = useSelector((state) => state.persistedReducer.token);
  const user = useSelector((state) => state.persistedReducer.user);
  const uri = useLocation().pathname;
  const [alarmCnt, setAlarmCnt] = useState(0);
  const [noteCnt, setNoteCnt] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const localUser = localStorage.getItem("user");
  const token = useSelector((state) => state.persistedReducer.token);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // 읽지않은 쪽지리스트
  const [messagesNotRead, setMessagesNotRead] = useState([]);
  // 미확인 알림리스트
  const [alertNotRead, setAlertNotRead] = useState([]);
  useEffect(() => {
    //console.log(uri);
    //토큰보내서 유저 store에 올림
    //console.log("token???:" + token);
    if (token === null || token == "") {
      //console.log("token없음");
    } else {
      // user 정보
      axios
        .get(`${urlroot}/user`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          //console.log(res);
          //console.log("data:" + res.data);
          dispatch({ type: "user", payload: res.data });
        })
        .catch((err) => {
          //console.log("user가져오기 에러");
          //console.log(err);
        });
    }
    //먼저 한번 실행
    getNoteListAndAlarmList();
    // //컴포넌트 마운트될 때 실행할 interval(1초마다 실행)
    const intervalId = setInterval(() => {
      getNoteListAndAlarmList();
    }, 1000);
    // 컴포넌트가 언마운트될 때 clearInterval을 통해 정리
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 팝오버 여닫힘 상태
  const [popoverStates, setPopoverStates] = useState({
    popoverUser: false,
    popoverBell: false,
    popoverMessage: false,
  });
  const togglePopover = (popoverKey) => {
    setPopoverStates((prevState) => ({
      ...prevState,
      [popoverKey]: !prevState[popoverKey],
    }));
  };
  const getNoteListAndAlarmList = async () => {
    await axios
      .get(`${urlroot}/getnoteandalarm?username=${user.username}`)
      .then((res) => {
        // console.log('getNoteListAndAlarmList 결과: ', res);

        //alarmList
        setAlertNotRead(res.data.alarmList);
        //alarmCnt
        setAlarmCnt(res.data.alarmCnt);
        //noteList
        setMessagesNotRead(res.data.noteList);
        //noteCnt
        setNoteCnt(res.data.noteCnt);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    //
    const clickOutsidePopover = (event) => {
      const popoverElements = document.querySelectorAll(".popover");
      // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
      if (
        Array.from(popoverElements).every(
          (popover) => !popover.contains(event.target)
        )
      ) {
        setPopoverStates({
          popoverUser: false,
          popoverBell: false,
          popoverMessage: false,
        });
      }
    };

    document.addEventListener("mousedown", clickOutsidePopover);
    return () => {
      document.removeEventListener("mousedown", clickOutsidePopover);
    };
  }, []);

  // 팝오버 내부 Link클릭하여 uri가 변경되면 팝오버 닫기
  useEffect(() => {
    setPopoverStates({
      popoverUser: false,
      popoverBell: false,
      popoverMessage: false,
    });
  }, [uri]);

  //알림 모두읽음 버튼
  const allReadAlarm = (e) => {
    //console.log("allreadAlarm");
    axios
      .put(`${urlroot}/updatealarmisreadall?username=${user.username}`)
      .then((res) => {
        //console.log(res);
        //데이터 다시 불러오기
        getNoteListAndAlarmList();
      })
      .catch((err) => {
        //console.log(err.response.data);
        let errLog = err.response.data;
      });
  };
  //노트 모두읽음 버튼
  const allReadNote = (e) => {
    //console.log("allreadNote");
    axios
      .put(`${urlroot}/updatenoteisreadall?username=${user.username}`)
      .then((res) => {
        //console.log("성공");
        getNoteListAndAlarmList();
      })
      .catch((err) => {});
  };
  //알림 클릭시
  const goAlarmDetail = (e, index, alarm) => {
    //console.log(e);
    //navigate()
    //console.log(alarm.detailType);
    //console.log(alarm.detailNo);
    //console.log(alarm.detailMbti);
    switch (alarm.detailType) {
      case "NOTE":
        checkAlarm(alarm.alarmNo);
        goNoteDetail(e, alarm.detailNo);
        break;
      case "MBTMI":
        checkAlarm(alarm.alarmNo);
        navigate(`/mbtmidetail/${alarm.detailNo}`);
        getNoteListAndAlarmList();
        break;
      case "MBTWHY":
        checkAlarm(alarm.alarmNo);
        navigate(`/mbtwhydetail/${alarm.detailNo}/${alarm.detailMbti}`);
        getNoteListAndAlarmList();
        break;
      case "MBATTLE":
        checkAlarm(alarm.alarmNo);
        navigate(`/mbattledetail/${alarm.detailNo}`);
        getNoteListAndAlarmList();
        break;
      case "QUESTION":
        checkAlarm(alarm.alarmNo);
        goQuestionDetail(alarm.detailNo);
        getNoteListAndAlarmList();
        break;
      case "WARN":
        checkAlarm(alarm.alarmNo);
        Swal.fire({
          title: alarm.alarmType + "가 1회",
          text: "지금까지 총 " + (alarm.warnCnt+1) + " 회의 경고를 받으셨습니다.",
          icon: "warning",
        });
        getNoteListAndAlarmList();
        break;
      case "BAN":
        checkAlarm(alarm.alarmNo);
        Swal.fire({
          title: alarm.alarmType + "처리",
          text: "정지 종료일은 " + formatDate(alarm.banDate) + "입니다.",
          icon: "warning",
        });
        getNoteListAndAlarmList();
        break;
      default:
    }
  };
  const checkAlarm = (no) => {
    axios
      .put(`${urlroot}/checkalarm/${no}`)
      .then((res) => {
        //console.log(res.data);
      })
      .catch((err) => {});
  };
  const goQuestionDetail = (no) => {
    const noteUrl = "/questiondetail/" + no;
    window.open(
      noteUrl,
      "_blank",
      "width=650,height=700,location=no,status=no,scrollbars=yes"
    );
  };
  //쪽지 클릭시
  const goNoteDetail = (e, no) => {
    //console.log(e);
    const noteUrl = "/notedetail/" + no;
    window.open(
      noteUrl,
      "_blank",
      "width=650,height=700,location=no,status=no,scrollbars=yes"
    );
    getNoteListAndAlarmList();
  };
  return (
    <div className={style.header}>
      <ul className={style.navItems}>
        {/* 좌측 메뉴 */}
        <div>
          <li className={style.navItem}>
            <Link to={"/"} className={style.siteTitle}>
              MBTIsland
              <img
                src={"/desert-island.png"}
                alt="로고"
                width="30px"
                className={style.logoIcon}
              />
            </Link>
          </li>

          <li
            className={
              uri.includes("/mbtmi")
                ? `${style.navItem} ${style.currentBoard}`
                : style.navItem
            }
          >
            <Link to={"/mbtmi"}>MB-TMI</Link>
          </li>
          <li
            className={
              uri.includes("/mbtwhy")
                ? `${style.navItem} ${style.currentBoard}`
                : style.navItem
            }
          >
            <Link to={"/mbtwhymain"}>MBT-WHY</Link>
          </li>
          <li
            className={
              uri.includes("/mbattle")
                ? `${style.navItem} ${style.currentBoard}`
                : style.navItem
            }
          >
            <Link to={"/mbattle"}>M-BATTLE</Link>
          </li>
        </div>

        {/* 우측 메뉴 */}
        {user.userNickname == null || user.userNickname === "" ? (
          <div style={{ marginRight: "120px" }}>
            <li className={style.navItem}>
              <Link to={"/login"}>
                <Button color="light">로그인</Button>
              </Link>
            </li>
            <li className={style.navItem}>
              <Link to={"/join"}>
                <Button color="dark">회원가입</Button>
              </Link>
            </li>
          </div>
        ) : user.userRole === "ROLE_USER" ? (
          <div className={style.afterLogin}>
            <div>
              {alarmCnt > 0 ? (
                <img
                  src={"/bell-full.png"}
                  alt="알림"
                  className={style.bellIcon}
                  onClick={() => togglePopover("popoverBell")}
                  id="popoverBell"
                />
              ) : (
                <img
                  src={"/bell.png"}
                  alt="알림"
                  className={style.bellIcon}
                  onClick={() => togglePopover("popoverBell")}
                  id="popoverBell"
                />
              )}
              <Popover
                className={style.popoverBellOrMessage}
                placement="bottom"
                isOpen={popoverStates.popoverBell}
                target="popoverBell"
                toggle={() => togglePopover("popoverBell")}
              >
                <PopoverBody className={style.popoverBellOrMessageItem}>
                  {/* 미확인 알림 수 표시 */}
                  <Link to={"/mypage/alarm"} className={style.popoverLink}>
                    <div className={style.popoverTopArea}>
                      <span className={style.newAlarm}>
                        새로운 알림 ({alarmCnt})
                      </span>
                      &nbsp;
                      <span>&gt;</span>
                    </div>
                  </Link>
                  <hr className={style.separator} />

                  {/* 알림 내용 표시 */}
                  {alarmCnt > 0 ? (
                    alertNotRead.map(
                      (alert, index) =>
                        index < 5 && (
                          <div key={index} className={style.alertContentAndCnt}>
                            <div className={style.alertContent} onClick={(e) => goAlarmDetail(e, index, alert)}>

                              {/* {alert.alarmType === "댓글"? `${alert.alarmCnt}개의 새 ${alert.alarmType}이 있습니다.` */}
                              {alert.alarmType === "댓글"? `내 ${alert.alarmTargetFrom.includes('omment')? '댓글': '게시글'}의 새 ${alert.alarmType}(${alert.alarmCnt})이 있습니다`
                              : alert.alarmType === "쪽지"? `새 쪽지가 도착했습니다`
                              : alert.alarmType === "답글"? `문의글에 답글이 달렸습니다`
                              : alert.alarmType === "경고"? `경고처분을 받았습니다`
                              : alert.alarmType === "제재"? `정지처분을 받았습니다`
                              : null
                              }

                            </div>
                          </div>
                        )
                    )
                  ) : (
                    <div>
                      <br />
                      새로운 알림이 없습니다
                      <br />
                      <br />
                    </div>
                  )}

                  {/* 생략된 알림이 있음을 알리는 표시 */}
                  {alarmCnt > 5 && (
                    <div className={style.hasMoreMessages}>
                      <span>...</span>
                    </div>
                  )}

                  {/* 모두확인 버튼 */}
                  {alarmCnt > 0 && (
                    <div className={style.popoverBtnArea}>
                      <button
                        className={style.readAllBtn}
                        onClick={(e) => allReadAlarm(e)}
                      >
                        모두 확인
                      </button>
                    </div>
                  )}
                </PopoverBody>
              </Popover>

              {noteCnt > 0 ? (
                <img
                  src={"/messageIcon-full.png"}
                  alt="쪽지"
                  className={style.messageIcon}
                  onClick={() => togglePopover("popoverMessage")}
                  id="popoverMessage"
                />
              ) : (
                <img
                  src={"/messageIcon.png"}
                  alt="쪽지"
                  className={style.messageIcon}
                  onClick={() => togglePopover("popoverMessage")}
                  id="popoverMessage"
                />
              )}
              <Popover
                className={style.popoverBellOrMessage}
                placement="bottom"
                isOpen={popoverStates.popoverMessage}
                target="popoverMessage"
                toggle={() => togglePopover("popoverMessage")}
              >
                <PopoverBody className={style.popoverBellOrMessageItem}>
                  {/* 읽지 않은 쪽지 수 표시 */}
                  <Link to={"/mypage/note"} className={style.popoverLink}>
                    <div className={style.popoverTopArea}>
                      <span className={style.newNote}>
                        새로운 쪽지 ({noteCnt})
                      </span>
                      &nbsp;
                      <span>&gt;</span>
                    </div>
                  </Link>
                  <hr className={style.separator} />

                  {/* 쪽지 제목 표시 */}
                  {noteCnt > 0 ? (
                    messagesNotRead.map(
                      (note, index) =>
                        index < 5 && (
                          <div key={index}>
                            <div className={style.messageTitle} onClick={(e) => goNoteDetail(e, note.noteNo)}>
                              {`[${note.sentUserNick}]에게 쪽지를 받았습니다.`}
                            </div>
                          </div>
                        )
                    )
                  ) : (
                    <div>
                      <br />
                      새로운 쪽지가 없습니다
                      <br />
                      <br />
                    </div>
                  )}

                  {/* 생략된 쪽지가 있음을 알리는 표시 */}
                  {noteCnt > 5 && (
                    <div className={style.hasMoreMessages}>
                      <span>...</span>
                    </div>
                  )}

                  {/* 모두확인 버튼 */}
                  {noteCnt > 0 && (
                    <div className={style.popoverBtnArea}>
                      <button
                        className={style.readAllBtn}
                        onClick={(e) => allReadNote(e)}
                      >
                        모두 확인
                      </button>
                    </div>
                  )}
                </PopoverBody>
              </Popover>

              <span
                className={style.openPopover}
                onClick={() => togglePopover("popoverUser")}
                id="popoverUser"
              >
                <span
                  className={style.userMbti}
                  style={{ backgroundColor: user.userMbtiColor }}
                >
                  {user.userMbti}
                </span>
                <span className={style.userNickname}>{user.userNickname}</span>
              </span>
              <Popover
                className={style.popover}
                placement="bottom"
                isOpen={popoverStates.popoverUser}
                target="popoverUser"
                toggle={() => togglePopover("popoverUser")}
              >
                <Link to={"/mypage/profile"} className={style.popoverLink}>
                  <PopoverBody className={style.popoverItem}>
                    마이페이지
                  </PopoverBody>
                </Link>
                <Link to={"/logout"} className={style.popoverLink}>
                  <PopoverBody className={style.popoverItem}>
                    로그아웃
                  </PopoverBody>
                </Link>
              </Popover>
            </div>
          </div>
        ) : user.userRole === "ROLE_ADMIN" ? (
          <div className={style.afterLogin}>
            <div
              className={style.openPopover}
              onClick={() => togglePopover("popoverUser")}
              id="popoverUser"
            >
              <span className={style.userNickname}>관리자 모드</span>
              <img
                src={"/spannerIcon-full.png"}
                alt=""
                className={style.spannerIcon}
              />
            </div>
            <Popover
              className={style.popover}
              placement="bottom"
              isOpen={popoverStates.popoverUser}
              target="popoverUser"
              toggle={() => togglePopover("popoverUser")}
            >
              <Link to="adminnotice" className={style.popoverLink}>
                <PopoverBody className={style.popoverItem}>
                  관리자페이지
                </PopoverBody>
              </Link>
              <Link to={"/logout"} className={style.popoverLink}>
                <PopoverBody className={style.popoverItem}>
                  로그아웃
                </PopoverBody>
              </Link>
            </Popover>
          </div>
        ) : user.userRole === "ROLE_GUEST" ? (
          <div className={style.addJoin}>
            <Link to={"/addjoin"}>
              <Button>추가정보</Button>
            </Link>
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default Header;
