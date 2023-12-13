import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import {
    Button,
    Input
} from "reactstrap";
import axios from 'axios';

import style from "../../css/mbtwhy/MbtwhyForm.module.css";

function MbtwhyWrite() {

    // 색상 코드
    const [color, setColor] = useState("#ADB1B0");

    // MBTI 유형
    const {mbti} = useParams();
    
    const [mbtiValue, setMbtiValue] = useState(mbti);

    const [content, setContent] = useState("");

    useEffect(() => {
        console.log(mbtiValue);
        console.log(content);
    }, [mbtiValue, content]);

    // MBTI 유형 변경
    const typeChange = (e) => {
        const arr = e.target.value.split(",");
        setColor(arr[0]);
        setMbtiValue(arr[1]);
    };

    // 내용 변경
    const contentChange = (e) => {
        setContent(e.target.value);
    }

    // 게시글 목록 조회
    const postMbtwhy = () => {
        let defaultUrl = `http://localhost:8090/mbtwhywrite?`;
        if(mbtiValue !== null) defaultUrl += `&mbti=${mbtiValue}`;
        if(content !== null) defaultUrl += `&content=${content}`;

        axios.post(defaultUrl)
        .then(res=> {
            console.log(res);

            // let mbtwhyCnt = res.data.mbtwhyCnt;

            // setMbtwhyCnt(mbtwhyCnt);

        })
        .catch(err=> {
            console.log(err);
        })
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
    
    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
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
                <div className={style.contentDiv}>
                    <Input
                        style={inputContent}
                        type="textarea"
                        id="content"
                        name="content"
                        onChange={contentChange}
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

export default MbtwhyWrite;
