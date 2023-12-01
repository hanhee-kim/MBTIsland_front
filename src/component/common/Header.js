import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import style from "../../css/common/Header.module.css";
import { Button } from "reactstrap";

const Header = () => {

    const uri = useLocation().pathname;
    useEffect(() => {
        console.log(uri);
    }, [uri]);

    const [loginuser, sestLoginuser] = useState({
        username: "userid0123",
        userNickname: "낭만냥냥",
        userMbti: "INFP",
        userMbtiColor: "#BDC9A6",
        userRole: "USER"
    });

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

                {/* <div style={{marginRight: '120px'}}>
                    <li className={style.navItem}>
                        <Link to={"/login"}><Button color="light">로그인</Button></Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/join"}><Button color="dark">회원가입</Button></Link>
                    </li>
                </div> */}

                {!loginuser ? (<div style={{ marginRight: '120px' }}>
                                <li className={style.navItem}>
                                    <Link to={"/logout"}>
                                        <Button color="light">로그아웃</Button>
                                    </Link>
                                </li>
                            </div>) 

                : (<div className={style.afterLogin}>
                        <div>
                            <img src={"/bell.png"} alt='알림' className={style.bellIcon}/>
                            <img src={"/messageIcon.png"} alt='알림' className={style.messageIcon}/>
                            <span className={style.userMbti}>INFP</span>
                            <span className={style.userNickname}>낭만냥냥</span>
                        </div>
                    </div>)}


            </ul>
            
        </div>
    )
};

export default Header;
