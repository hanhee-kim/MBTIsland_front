import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import style from "../../css/common/Header.module.css";
import { Button, Popover, PopoverBody } from "reactstrap";
import  axios  from 'axios';
import { useSelector } from "react-redux";

const Header = () => {
    const token = useSelector((state) => state.persistedReducer.token.token);
    const user = useSelector((state) => state.persistedReducer.user.user);
    const uri = useLocation().pathname;
    useEffect(() => {
        console.log(uri);
    }, [uri]);


    // // 로그인 유저
    // const [loginuser, sestLoginuser] = useState({
    //     username: "userid0123",
    //     userNickname: "낭만냥냥",
    //     userMbti: "INFP",
    //     userMbtiColor: "#BDC9A6",
    //     userRole: "USER",

    //     // username: "admin01",
    //     // userNickname: "관리자1",
    //     // userMbti: "",
    //     // userMbtiColor: "",
    //     // userRole: "ADMIN",
    // });


    // 팝오버 여닫힘 상태
    const [popoverStates, setPopoverStates] = useState({popoverUser:false, popoverBell:false, popoverMessage:false});
    const togglePopover = (popoverKey) => {
        setPopoverStates((prevState) => ({...prevState, [popoverKey]:!prevState[popoverKey]}));
    };
    
    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {
        

        //
        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (
                Array.from(popoverElements).every(
                    (popover) => !popover.contains(event.target)
                )
            ) {
                setPopoverStates({popoverUser: false, popoverBell:false, popoverMessage:false});
            } 
        };
    
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    // 팝오버 내부 Link클릭하여 uri가 변경되면 팝오버 닫기
    useEffect(() => {
        setPopoverStates({popoverUser: false, popoverBell:false, popoverMessage:false});
    }, [uri]);



    // 읽지않은 쪽지리스트
    const [messagesNotRead, setMessagesNotRead] = useState([
        // {messageTitle: '읽지않은쪽지제목1', messageContent: '받은쪽지내용1', messageDate: '2023-11-30', isRead: 'N'},
        // {messageTitle: '읽지않은쪽지제목2읽지않은쪽지제목2읽지않은쪽지제목2읽지않은쪽지제목2', messageContent: '받은쪽지내용1', messageDate: '2023-11-29', isRead: 'N'},
        // {messageTitle: '읽지않은쪽지제목3', messageContent: '받은쪽지내용1', messageDate: '2023-11-28', isRead: 'N'},
        // {messageTitle: '읽지않은쪽지제목4', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
        // {messageTitle: '읽지않은쪽지제목5', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
        // {messageTitle: '읽지않은쪽지제목6', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
        // {messageTitle: '읽지않은쪽지제목7', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
    ]);

    // 미확인 알림리스트
    const [alertNotRead, setAlertNotRead] = useState([
        {alertContent: '내게시글제목', alertType: '댓글', alertCnt: 5, isChecked: 'N'},
        {alertContent: '긴내게시글제목긴내게시글제목긴내게시글제목', alertType: '댓글', alertCnt: 20, isChecked: 'N'},
        {alertContent: '내댓글내용내댓글내용', alertType: '댓글', alertCnt: 9, isChecked: 'N'},
        {alertContent: '블라인드된내게시글제목', alertType: '경고', alertCnt: 0, isChecked: 'N'},
        {alertContent: '내문의글제목내문의글제목', alertType: '답변', alertCnt: 0, isChecked: 'N'},
        {alertContent: '블라인드된내댓글내용', alertType: '경고', alertCnt: 0, isChecked: 'N'},
    ]);


    return(
        <div className={style.header}>
            <ul className={style.navItems}>

                {/* 좌측 메뉴 */}
                <div>
                    <li className={style.navItem}>
                        <Link to={"/"} className={style.siteTitle}>
                            MBTIsland
                            <img src={"/desert-island.png"} alt='로고이미지' width='30px' className={style.logoIcon}/>
                        </Link>
                    </li>
                    <li className={uri.includes("/mbtwhy")? `${style.navItem} ${style.currentBoard}`: style.navItem}>
                        <Link to={"/mbtwhymain"}>MBT-WHY</Link>
                    </li>
                    <li className={uri.includes("/mbattle")? `${style.navItem} ${style.currentBoard}`: style.navItem}>
                        <Link to={"/mbattle"}>M-BATTLE</Link>
                    </li>
                    <li className={uri.includes("/mbtmi")? `${style.navItem} ${style.currentBoard}`: style.navItem}>
                        <Link to={"/mbtmi"}>MB-TMI</Link>
                    </li>
                </div>

                {/* 우측 메뉴 */}
                {(user.userNickname==null || user.userNickname ==='')? (
                    <div style={{marginRight: '120px'}}>
                        <li className={style.navItem}>
                            <Link to={"/login"}><Button color="light">로그인</Button></Link>
                        </li>
                        <li className={style.navItem}>
                            <Link to={"/join"}><Button color="dark">회원가입</Button></Link>
                        </li>
                    </div>
                ) : user.userRole==='ROLE_USER'? (
                    <div className={style.afterLogin}>
                        <div>
                            {alertNotRead.length>0? (
                            <img src={"/bell-full.png"} alt='알림' className={style.bellIcon} onClick={()=>togglePopover("popoverBell")} id="popoverBell"/>
                            ) : (
                            <img src={"/bell.png"} alt='알림' className={style.bellIcon} onClick={()=>togglePopover("popoverBell")} id="popoverBell"/>
                            )}
                            <Popover className={style.popoverBellOrMessage} placement="bottom" isOpen={popoverStates.popoverBell} target="popoverBell" toggle={()=>togglePopover("popoverBell")}>
                                <PopoverBody className={style.popoverBellOrMessageItem}>
                                    {/* 미확인 알림 수 표시 */}
                                    <Link to={"/mypage"} className={style.popoverLink}>
                                        <div className={style.popoverTopArea}>
                                            <span>새로운 알림 ({alertNotRead.length})</span>&nbsp;
                                            <span>&gt;</span>
                                        </div>
                                    </Link>
                                    <hr className={style.separator} />
                                
                                    {/* 알림 내용 표시 */}
                                    {alertNotRead.length>0? (
                                        alertNotRead.map((alert, index) => (
                                            index<5 && (
                                            <div key={index} className={style.alertContentAndCnt}>
                                                <div className={style.alertContent}>{alert.alertContent}</div>
                                                <div>
                                                    {`의 ${alert.alertType}`}
                                                    {alert.alertType==='댓글' && `(${alert.alertCnt})`}
                                                </div>
                                            </div>
                                            )
                                        ))
                                    ) : (
                                    <div><br/>새로운 알림이 없습니다<br/><br/></div>
                                    )}

                                    {/* 생략된 알림이 있음을 알리는 표시 */}
                                    {alertNotRead.length>5 && (
                                        <div className={style.hasMoreMessages}><span>...</span></div>
                                    )}

                                    {/* 모두확인 버튼 */}
                                    {alertNotRead.length>0 && (
                                        <div className={style.popoverBtnArea}>
                                            <button className={style.readAllBtn}>모두 확인</button>
                                        </div>
                                    )}
                                </PopoverBody>
                            </Popover>
                            
                            {messagesNotRead.length>0? (
                            <img src={"/messageIcon-full.png"} alt='쪽지' className={style.messageIcon} onClick={()=>togglePopover("popoverMessage")} id="popoverMessage"/>
                            ) : (
                            <img src={"/messageIcon.png"} alt='쪽지' className={style.messageIcon} onClick={()=>togglePopover("popoverMessage")} id="popoverMessage"/>
                            )}
                            <Popover className={style.popoverBellOrMessage} placement="bottom" isOpen={popoverStates.popoverMessage} target="popoverMessage" toggle={()=>togglePopover("popoverMessage")}>
                                <PopoverBody className={style.popoverBellOrMessageItem}>
                                    {/* 읽지 않은 쪽지 수 표시 */}
                                    <Link to={"/mypage"} className={style.popoverLink}>
                                        <div className={style.popoverTopArea}>
                                            <span>새로운 쪽지 ({messagesNotRead.length})</span>&nbsp;
                                            <span>&gt;</span>
                                        </div>
                                    </Link>
                                    <hr className={style.separator} />

                                    {/* 쪽지 제목 표시 */}
                                    {messagesNotRead.length>0? (
                                        messagesNotRead.map((message, index) => (
                                            index<5 && (
                                            <div key={index}>
                                                <div className={style.messageTitle}>{message.messageTitle}</div>
                                            </div>
                                            )
                                        ))
                                    ) : (
                                    <div><br/>새로운 쪽지가 없습니다<br/><br/></div>
                                    )}

                                    {/* 생략된 쪽지가 있음을 알리는 표시 */}
                                    {messagesNotRead.length>5 && (
                                        <div className={style.hasMoreMessages}><span>...</span></div>
                                    )}

                                    {/* 모두확인 버튼 */}
                                    {messagesNotRead.length>0 && (
                                        <div className={style.popoverBtnArea}>
                                            <button className={style.readAllBtn}>모두 확인</button>
                                        </div>
                                    )}
                                </PopoverBody>
                            </Popover>
                            
                            
                            <span className={style.openPopover} onClick={()=>togglePopover("popoverUser")} id="popoverUser">
                                <span className={style.userMbti} style={{backgroundColor:user.userMbtiColor}}>{user.userMbti}</span>
                                <span className={style.userNickname}>{user.userNickname}</span>
                            </span>
                            <Popover className={style.popover} placement="bottom" isOpen={popoverStates.popoverUser} target="popoverUser" toggle={()=>togglePopover("popoverUser")}>
                                <Link to={"/mypage"} className={style.popoverLink}>
                                    <PopoverBody className={style.popoverItem}>마이페이지</PopoverBody>
                                </Link>
                                <Link to={"/logout"} className={style.popoverLink}>
                                    <PopoverBody className={style.popoverItem}>로그아웃</PopoverBody>
                                </Link>
                            </Popover>

                        </div>
                    </div>)
                : user.userRole==='ROLE_ADMIN'?
                    (<div className={style.afterLogin}>
                        <div className={style.openPopover} onClick={()=>togglePopover("popoverUser")} id="popoverUser">
                            <span className={style.userNickname}>관리자 모드</span>
                            <img src={"/spannerIcon-full.png"} alt="" className={style.spannerIcon}/>
                        </div>
                        <Popover className={style.popover} placement="bottom" isOpen={popoverStates.popoverUser} target="popoverUser" toggle={()=>togglePopover("popoverUser")}>
                            <Link to="adminnotice" className={style.popoverLink}>
                                <PopoverBody className={style.popoverItem}>관리자페이지</PopoverBody>
                            </Link>
                            <Link to={"/logout"} className={style.popoverLink}>
                                <PopoverBody className={style.popoverItem}>로그아웃</PopoverBody>
                            </Link>
                        </Popover>
                    </div>)
                : user.userRole === 'ROLE_GUEST' ?(
                    <div className={style.addJoin}>
                        <Link to={'/addjoin'}><Button>추가정보</Button></Link>

                    </div>
                ):null}

            </ul>
            
        </div>
    )
};

export default Header;