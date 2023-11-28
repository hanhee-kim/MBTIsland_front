import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";

import style from "../../css/admin/AdminNotice.module.css";
import React from "react";
import {Link} from "react-router-dom";

const AdminNoticeForm = () => {
    return (
        <>
        <div className={style.adminPage}>관리자 페이지
        <img src={"/gear_adminPage.png" } alt="" className={style.adminPageImg}/>
        </div>
        <div className={style.container} style={{paddingTop: '80px'}}>


            <section className={style.section}>
            <Nav className={style.adminNav}>
                    <NavItem className="ml-auto">
                        <NavLink tag={Link} to="/menu1" className={style.navLink}>공지사항 목록</NavLink>
                    </NavItem>
                    <NavItem  className="ml-auto">
                        <NavLink tag={Link} to="/menu2" className={`${style.navLink} ${style.navActive}`}>공지 등록/수정</NavLink>
                    </NavItem>
                    <NavItem  className="ml-auto">
                        <NavLink tag={Link} to="/menu3" className={style.navLink}>신고 게시글</NavLink>
                    </NavItem>
                    <NavItem  className="ml-auto">
                        <NavLink tag={Link} to="/menu4" className={style.navLink}>정지 회원</NavLink>
                    </NavItem>
                    <NavItem  className="ml-auto">
                        <NavLink tag={Link} to="/menu5" className={style.navLink}>문의 답변</NavLink>
                    </NavItem>
                </Nav>
                <div>
                    <div className={style.sectionTitle}>공지사항 등록</div>
                    <div className={style.sectionContents}>
                        <form className={style.noticeForm}>
                            <li>제목</li>
                            <input type="text" className={style.formtitle}/>
                            <li>본문</li>
                            <textarea className={style.formContent} rows="18"/>
                            <div className={style.formBtns}>
                            <input type="button" value="취소"/>
                            <input type="submit" value="저장"/>
                            </div>
                        </form>    
                    </div>
                </div>
                
            </section>
        </div>
        </>
    );
}
export default AdminNoticeForm;