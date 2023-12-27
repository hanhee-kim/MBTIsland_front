import { useState, useRef } from "react";
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import {
    Button,
    Input
} from "reactstrap";
import axios from 'axios';
import { urlroot } from "../../config";

import style from "../../css/mbattle/MBattleForm.module.css";

function MBattleWrite() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user);

    const imgBoxRef1 = useRef();
    const imgBoxRef2 = useRef();
    const navigate = useNavigate();
    
    // mbattle 게시글
    const [mbattle, setMbattle] = useState({
        title: "",
        voteItem1: "",
        voteItem2: "",
        fileIdx1: "",
        fileIdx2: "",
        writerId: user.username,
        writerNickname: user.userNickname,
        writerMbti: user.userMbti,
        writerMbtiColor: user.userMbtiColor
    });

    // 파일 목록
    const [files, setFiles] = useState([]);

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

        // 파일 디렉토리를 열었지만 취소 버튼을 클릭한 경우, 코드 실행 X
        // 실제 추가된 파일이 있을 때 (파일의 크기가 0보다 클 때)
        if(e.target.files.length > 0) {
            const newFiles = [...files];
            // files 배열에 추가
            // 얕은 복사로 추가할 파일을 배열에 넣음
            if(name==="fileIdx1") {
                newFiles[0] = e.target.files[0];
                setFiles(newFiles);
                // setFiles([...files, e.target.files[0]]);
            } else if (name==="fileIdx2") {
                newFiles[1] = e.target.files[0];
                setFiles(newFiles);
                // setFiles([...files, e.target.files[0]]);
            }

            // mbattle 파일 인덱스 set
            setMbattle({...mbattle, [name]: value});

            // 기존 img 태그 영역의 이미지를 변경하는 코드
            // 파라미터 e에서 file 경로를 가져옴
            const imageSrc = URL.createObjectURL(e.target.files[0]); // img 태그에서 가리키는 imgBoxRef에 file 경로 설정
            if(name==="fileIdx1") {
                imgBoxRef1.current.src = imageSrc;
                imgBoxRef1.current.width = 300;
                imgBoxRef1.current.height = 300;
            } else if(name==="fileIdx2") {
                imgBoxRef2.current.src = imageSrc;
                imgBoxRef2.current.width = 300;
                imgBoxRef2.current.height = 300;
            }
        }
    };

    
    // 이미지 삭제
    const fileDelete = (idx) => {
        const newFiles = [...files];
        // files 배열에 추가
        // 얕은 복사로 추가할 파일을 배열에 넣음
        if(idx==="fileIdx1") {
            newFiles.splice(0, 1);
            setFiles(newFiles);

            imgBoxRef1.current.src = "/attachIcon.png";
            imgBoxRef1.current.width = 200;
            imgBoxRef1.current.height = 200;
        } else if (idx==="fileIdx2") {
            newFiles.splice(1, 1);
            setFiles(newFiles);

            imgBoxRef2.current.src = "/attachIcon.png";
            imgBoxRef2.current.width = 200;
            imgBoxRef2.current.height = 200;
        }

        // mbattle 파일 인덱스 set
        setMbattle({...mbattle, [idx]: ""});
    };

    // 게시글 작성
    const postMbattle = () => {
        console.log(mbattle.fileIdx1);
        console.log(mbattle.fileIdx2);
        if((mbattle.fileIdx1.length===0 && mbattle.fileIdx2.length!==0) || (mbattle.fileIdx1.length!==0 && mbattle.fileIdx2.length===0)) {
            alert("파일을 모두 첨부해주세요.");
            return;
        } else if (mbattle.title==="") {
            alert("제목을 입력해주세요.");
            return;
        } else if((mbattle.voteItem1==="" && mbattle.voteItem2!=="") || (mbattle.voteItem1!=="" && mbattle.voteItem2==="")) {
            alert("주제를 모두 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("title", mbattle.title);
        formData.append("voteItem1", mbattle.voteItem1);
        formData.append("voteItem2", mbattle.voteItem2);
        formData.append("fileIdx1", mbattle.fileIdx1);
        formData.append("fileIdx2", mbattle.fileIdx2);
        formData.append("writerId", mbattle.writerId);
        formData.append("writerNickname", mbattle.writerNickname);
        formData.append("writerMbti", mbattle.writerMbti);
        formData.append("writerMbtiColor", mbattle.writerMbtiColor);
        
        for(let file of files) {
            formData.append("files", file);
        }
    
        axios.post(`${urlroot}/mbattlewrite/`, formData)
        .then(res=> {
            console.log(res);
            let no = res.data.no;
            navigate(`/mbattledetail/${no}`);
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
                            <button onClick={()=>fileDelete("fileIdx1")}>X</button>
                            <div className={style.inputFileDiv} onClick={()=>document.getElementById("fileIdx1").click()} >
                                <img src="/attachIcon.png" alt="" ref={imgBoxRef1} width="200px" height="200px"/>
                                    <Input type="file" id="fileIdx1" name="fileIdx1" accept="image/*" onChange={fileChange} hidden/>
                            </div>
                            주제1
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
                            <button onClick={()=>fileDelete("fileIdx2")}>X</button>
                            <div className={style.inputFileDiv} onClick={()=>document.getElementById("fileIdx2").click()}>
                                <img src="/attachIcon.png" alt="" ref={imgBoxRef2} width="200px" height="200px"/>
                                    <Input type="file" id="fileIdx2" name="fileIdx2" accept="image/*" onChange={fileChange} hidden/>
                            </div>
                            주제2
                            <Input 
                                style={inputSubject}
                                type="textarea"
                                id="voteItem2"
                                name="voteItem2"
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
                        <Button style={buttonStyle} href="mbattle/1">취소</Button>
                    </div>
                </div>
            </div>

            <section className={style.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                </div>
            </section>
        </div>
    );
}

export default MBattleWrite;
