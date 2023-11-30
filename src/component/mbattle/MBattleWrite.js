import { useState } from "react";

import {
    Button,
    Input
} from "reactstrap";

import style from "../../css/mbattle/MBattleForm.module.css";

function MBattleWrite() {

    const [content, setContent] = useState("");

    const inputTitle = {
        height:"50px",
        resize:"none"
    }

    const inputSubject = {
        width:"300px",
        height:"100px",
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
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>M-Battle</h1>
                </div>

                {/* 글 작성 타이틀 */}
                <div className={style.formTitleDiv}>
                    <h5>글 작성</h5>
                </div>

                {/* 제목, 사진, 주제 작성 영역 */}
                <div>
                    <Input
                        style={inputTitle}
                        type="textarea"
                        id="content"
                        name="content"
                        onChange={change}
                        cols="40"
                        rows="15"
                        required="required"
                        value={content}
                        placeholder="제목을 입력해주세요."
                    />

                    {/* 사진, 주제 작성 */}
                    <div className={style.sectionSubject}>
                        <div>
                            <div className={style.inputFileDiv}>
                                <img src="/attachIcon.png"></img>
                            </div>
                            <div>
                                항목1
                            </div>
                            <Input 
                                style={inputSubject}
                                type="textarea"
                                id="content"
                                name="content"
                                onChange={change}
                                cols="40"
                                rows="15"
                                required="required"
                                value={content}
                                placeholder="주제를 입력해주세요."
                            />
                        </div>
                        <div>
                            <div className={style.inputFileDiv}>
                                <img src="/attachIcon.png"></img>
                            </div>
                            <div>
                                항목1
                            </div>
                            <Input 
                                style={inputSubject}
                                type="textarea"
                                id="content"
                                name="content"
                                onChange={change}
                                cols="40"
                                rows="15"
                                required="required"
                                value={content}
                                placeholder="주제를 입력해주세요."
                            />
                        </div>
                    </div>

                    <div className={style.postTitleDiv}>
                        <Button style={buttonStyle}>등록</Button>
                        <Button style={buttonStyle}>취소</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MBattleWrite;
