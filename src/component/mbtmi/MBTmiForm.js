import axios from "axios";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { urlroot } from "../../config";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorComponentimport from "./EditorComponent";
import { Button } from "bootstrap";




const MBTmiForm = () => {


    
    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user.user);
    
    const { no } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectCategory, setSelectCategory] = useState("");
    const [activeCategory, setActiveCategory] = useState("");




    // 선택된 이미지 (백엔드로 보내어 처리 전)
    const [selectedImage, setSelectedImage] = useState(null);



    // 에디터ref등록
    const quillRef = useRef();



    // 텍스트 state
    const [quillValue, setQuillValue] = useState("");




    // 에디터 content의 변경이벤트 감지하여 호출됨... 이미지 삽입 감지하도록함=삽입이미지핸들러함수가 이미지를 처리하도록함(서버에 저장하고 url을 받아와서...)
    const handleQuillChange = async (content, delta, source, editor) => {
        setQuillValue(content);

        console.log('editor.getHTML():', editor.getHTML()); // 텍스트는 <p>입력문자열</p> 이미지는 <img src="엄청 긴 base64코드"> 로 콘솔에 찍힌다



        // 이미지가 삽입되었는지 확인
        if (source === 'user') {
            const insertedImages = delta.ops.filter(op => {
                return op.insert && op.insert.image;
            });
            
            if (insertedImages.length > 0) {
                console.log('이미지 삽입되었음')
                const imageData = insertedImages[0].insert.image;
                setSelectedImage(imageData);
            }
        }
    };

    // 이미지 전송 로직
    const uploadImage = async (imageData, postNo) => {
        console.log('imageData: ', imageData)
        console.log('~~!~!~postNo: ', postNo);


        const formData = new FormData();

        // Base64 이미지 데이터를 Blob으로 변환
        const blob = await fetch(imageData).then(r => r.blob());

        formData.append('image', blob, "image.jpg");
        formData.append('postNo', postNo);

        const imageResponse = await axios.post(`${urlroot}/uploadImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const fileIdx = imageResponse.data.fileIdx;
        console.log('fileIdx: ', fileIdx);

        // // 게시글 업데이트 로직
        // await axios.put(`${urlroot}/updatePost/${postNo}`, { fileIdx: fileIdx });
    };



    // 외부버튼클릭
    const handleFormSubmit = async () => {
        console.log('외부버튼 클릭');

        // 에디터 내용에서 이미지 태그 제거
        const contentWithoutImages = quillValue.replace(/<img[^>]*>/g, "");
        setQuillValue(contentWithoutImages);
        console.log('***contentWithoutImages: ', contentWithoutImages);

        // 1단계: 텍스트 컨텐츠 백엔드로 전송
        const postData = {
            title: "테스트1",
            content: contentWithoutImages,
            category: '취미',
            writerId: user.username,
            writerNickname: user.userNickname,
            writerMbti: user.userMbti,
            writerMbtiColor: user.userMbtiColor,
        };
        const response = await axios.post(`${urlroot}/quilltest`, postData);
        const mbtmi = response.data.mbtmi;
        console.log('*****반환받은데이터: ', response.data.mbtmi); // 일단 여기까지 확인
        console.log('넘길 no: ', mbtmi.no);

        // 이미지가 선택된 경우 이미지 전송 로직 실행
        if (selectedImage) {
            console.log('###selectedImage: ', selectedImage);
            console.log('mbtmi.no: ', mbtmi.no);
            await uploadImage(selectedImage, mbtmi.no);
        }



        // 2단계: 이미지 처리 및 백엔드로 전송
        // if (selectedImage) {
        //     const formData = new FormData();
        //     formData.append('image', selectedImage);
        //     formData.append('postNo', postNo); // 게시글 번호 추가

        //     const imageResponse = await axios.post(`${urlroot}/uploadImage`, formData);
        //     const fileIdx = imageResponse.data.fileIdx; // 백엔드에서 반환된 파일 인덱스

        //     // 3단계: 게시글 업데이트 (file_idx 업데이트)
        //     await axios.put(`${urlroot}/updatePost/${postNo}`, { fileIdx: fileIdx });
        // }

        

        // // 서버로 보내기
        // try {
        //     const response = await axios.post(`${urlroot}/quilltest`, {
        //         content: quillValue,
        //         title: '퀼테스트제목',
        //         category: '잡담',
        //         writerId: user.username,
        //         writerNickname: user.userNickname,
        //         writerMbti: user.userMbti,
        //         writerMbtiColor: user.userMbtiColor,
                
                
        //     });
        //     console.log('퀼데이터보내기 요청결과: ', response);
            
        // } catch (error) {
        //     console.error('퀼데이터보내기 오류내용: ', error);
        // }
    }


// 리액트quill의 기능을 확장 또는 조정
    const modules = {

        // 툴바에 '표시'될 것들을 세팅
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            ],
            ["link", "image"],
            [{ align: [] }, { color: [] }, { background: [] }],
            ["clean"],
        ],
    };

    // 리액트quill의 텍스트 스타일 지정 
    // 툴바에서 '동작'하도록 하는 것들 
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "background",
    ];







    return (
        <>
        <div className={style.container} id="top">
            
            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>

                <div className={style.boardTitleB}>
                        <span>
                            <p>MB-TMI</p>
                            <p>유형별로 모여 자유롭게  이야기를 나눌 수 있는 공간</p>
                        </span>
                </div>

                <div>
                    <div style={{ margin: "50px" }}>
                        <button style={{cursor: 'pointer', background: 'pink', zIndex: 10}} onClick={handleFormSubmit}>저장버튼</button>

                        <ReactQuill
                            style={{ height: "400px", width: '100%' }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={quillValue || ""}
                            onChange={handleQuillChange}

                            ref={quillRef}

                        />
                    </div>
                </div>

            </section>
            <section className={style.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                </div>
            </section>
        </div>
        </>
    );
}
export default MBTmiForm;