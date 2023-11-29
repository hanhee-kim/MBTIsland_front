import { useState } from "react";
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input
} from "reactstrap";
import axios from 'axios';

import style from "../../css/mbty/MbtyForm.module.css";

function MbtyWrite() {

    // 색상 코드
    const [color, setColor] = useState("#ADB1B0");

    // MBTI 유형
    const [mbti, setMbti] = useState("ISTJ");

    const [content, setContent] = useState("");

    const typeChange = (e) => {
        const arr = e.target.value.split(",");
        setColor(arr[0]);
        setMbti(arr[1]);
    };

    const pageHeader = {
        display:"flex",
        borderBottom:"solid 3px",
        borderColor:color
    }

    const inputContent = {
        height:"400px",
        resize:"none"
    }

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    }

    const change = (e) => {
        setContent(e.target.value);
    }
    
    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionPageHeader}>
                {/* 게시판 헤더 영역 */}
                <div style={{...pageHeader, borderColor:`${color}`}}>
                    <h1>MBT-Why</h1>
                </div>

                {/* 글 작성, MBTI 선택자 */}
                <div className={style.sectionSelectMbti}>
                    <div className={style.selectDiv}>
                        <Input type="select" onChange={typeChange}>
                            <option value="#ADB1B0,ISTJ">ISTJ</option>
                            <option value="#F2DCB3,ISFJ">ISFJ</option>
                            <option value="#EAEFF9,INFJ">INFJ</option>
                            <option value="#D8D4EA,INTJ">INTJ</option>
                            <option value="#4D6879,ISTP">ISTP</option>
                            <option value="#BDC9A6,ISFP">ISFP</option>
                            <option value="#648181,INFP">INFP</option>
                            <option value="#9BB7D4,INTP">INTP</option>
                            <option value="#D8927A,ESTP">ESTP</option>
                            <option value="#F0A4AB,ESFP">ESFP</option>
                            <option value="#FFD966,ENFP">ENFP</option>
                            <option value="#B6634A,ENTP">ENTP</option>
                            <option value="#596D55,ESTJ">ISTJ</option>
                            <option value="#E6D0CE,ESFJ">ISFJ</option>
                            <option value="#82B8AD,ENFJ">INFJ</option>
                            <option value="#35598F,ENTH">INTJ</option>
                        </Input>
                    </div>
                    <div className={style.formTitleDiv}>
                        <h5>글 작성</h5>
                    </div>
                </div>

                {/* 작성 영역 */}
                <div>
                    <Input
                        style={inputContent}
                        type="textarea"
                        id="content"
                        name="content"
                        onChange={change}
                        cols="40"
                        rows="15"
                        required="required"
                        value={content}
                        placeholder="게시글을 입력해주세요."
                    />
                    <div className={style.postContentDiv}>
                        <Button style={buttonStyle}>등록</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MbtyWrite;
