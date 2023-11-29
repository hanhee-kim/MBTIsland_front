import React from "react";
import {Link} from "react-router-dom";
import style from "../../css/common/Header.module.css";
import { Button } from "reactstrap";

const Header = () => {

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
                    <li className={style.navItem}>
                        <Link to={"/mbtWhy"}>MBT-WHY</Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/mBattle"}>M-BATTLE</Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/mbTmi"}>MB-TMI</Link>
                    </li>
                </div>
                <div style={{marginRight: '120px'}}>
                    <li className={style.navItem}>
                        <Link to={"/login"}><Button>로그인</Button></Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/join"}><Button>회원가입</Button></Link>
                    </li>
                </div>
            </ul>
            
        </div>
    )

};

export default Header;
