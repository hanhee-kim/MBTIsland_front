import { Table } from "reactstrap";

import style from "../../css/mbtmi/MBTmi.module.css";
import React from "react";
import {Link} from "react-router-dom";

const MBTmi = () => {
    return (
        <>
        <div className={style.container}>

            <section className={style.section}>
                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>
                <h5 className={style.weekyHotPostsTitle}>&#128293;주간 인기글</h5>
                <div className={style.weeklyHotPosts}>
                    <table className={style.weeklyPostsTable}>
                        <tbody>
                            <tr>
                                <td>[잡담]</td>
                                <td>잡담 게시판의 인기 게시글 제목 표시&nbsp;&nbsp;
                                    <span>[103]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <small>2일 전</small>
                                </td>
                                <td>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                </td>
                                <td>
                                    <img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;
                                    <small>117</small>
                                </td>
                            </tr>
                            <tr>
                                <td>[잡담]</td>
                                <td>잡담 게시판의 인기 게시글 제목 표시&nbsp;&nbsp;
                                    <span>[103]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <small>2일 전</small>
                                </td>
                                <td>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                </td>
                                <td>
                                    <img src={"/thumbIcon.png" } alt="검색" className={style.thumbIcon} />&nbsp;
                                    <small>117</small>
                                </td>
                            </tr>
                            <tr>
                                <td>[잡담]</td>
                                <td>잡담 게시판의 인기 게시글 제목 표시&nbsp;&nbsp;
                                    <span>[103]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <small>2일 전</small>
                                </td>
                                <td>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                </td>
                                <td>
                                    <img src={"/thumbIcon.png" } alt="검색" className={style.thumbIcon} />&nbsp;
                                    <small>117</small>
                                </td>
                            </tr>
                            <tr>
                                <td>[잡담]</td>
                                <td>잡담 게시판의 인기 게시글 제목 표시&nbsp;&nbsp;
                                    <span>[103]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <small>2일 전</small>
                                </td>
                                <td>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                </td>
                                <td>
                                    <img src={"/thumbIcon.png" } alt="검색" className={style.thumbIcon} />&nbsp;
                                    <small>117</small>
                                </td>
                            </tr>
                            <tr>
                                <td>[잡담]</td>
                                <td>잡담 게시판의 인기 게시글 제목 표시&nbsp;&nbsp;
                                    <span>[103]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <small>2일 전</small>
                                </td>
                                <td>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                </td>
                                <td>
                                    <img src={"/thumbIcon.png" } alt="검색" className={style.thumbIcon} />&nbsp;
                                    <small>117</small>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <div className={style.categoryAndFilter}>
                    <div className={style.categoryBtns}>
                        <span>&#128270;</span>
                        <button className={style.activeCategory}>잡담</button>
                        <button>연애</button>
                        <button>회사</button>
                        <button>학교</button>
                        <button>취미</button>
                    </div>
                    <div className={style.mbtiFilterBtns}> 
                        <span>&#128204;</span>&nbsp;&nbsp;
                        <input type="radio" id="mbtiE" name="mbti1"/><label for="mbtiE">E</label>
                        <input type="radio" id="mbtiI" name="mbti1"/><label for="mbtiI">I</label>
                        &nbsp;&nbsp;+&nbsp;&nbsp;
                        <input type="radio" id="mbtiN" name="mbti2"/><label for="mbtiN">N</label>
                        <input type="radio" id="mbtiS" name="mbti2"/><label for="mbtiS">S</label>
                        &nbsp;+&nbsp;
                        <input type="radio" id="mbtiF" name="mbti3"/><label for="mbtiF">F</label>
                        <input type="radio" id="mbtiT" name="mbti3"/><label for="mbtiT">T</label>
                        &nbsp;+&nbsp;
                        <input type="radio" id="mbtiJ" name="mbti4"/><label for="mbtiJ">J</label>
                        <input type="radio" id="mbtiP" name="mbti4"/><label for="mbtiP">P</label>
                    </div>
                </div>

                <div className={style.aboveTable}>
                    <span>
                        <button><img src={"/sortIcon.png" } alt="" className={style.sortIcon} />최신순</button>
                        <button><img src={"/writebtnIcon.png" } alt="" className={style.writebtnIcon} />작성하기</button>
                    </span>
                    <div className={style.searchBar}>
                        <input type="text"/>
                        <img src={"/searchIcon.png" } alt="검색" className={style.searchBtn} />
                    </div>
                </div>
                <table className={style.mbtmiTable}>
                    <tbody>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={style.td1row}>
                                    <div className={style.profileColor}/>&nbsp;
                                    <span>ESFP 포로리</span>
                                    <small>22분 전</small>
                                </div>
                                <div className={style.td2row}>
                                    <span>잡담 게시판의 최신 게시글 제목 표시</span>
                                    <span>
                                        <small><img src={"/thumbIcon.png" } alt="" className={style.thumbIcon} />&nbsp;12</small>
                                        <small><img src={"/commentIcon.png" } alt="" className={style.commentIcon} />&nbsp;&nbsp;33</small>
                                    </span>
                                </div>
                            </td>
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
            </section>

        </div>
        </>
    );
}
export default MBTmi;