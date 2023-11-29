import React from 'react';
import { Link } from 'react-router-dom';
import style from "../../css/common/Footer.module.css";

const Footer = () => {

    return(
        <div className={style.footer}>
            <ul className={style.navItems}>
                <div>
                    <label className={style.siteTitle}>MBTIsland</label>
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
                        <Link to={'/mailto:emailadress@email.com'}>이메일 문의 emailadress@email.com</Link>
                        {/* <a href='/emailadress@email.com'>이메일 문의 emailadress@email.com</a> */}
                    </li>
                </div>
                <div>
                    ⓒ2023 MBTIsland All rights reserved.
                </div>
            </ul>
        </div>
    )

};

export default Footer;