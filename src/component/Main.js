import { Table, UncontrolledCarousel } from "reactstrap";

import style from "../css/Main.module.css";
import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const token = useSelector((state) => state.persistedReducer.token.token);
  const user = useSelector((state) => state.persistedReducer.user.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("token???:"+token);
    // user 정보
    axios
        .get("http://localhost:8090/user",{
        headers : {
            Authorization : token,
        }
        })
        .then(res=> {            
            console.log(res);
            console.log("data:");
            // setUser(res.data);
            dispatch({type:"user",payload:res.data});
        })
        .catch(err=> {
            console.log("user가져오기 에러");
            console.log(err);
        })
  },[])
  

  const items = [
      {
          src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'하트',
          caption:'heart caption',
          header:'heart header',
      },
      {
        src:'https://picsum.photos/seed/picsum/1440/300',
          altText:'로고192',
          caption:'logo192 caption',
          header:'logo192 header'
      },
      {
        src:'https://picsum.photos/seed/picsum/1440/400',
          altText:'로고512',
          caption:'logo512 caption',
          header:'logo512 header'
      }
  ];


    return (
        <>
        <div className={style.container} id="top">
            <div className={style.bannerArea}>
              <UncontrolledCarousel items={items} className={style.bannerImage}/>
            </div>
            <div>
              <section className={style.sectionLeftArea}></section>
              <section className={style.section}>

                  <div className={style.boardTitleB}>
                          <span>
                              <p>MB-TMI</p>
                              <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                          </span>
                  </div>
                  <div className={style.newlyPosts}>
                    <table className={style.table}>
                      <tbody>
                        <tr>
                          <td>게시글제목
                              <span>[1]</span>
                              <small>1분 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 긴제목
                              <span>[10]</span>
                              <small>2분 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>20일 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>2달 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>2년 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className={style.boardTitleB}>
                          <span>
                              <p>MB-TMI</p>
                              <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                          </span>
                  </div>
                  <div className={style.newlyPosts}>
                    <table className={style.table}>
                      <tbody>
                        <tr>
                          <td>게시글제목
                              <span>[1]</span>
                              <small>1분 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 긴제목
                              <span>[10]</span>
                              <small>2분 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>20일 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>2달 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>2년 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={style.boardTitleB}>
                          <span>
                              <p>MB-TMI</p>
                              <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                          </span>
                  </div>
                  <div className={style.newlyPosts}>
                    <table className={style.table}>
                      <tbody>
                        <tr>
                          <td>게시글제목
                              <span>[1]</span>
                              <small>1분 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 긴제목
                              <span>[10]</span>
                              <small>2분 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>20일 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>2달 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                        <tr>
                          <td>게시글 짧은제목 게시글 짧은제목   게시글 짧은제목
                              <span>[0]</span>
                              <small>2년 전</small>
                              <div className={style.profileColor}/>
                              <span>ESFP 포로리</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

              </section>
              <section className={style.sectionRightArea}>
                  <div>
                      <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                  </div>
              </section>
            </div>
        </div>
        </>
    );
}
export default Main;