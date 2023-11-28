import React from 'react';
import { Link } from 'react-router-dom';
import style from "../../css/common/Footer.module.css";

const Footer = () => {

    const style = {backgroundColor:'white', width:'100%', left:0, top:0, zIndex:10, borderTop: '1px solid #999999' };

    return(
        <div style={style}>
            <ul className={style.navItems}>
                <div>
                    <label style={{marginLeft: '100px', fontSize:'30px', fontWeight: '600', marginRight:'40px'}}>MBTIsland</label>
                    <li className={style.navItem}>
                        <Link to={"/notice"}>공지사항</Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/privacyPolicy"}>개인정보 처리방침</Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/termOfService"}>서비스 이용약관</Link>
                    </li>
                    <li className={style.navItem}>
                        <Link to={"/xxx"}>이메일 문의 emailadress@email.com</Link>
                    </li>
                </div>
                <div style={{marginLeft: '210px', fontSize:'18px', marginBottom:'30px'}}>
                    ⓒ2023 MBTIsland All rights reserved.
                </div>
            </ul>
        </div>
    )

};

export default Footer;