import { useState, useRef } from "react";
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import {
    Button,
    Input
} from "reactstrap";
import axios from 'axios';

import style from "../../css/mbattle/MBattleForm.module.css";

function MBattleWrite() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user.user);

    const [mbattle, setMbattle] = useState({
        title:"",
        voteItem1:"",
        voteItem2:"",
        file1Idx:"",
        file2Idx:"",
        writerId: user.username,
        writerNickname: user.userNickname,
        writerMbti: user.userMbti,
        writerMbtiColor: user.userMbtiColor
    });

    const imgBoxRef1 = useRef();
    const imgBoxRef2 = useRef();
    const navigate = useNavigate();

    // mbattle 필드값 변경
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMbattle({...mbattle, [name]:value});
    };

    // 파일이 변경될 때 호출
    const fileChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        // 실제 추가된 파일이 있을 때 (파일의 크기가 0보다 클 때)
        // 파일 디렉토리를 열었지만 취소 버튼을 클릭한 경우
        if(e.target.files.length > 0) {
            // files 배열에 추가
            // 얕은 복사로 추가할 파일을 배열에 넣음
            setMbattle({...mbattle, [name]:value});
        }
    
        // 기존 img 태그 영역의 이미지를 변경하는 코드
        // 파라미터 e에서 file 경로를 가져옴
        if(e.target.files!==null) {
            const imageSrc = URL.createObjectURL(e.target.files[0]); // img 태그에서 가리키는 imgBoxRef에 file 경로 설정
            if(name==="file1") {
                imgBoxRef1.current.src = imageSrc;
                imgBoxRef1.current.width = 290;
                imgBoxRef1.current.height = 290;
            } else if(name==="file2") {
                imgBoxRef2.current.src = imageSrc;
                imgBoxRef2.current.width = 300;
                imgBoxRef2.current.height = 300;
            }
        }
    };

    // 게시글 작성
    const postMbattle = () => {
        // formData.append("file", files);
    
        axios.post("http://localhost:8090/mbattlewrite/", mbattle)
        .then(res=> {
            console.log(res);
            let no = res.data.no;
            navigate(`/mbattledetail/${no}/1`);
        })
        .catch(err=> {
            console.log(err);
        })
    }

    const inputTitle = {
        width:"700px",
        height:"50px",
        resize:"none",
        margin:"0 auto"
    };

    const inputSubject = {
        width:"300px",
        height:"100px",
        resize:"none"
    };

    const buttonStyle = {
        background:"white",
        color:"black",
        border:"1px solid lightgray",
        margin:"10px"
    };
    
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
                <div className={style.formContentDiv}>
                    <Input
                        style={inputTitle}
                        type="textarea"
                        id="title"
                        name="title"
                        onChange={change}
                        cols="40"
                        rows="15"
                        required="required"
                        value={mbattle.title}
                        placeholder="제목을 입력해주세요."
                    />

                    {/* 사진, 주제 작성 */}
                    <div className={style.sectionSubject}>
                        <div>
                            <div className={style.inputFileDiv} onClick={()=>document.getElementById("file1Idx").click()} >
                                <img src="/attachIcon.png" alt="" ref={imgBoxRef1} width="200px" height="200px"/>
                                    <Input type="file" id="file1Idx" name="file1Idx" accept="image/*" onChange={fileChange} hidden/>
                            </div>
                            항목1
                            <Input 
                                style={inputSubject}
                                type="textarea"
                                id="voteItem1"
                                name="voteItem1"
                                onChange={change}
                                cols="40"
                                rows="15"
                                required="required"
                                value={mbattle.voteItem1}
                                placeholder="주제를 입력해주세요."
                            />
                        </div>
                        <div>
                            <div className={style.inputFileDiv} onClick={()=>document.getElementById("file2Idx").click()}>
                                <img src="/attachIcon.png" alt="" ref={imgBoxRef2} width="200px" height="200px"/>
                                    <Input type="file" id="file2Idx" name="file2Idx" accept="image/*" onChange={fileChange} hidden/>
                            </div>
                            항목1
                            <Input 
                                style={inputSubject}
                                type="textarea"
                                id="subject2"
                                name="subject2"
                                onChange={change}
                                cols="40"
                                rows="15"
                                required="required"
                                value={mbattle.voteItem2}
                                placeholder="주제를 입력해주세요."
                            />
                        </div>
                    </div>

                    <div className={style.ButtonDiv}>
                        <Button style={buttonStyle} onClick={()=>postMbattle()}>등록</Button>
                        <Button style={buttonStyle} href="mbattle">취소</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MBattleWrite;
