import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";

import style from "../../css/admin/AdminNotice.module.css";
import React from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminNotice = () => {
    return (
        <>
        <div className={style.adminPage}>관리자 페이지
            <img src={"/gear_adminPage.png" } alt="" className={style.adminPageImg}/>
        </div>
        <div className={style.container}>

            <section className={style.section}>
                <AdminNav/>
                <div>
                    <div className={style.sectionTitle}>공지사항 목록</div>
                    <div className={style.sectionContents}>
                        <div className={style.filterBtns}>
                            <div>
                                <span className={`${style.filterBtn} ${style.filterActive}`}>전체 : 101</span>
                                <span className={style.filterBtn}>표시 : 96</span>
                                <span className={style.filterBtn}>숨김 : 5</span>
                            </div>
                            <div className={style.searchBar}>
                                <input type="text"/>
                                <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} />
                            </div>
                        </div>
                        <div className={style.checkboxAndButtons}>
                            <span>
                                <input type="checkbox" className={style.checkbox}/><span>&nbsp;선택</span>
                            </span>
                            <span>
                                <input type="button" value="숨김"/>
                                <input type="button" value="삭제"/>
                            </span>
                        </div>
                        <table className={style.table}>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>MBT-WHY(Q&A) 게시판 이용수칙 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/viewIcon-bold.png" } alt="" className={style.openEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>MB-TMI(자유) 게시판 이용수칙 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>M-Battle-TI(밸런스게임) 게시판 이용수칙 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/viewIcon-bold.png" } alt="" className={style.openEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/viewIcon-bold.png" } alt="" className={style.openEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/viewIcon-bold.png" } alt="" className={style.openEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>MBT-WHY(Q&A) 게시판 이용수칙 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>MB-TMI(자유) 게시판 이용수칙 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>M-Battle-TI(밸런스게임) 게시판 이용수칙 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" className={style.checkbox}/></td>
                                    <td>신고제와 신고된 게시물, 회원의 제재처리 안내</td>
                                    <td>2023-11-16</td>
                                    <td><img src={"/closedEyeIcon.png" } alt="" className={style.closedEye}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={style.paging}>
                            <span>&lt;</span>
                            <span className={style.activePage} style={{background:'#f8f8f8'}}>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                            <span>&gt;</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}
export default AdminNotice;