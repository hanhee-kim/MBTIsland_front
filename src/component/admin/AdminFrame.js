import { Nav, NavItem, NavLink, Table } from "reactstrap";

import styleFrame from "../../css/admin/AdminFrame.module.css";
import AdminNav from "./AdminNav";
import AdminNoticeForm from "./AdminNoticeForm";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import AdminNotice from "./AdminNotice";
import AdminQna from './AdminQna';
import Main from './../Main';
import AdminQnaForm from "./AdminQnaForm";
import AdminReport from "./AdminReport";
import AdminReportDetail from "./AdminReportDetail";
import AdminBan from "./AdminBan";
import AdminBanDetail from "./AdminBanDetail";
import { Outlet } from 'react-router-dom';

const AdminFrame = () => {

    const uri = useLocation().pathname;

    return (
        <>
        <div className={styleFrame.adminPage}>관리자 페이지
            <img src={"/gear_adminPage.png" } alt="" className={styleFrame.adminPageImg}/>
        </div>

        <div className={styleFrame.container} id="top">
            <section className={styleFrame.sectionLeftArea}>
                <AdminNav/>
            </section>
            <section className={styleFrame.section}>
                {uri.includes('/adminnoticeform')? <AdminNoticeForm/>:
                    uri==='/adminnotice'? <AdminNotice/>:
                    uri==='/adminqna'? <AdminQna/>:
                    // uri==='/adminqnaform'? <AdminQnaForm />: // App.js에 등록된 중첩라우팅, Outlet 이용
                    uri==='/adminreport'? <AdminReport/>:
                    uri==='/adminreportdetail'? <AdminReportDetail/>:
                    uri==='/adminban'? <AdminBan/>:
                    uri==='/adminbandetail'? <AdminBanDetail/>: null
                }
                <Outlet />
                {/* 문의글 상세 */}
            </section> 
            <section className={styleFrame.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={styleFrame.movetopIcon}/></a>
                </div>
            </section>
        </div>
        </>
    );
}
export default AdminFrame;