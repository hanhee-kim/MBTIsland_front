import { Nav, NavItem, NavLink, Table, Input } from "reactstrap";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import style from "../../css/admin/AdminNotice.module.css";
import style2 from "../../css/admin/AdminQna.module.css";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminQna = () => {
    const [open,setOpen]=useState(false);

    // 팝오버 바깥영역 클릭시 모든 팝오버 닫기
    useEffect(() => {
        const clickOutsidePopover = (event) => {
            const popoverElements = document.querySelectorAll(".popover");
            // 조건식: 팝오버 요소들을 배열로 변환하여 각각의 요소에 클릭된 요소가 포함되어있지 않다면
            if (Array.from(popoverElements).every((popover) => !popover.contains(event.target))) {
                setOpen(false);
            } 
        };
        document.addEventListener("mousedown", clickOutsidePopover);
        return () => {
            document.removeEventListener("mousedown", clickOutsidePopover);
        };
    }, []);

    return (
        <>
        <div className={style.adminPage}>관리자 페이지
        <img src={"/gear_adminPage.png" } alt="" className={style.adminPageImg}/>
        </div>
        <div className={style.container}>

            <section className={style.section}>
                <AdminNav/>
                <div>
                    <div className={style.sectionTitle}>1:1 문의 답변</div>
                    <div className={style.sectionContents}>
                        <div className={style.filterBtns}>
                            <div>
                                <span className={`${style.filterBtn} ${style.filterActive}`}>전체 : 101</span>
                                <span className={style.filterBtn}>처리완료 : 96</span>
                                <span className={style.filterBtn}>미처리 : 3</span>
                            </div>
                            <div className={style.searchBar}>
                                <input type="text"/>
                                <img src={"/searchIcon.png" } alt="검색" className={style.searchBtnIcon} />
                            </div>
                        </div>
                        <table className={style2.table}>
                            <thead>
                                <tr>
                                    <td>번호</td>
                                    <td>문의일</td>
                                    <td>제목</td>
                                    <td>회원</td>
                                    <td>상태</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>208</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td onClick={()=>setOpen(!open)} id="Popover1">userid0123</td>
                                    <Popover className={style2.popover} placement="bottom" isOpen={open} target="Popover1" toggle={()=>setOpen(!open)}>
                                        <PopoverBody className={style2.popoverItem}>문의글 모아보기</PopoverBody>
                                    </Popover>
                                    <td>미처리</td>
                                </tr>
                                <tr>
                                    <td>207</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>미처리</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>206</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>205</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>204</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>203</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>202</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>201</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>199</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr className={style2.completedQna}>
                                    <td>197</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <Table className={style.table}>
                            <thead>
                                <tr class="table-secondary">
                                    <td>번호</td>
                                    <td>문의일</td>
                                    <td>제목</td>
                                    <td>회원</td>
                                    <td>상태</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>208</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>미처리</td>
                                </tr>
                                <tr>
                                    <td>207</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>미처리</td>
                                </tr>
                                <tr>
                                    <td>206</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>205</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>204</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>203</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>202</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>201</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>199</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                                <tr>
                                    <td>197</td>
                                    <td>2023-11-16</td>
                                    <td>문의글제목 문의글제목 문의글제목</td>
                                    <td>userid0123</td>
                                    <td>완료</td>
                                </tr>
                            </tbody>
                        </Table> */}
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
export default AdminQna;