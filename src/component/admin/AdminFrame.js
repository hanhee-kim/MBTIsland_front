import { Nav, NavItem, NavLink, Table } from "reactstrap";

import style from "../../css/admin/AdminNotice.module.css";
import React, { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminFrame = () => {

    return (
        <>
        <div className={style.adminPage}>관리자 페이지
            <img src={"/gear_adminPage.png" } alt="" className={style.adminPageImg}/>
        </div>
        <div className={style.container}>
            <section className={style.section}>

                <AdminNav/>
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
export default AdminFrame;