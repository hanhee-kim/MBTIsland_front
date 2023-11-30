import { Table } from "reactstrap";

import style from "../../css/mbtmi/MBTmi.module.css";
import React from "react";
import {Link} from "react-router-dom";

const MBTmiForm = () => {
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

                <form className={style.mbtmiForm}>
                    <li>제목</li>
                    <input type="text" className={style.formtitle}/>
                    <li>본문</li>
                    <textarea className={style.formContent} rows="18"/>
                    <div className={style.formBtns}>
                        <input type="button" value="취소"/>
                        <input type="submit" value="저장"/>
                    </div>
                </form>    

            </section>
        </div>
        </>
    );
}
export default MBTmiForm;