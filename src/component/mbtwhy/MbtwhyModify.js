import { useState } from "react";
import {
    Button,
    Input
} from "reactstrap";

import style from "../../css/mbtwhy/MbtwhyForm.module.css";

function MbtwhyModify() {

    const [board, setBoard] = useState({content:"ㅋㅋㅋㅋㅋ", mbti:"ENTP", color:"#B6634A"});

    // const typeChange = (e) => {
    //     const arr = e.target.value.split(",");
    //     setBoard({...board, mbti:arr[0], color:arr[1]});
    // };

    const pageHeader = {
        display:"flex",
        borderBottom:"solid 3px",
        borderColor:board.color
    }

    const inputContent = {
        height:"400px",
        resize:"none"
    }

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray",
        marginLeft:"10px"
    }

    const change = (e) => {
        const value = e.target.value;
        setBoard({...board, content:value});
    }
    
    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div style={{...pageHeader, borderColor:`${board.color}`}}>
                    <h1>MBT-Why</h1>
                </div>

                {/* 글 작성, MBTI 선택자 */}
                <div className={style.sectionSelectMbti}>
                    <div className={style.selectDiv}>
                        <Input type="select" disabled>
                            <option>{board.mbti}</option>
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
                        onChange={change}
                        cols="40"
                        rows="15"
                        required="required"
                        value={board.content}
                        placeholder="게시글을 입력해주세요."
                    />
                    <div className={style.postContentDiv}>
                        <Button style={buttonStyle}>수정</Button>
                        <Button style={buttonStyle}>취소</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default MbtwhyModify;
