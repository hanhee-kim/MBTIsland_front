import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    Button,
    Input
} from "reactstrap";
import axios from 'axios';
import { urlroot } from "../../config";

import style from "../../css/mbtwhy/MbtwhyForm.module.css";

function MbtwhyWrite() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user);
    
    const [sendUser, setSendUser] = useState({
        username : user.username,
        userNickname : user.userNickname,
        userMbti : user.userMbti,
        userMbtiColor : user.userMbtiColor
    });

    // 색상 코드
    const [mbtiColor, setMbtiColor] = useState("#ADB1B0");

    // MBTI 유형
    const {mbti} = useParams();
    const [mbtiValue, setMbtiValue] = useState(mbti);

    // 본문
    const [content, setContent] = useState("");

    // MBTI 유형, 본문 값이 바뀔 때마다
    useEffect(() => {
        if(!mbti) setMbtiValue("istj");
        setMbtiColorTo(mbti);
    }, []);

    // MBTI 유형 변경
    const typeChange = (e) => {
        const optionValue = e.target.value;
        console.log("MBTI 선택 박스 변경값 : " + optionValue);
        setMbtiColorTo(optionValue);
        setMbtiValue(optionValue);
    };

    // 선택 옵션 변경
    const getSelectedOption = (optionValue) => (
        mbti === optionValue? "selected" : ""
    );

    // MBTI 색상 변경
    const setMbtiColorTo = (mbtiValue) => {
        console.log("MBTI 선택 박스 변경값 : " + mbtiValue);
        if(mbtiValue==="istj") {
            setMbtiColor("#C5C5C5");
        } else if (mbtiValue==="isfj") {
            setMbtiColor("#F2DCB3");
        } else if (mbtiValue==="infj") {
            setMbtiColor("#EAEFF9");
        } else if (mbtiValue==="intj") {
            setMbtiColor("#D8D4EA");
        } else if (mbtiValue==="istp") {
            setMbtiColor("#4D6879");
        } else if (mbtiValue==="isfp") {
            setMbtiColor("#BDC9A6");
        } else if (mbtiValue==="infp") {
            setMbtiColor("#648181");
        } else if (mbtiValue==="intp") {
            setMbtiColor("#9BB7D4");
        } else if (mbtiValue==="estp") {
            setMbtiColor("#D8927A");
        } else if (mbtiValue==="esfp") {
            setMbtiColor("#F0A4AB");
        } else if (mbtiValue==="enfp") {
            setMbtiColor("#FFD966");
        } else if (mbtiValue==="entp") {
            setMbtiColor("#B6634A");
        } else if (mbtiValue==="estj") {
            setMbtiColor("#596D55");
        } else if (mbtiValue==="esfj") {
            setMbtiColor("#E6D0CE");
        } else if (mbtiValue==="enfj") {
            setMbtiColor("#82B8AD");
        } else if (mbtiValue==="entj") {
            setMbtiColor("#35598F");
        }
    };

    // 내용 변경
    const contentChange = (e) => {
        setContent(e.target.value);
    };

    const navigate = useNavigate();
    
    // 게시글 작성
    const postMbtwhy = () => {
        if(content === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        
        let defaultUrl = `${urlroot}/mbtwhywrite?`;
        if(mbtiValue !== null) defaultUrl += `mbti=${mbtiValue.toUpperCase()}`;
        if(content !== null) defaultUrl += `&content=${content}`;

        axios.post(defaultUrl, sendUser)
        .then(res=> {
            console.log(res);
            let no = res.data.no;
            navigate(`/mbtwhydetail/${mbtiValue}/${no}/1`);
        })
        .catch(err=> {
            console.log(err);
        })
    };

    const pageHeader = {
        display:"flex",
        borderBottom:"solid 3px",
        borderColor:mbtiColor,
        cursor:"default"
    };

    const inputContent = {
        height:"400px",
        resize:"none"
    };

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray"
    };
    
    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div style={{...pageHeader, borderColor:`${mbtiColor}`}}>
                    <h1>MBT-Why</h1>
                </div>

                {/* 글 작성, MBTI 선택자 */}
                <div className={style.sectionSelectMbti}>
                    <div className={style.selectDiv}>
                        <Input type="select" id="mbtibox" onChange={typeChange}>
                            <option value="istj" selected={getSelectedOption("istj")}>ISTJ</option>
                            <option value="isfj" selected={getSelectedOption("isfj")}>ISFJ</option>
                            <option value="infj" selected={getSelectedOption("infj")}>INFJ</option>
                            <option value="intj" selected={getSelectedOption("intj")}>INTJ</option>
                            <option value="istp" selected={getSelectedOption("istp")}>ISTP</option>
                            <option value="isfp" selected={getSelectedOption("isfp")}>ISFP</option>
                            <option value="infp" selected={getSelectedOption("infp")}>INFP</option>
                            <option value="intp" selected={getSelectedOption("intp")}>INTP</option>
                            <option value="estp" selected={getSelectedOption("estp")}>ESTP</option>
                            <option value="esfp" selected={getSelectedOption("esfp")}>ESFP</option>
                            <option value="enfp" selected={getSelectedOption("enfp")}>ENFP</option>
                            <option value="entp" selected={getSelectedOption("entp")}>ENTP</option>
                            <option value="estj" selected={getSelectedOption("estj")}>ESTJ</option>
                            <option value="esfj" selected={getSelectedOption("esfj")}>ESFJ</option>
                            <option value="enfj" selected={getSelectedOption("enfj")}>ENFJ</option>
                            <option value="entp" selected={getSelectedOption("entp")}>ENTP</option>
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
                        <Button style={buttonStyle} onClick={()=>postMbtwhy()}>등록</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MbtwhyWrite;
