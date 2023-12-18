import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import style from "../../css/admin/AdminNotice.module.css";
import React from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminNoticeForm = () => {
    return (
        <>
        <div>
            <div className={styleFrame.sectionTitle}>공지사항 등록</div>
            <div className={styleFrame.sectionContents}>
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
        </>
    );
}
export default AdminNoticeForm;