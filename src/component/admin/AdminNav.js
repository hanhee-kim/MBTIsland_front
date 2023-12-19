import { Nav, NavItem, NavLink, Table } from "reactstrap";

import style from "../../css/admin/AdminNav.module.css";
import React, { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";

const AdminNav = () => {

    const uri = useLocation().pathname;
    useEffect(() => {
        console.log('AdminNav에서 출력: ' + uri);
    }, [uri]);

    return (
        <>
        <Nav className={style.adminNav}>
            <div>
                <NavItem>
                    <NavLink tag={Link} to="/adminnotice" className={uri.includes("/adminnotice") && !uri.includes("form")? `${style.navLink} ${style.navActive}` :style.navLink}>공지사항 목록</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/adminnoticeform" className={uri.includes("/adminnoticeform")? `${style.navLink} ${style.navActive}` :style.navLink}>공지 등록/수정</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/adminreport" className={uri.includes("/adminreport")? `${style.navLink} ${style.navActive}` :style.navLink}>신고 게시글</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/adminban" className={uri.includes("/adminban")? `${style.navLink} ${style.navActive}` :style.navLink}>정지 회원</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/adminqna" className={uri.includes("/adminqna")? `${style.navLink} ${style.navActive}` :style.navLink}>문의 답변</NavLink>
                </NavItem>
            </div>
        </Nav>
        </>
    );




    // <li className={uri.includes("/mbtwhy")? `${style.navItem} ${style.currentBoard}`: style.navItem}></li>
}
export default AdminNav;