import { Nav, NavItem, NavLink, Table } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import AdminNav from "./AdminNav";
import AdminNoticeForm from "./AdminNoticeForm";
import { useLocation } from "react-router";
import { useEffect } from "react";
import AdminNotice from "./AdminNotice";
import AdminQna from './AdminQna';
import Main from './../Main';

const AdminFrame = () => {

    const uri = useLocation().pathname;

    return (
        <>
        <div className={styleFrame.adminPage}>관리자 페이지
            <img src={"/gear_adminPage.png" } alt="" className={styleFrame.adminPageImg}/>
        </div>
        <div className={styleFrame.container}>
            <section className={styleFrame.section}>
                <AdminNav/>
                {uri==='/adminnoticeform'? <AdminNoticeForm/>:
                    uri==='/adminnotice'? <AdminNotice/>:
                    uri==='/adminqna'? <AdminQna/>:
                    uri==='/menu3'? <Main/>:
                    <Main/>
                }
            </section>
        </div>
        </>
    );
}
export default AdminFrame;