import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
    Button,
    Input
} from "reactstrap";
import axios from 'axios';
import { urlroot } from "../../config";

import style from "../../css/mbtwhy/MbtwhyForm.module.css";

function MbtwhyModify() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user.user);

    // 게시글 번호
    const {no} = useParams();

    // MBTI 유형
    const [mbti, setMbti] = useState("");

    // 색상 코드
    const [mbtiColor, setMbtiColor] = useState("");

    const setMbtiColorTo = (mbti) => {
        if(mbti==="ISTJ") {
            setMbtiColor("#C5C5C5");
        } else if (mbti==="ISFJ") {
            setMbtiColor("#F2DCB3");
        } else if (mbti==="INFJ") {
            setMbtiColor("#EAEFF9");
        } else if (mbti==="INTJ") {
            setMbtiColor("#D8D4EA");
        } else if (mbti==="ISTP") {
            setMbtiColor("#4D6879");
        } else if (mbti==="ISFP") {
            setMbtiColor("#BDC9A6");
        } else if (mbti==="INFP") {
            setMbtiColor("#648181");
        } else if (mbti==="INTP") {
            setMbtiColor("#9BB7D4");
        } else if (mbti==="ESTP") {
            setMbtiColor("#D8927A");
        } else if (mbti==="ESFP") {
            setMbtiColor("#F0A4AB");
        } else if (mbti==="ENFP") {
            setMbtiColor("#FFD966");
        } else if (mbti==="ENTP") {
            setMbtiColor("#B6634A");
        } else if (mbti==="ESTJ") {
            setMbtiColor("#596D55");
        } else if (mbti==="ESFJ") {
            setMbtiColor("#E6D0CE");
        } else if (mbti==="ENFJ") {
            setMbtiColor("#82B8AD");
        } else if (mbti==="ENTJ") {
            setMbtiColor("#35598F");
        }
    };
    
    // 본문
    const [content, setContent] = useState("");

    // 내용 변경
    const contentChange = (e) => {
        setContent(e.target.value);
    };

    const navigate = useNavigate();
    // 취소 버튼
    // Mbtwhy 게시판으로 이동
    const goMbtwhy = () => {
        navigate(`/mbtwhy/${mbti}`);
    };

    // Mbtwhy 게시글 조회
    const getMbtwhy = () => {
        let defaultUrl = `${urlroot}/getmbtwhymodify/${no}`;
        axios.get(defaultUrl)
        .then(res => {
            let mbtiCategory = res.data.mbtiCategory;
            let content = res.data.content;

            // setMbtwhy(mbtwhy.content);
            setMbtiColorTo(mbtiCategory);
            setMbti(mbtiCategory);
            setContent(content);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const modifyMbtwhy = () => {
        if(content === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        let defaultUrl = `${urlroot}/mbtwhymodify/${no}/${content}`;
        axios.post(defaultUrl)
        .then(res => {
            console.log(res);
            navigate(`/mbtwhydetail/${mbti.toLowerCase()}/${no}/1`);
        })
        .catch(err => {
            console.log(err);
        });
    };

    // MBTI 유형, 본문 값이 바뀔 때마다
    useEffect(() => {
        getMbtwhy();
    }, []);

    useEffect(() => {
        console.log(content);
    }, [content]);

    const pageHeader = {
        display:"flex",
        borderBottom:"solid 3px",
    };

    const inputContent = {
        height:"400px",
        resize:"none"
    };

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray",
        marginLeft:"10px"
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
                        <Input type="select" disabled>
                            <option>{mbti}</option>
                        </Input>
                    </div>
                    <div className={style.formTitleDiv}>
                        <h5>글 수정</h5>
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
                        <Button style={buttonStyle} onClick={()=>modifyMbtwhy()}>수정</Button>
                        <Button style={buttonStyle} onClick={()=>goMbtwhy()}>취소</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default MbtwhyModify;
