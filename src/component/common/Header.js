import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import style from "../../css/common/Header.module.css";
import { Button, Popover, PopoverBody } from "reactstrap";

const Header = () => {

    const uri = useLocation().pathname;
    useEffect(() => {
        console.log(uri);
    }, [uri]);


    // 로그인 유저
    const [loginuser, sestLoginuser] = useState({
        username: "userid0123",
        userNickname: "낭만냥냥",
        userMbti: "INFP",
        userMbtiColor: "#BDC9A6",
        userRole: "USER"
    });
    // const [loginuser, sestLoginuser] = useState({
    //     username: "admin01",
    //     userNickname: "관리자1",
    //     userMbti: "",
    //     userMbtiColor: "",
    //     userRole: "ADMIN"
    // });


    // 팝오버 여닫힘 상태
    const [popoverStates, setPopoverStates] = useState({popoverUser:false, popoverBell:false, popoverMessage:false});
    const togglePopover = (popoverKey) => {
        setPopoverStates((prevState) => ({...prevState, [popoverKey]:!prevState[popoverKey]}));
    };

    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {
        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setPopoverStates({popoverUser: false, popoverBell:false, popoverMessage:false});
            } 
        };
    
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };

    }, []);

    // 읽지않은 쪽지리스트
    const [messagesNotRead, setMessagesNotRead] = useState([
        {messageTitle: '읽지않은쪽지제목1', messageContent: '받은쪽지내용1', messageDate: '2023-11-30', isRead: 'N'},
        {messageTitle: '읽지않은쪽지제목2읽지않은쪽지제목2읽지않은쪽지제목2읽지않은쪽지제목2', messageContent: '받은쪽지내용1', messageDate: '2023-11-29', isRead: 'N'},
        {messageTitle: '읽지않은쪽지제목2', messageContent: '받은쪽지내용1', messageDate: '2023-11-28', isRead: 'N'},
        {messageTitle: '읽지않은쪽지제목4', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
        {messageTitle: '읽지않은쪽지제목5', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
        {messageTitle: '읽지않은쪽지제목6', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
        {messageTitle: '읽지않은쪽지제목7', messageContent: '받은쪽지내용1', messageDate: '2023-11-27', isRead: 'N'},
    ]);


    return(
        <div className={style.header}>
            <ul className={style.navItems}>
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

                {!loginuser? (
                    <div style={{ marginRight: '120px' }}>
                        <li className={style.navItem}>
                            <Link to={"/logout"}>
                                <Button color="light">로그아웃</Button>
                            </Link>
                        </li>
                    </div>
                ) : loginuser.userRole==='USER'? (
                    <div className={style.afterLogin}>
                        <div>

                            <img src={"/bell.png"} alt='알림' className={style.bellIcon} onClick={()=>togglePopover("popoverBell")} id="popoverBell"/>
                            <Popover className={style.popover} placement="bottom" isOpen={popoverStates.popoverBell} target="popoverBell" toggle={()=>togglePopover("popoverBell")}>
                                <PopoverBody className={style.popoverItem}>알림창</PopoverBody>
                            </Popover>
                            
                            
                            <img src={"/messageIcon.png"} alt='쪽지' className={style.messageIcon} onClick={()=>togglePopover("popoverMessage")} id="popoverMessage"/>
                            <Popover className={style.popoverBellOrMessage} placement="bottom" isOpen={popoverStates.popoverMessage} target="popoverMessage" toggle={()=>togglePopover("popoverMessage")}>
                                <PopoverBody className={style.popoverBellOrMessageItem}>
                                    {/* 쪽지 수 표시 */}
                                    <div className={style.popoverTopArea}>
                                        <span>새로운 쪽지 ({messagesNotRead.length})</span>&nbsp;
                                        <span>&gt;</span>
                                    </div>
                                    <hr className={style.separator} />

                                    {messagesNotRead.length>0 ? (
                                        messagesNotRead.map((message, index) => (
                                            index<5 && (
                                            <div key={index}>
                                                {/* 메시지 제목 표시 */}
                                                <div className={style.messageTitle}>{message.messageTitle}</div>

                                                {/* 버튼 ---------- */}
                                                {index === messagesNotRead.length - 1 && (
                                                    <div className={style.popoverBtnArea}>
                                                        <button className={style.readAllBtn}>모두 확인</button>
                                                    </div>
                                                )}
                                            </div>
                                            )
                                        ))
                                    ) : (
                                    <div>새로운 쪽지가 없습니다</div>
                                    )}
                                </PopoverBody>
                            </Popover>
                            
                            
                            <span className={style.openPopover} onClick={()=>togglePopover("popoverUser")} id="popoverUser">
                                <span className={style.userMbti}>INFP</span>
                                <span className={style.userNickname}>낭만냥냥</span>
                            </span>
                            <Popover className={style.popover} placement="bottom" isOpen={popoverStates.popoverUser} target="popoverUser" toggle={()=>togglePopover("popoverUser")}>
                                <PopoverBody className={style.popoverItem}>마이페이지</PopoverBody>
                                <PopoverBody className={style.popoverItem}>로그아웃</PopoverBody>
                            </Popover>


                        </div>
                    </div>)
                : loginuser.userRole==='ADMIN'?
                    (<div className={style.afterLogin}>
                        <div className={style.openPopover} onClick={()=>togglePopover("popoverUser")} id="popoverUser">
                            <span className={style.userNickname}>관리자 모드</span>
                            <img src={"/spannerIcon.png"} alt="" className={style.spannerIcon}/>
                        </div>
                        <Popover className={style.popover} placement="bottom" isOpen={popoverStates.popoverUser} target="popoverUser" toggle={()=>togglePopover("popoverUser")}>
                            <PopoverBody className={style.popoverItem}>관리자페이지</PopoverBody>
                            <PopoverBody className={style.popoverItem}>로그아웃</PopoverBody>
                        </Popover>
                    </div>)
                : null}

            </ul>
            
        </div>
    )
};

export default Header;
