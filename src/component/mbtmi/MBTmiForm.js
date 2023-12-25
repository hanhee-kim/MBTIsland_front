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


    const handleCategoryChange = (categoryParam) => {
        setSelectCategory(categoryParam);
        setActiveCategory(categoryParam);
    };

    // 취소 버튼
    const goToPreviousList = () => {
        navigate(-1);
    };




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
                console.log('이미지 삽입되었음');
                const imageData = insertedImages[0].insert.image;
                setSelectedImage(imageData);
            }
        }
    };

    // 이미지 전송 로직
    const uploadImage = async (imageData, postNo) => {
        const formData = new FormData();
        // Base64 이미지 데이터를 Blob으로 변환
        const blob = await fetch(imageData).then(r => r.blob());
        formData.append('image', blob, "image.jpg");
        formData.append('postNo', postNo);

        try {
            const imageResponse = await axios.post(`${urlroot}/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const fileIdx = imageResponse.data;
            // console.log('fileIdx: ', fileIdx);
    
            // 게시글 업데이트 로직
            await axios.post(`${urlroot}/updateFileIdxs/${postNo}`, { fileIdx: fileIdx });

            return fileIdx;
            
        } catch (error) {
            console.error('이미지 업로드 및 게시글 업데이트 오류:', error);
        }
    };



    // 외부버튼클릭
    const handleFormSubmit = async () => {

        // 에디터 내용에서 이미지 태그 제거하고 텍스트만 추출
        const contentWithoutImages = quillValue.replace(/<img[^>]*>/g, "");
        setQuillValue(contentWithoutImages);
        // console.log('***contentWithoutImages: ', contentWithoutImages);

        if (title==='' || quillValue==='' || selectCategory==='') {
            alert('제목, 내용, 카테고리를 확인해주세요.');
            return;
        }
        console.log('title: ', title, ", content: ", quillValue, ", category: "+ selectCategory, ", writerId: ", user.username, ", writerMbti: ", user.userMbti);
        
        // 1단계: 텍스트 컨텐츠 백엔드로 전송
        const postData = {
            title: title,
            content: contentWithoutImages,
            category: selectCategory,
            writerId: user.username,
            writerNickname: user.userNickname,
            writerMbti: user.userMbti,
            writerMbtiColor: user.userMbtiColor,
        };

        try {
            const response = await axios.post(`${urlroot}/quilltest`, postData);
            const mbtmi = response.data.mbtmi;
            // console.log('*****반환받은데이터: ', response.data.mbtmi);
            // console.log('넘길 no: ', mbtmi.no);


            // 이미지 URL을 포함한 새로운 컨텐츠 생성
            let updatedContent = quillValue;
            const imageTags = quillValue.match(/<img[^>]*src="([^"]+)"[^>]*>/g) || [];

            for (const imgTag of imageTags) {
                const imgSrcMatch = imgTag.match(/src\s*=\s*"([^"]+)"/);
                const imageData = imgSrcMatch ? imgSrcMatch[1] : null;
                if (imageData) {
                    const fileIdx = await uploadImage(imageData, mbtmi.no);
                    console.log('fileIdx: ', fileIdx)
                    updatedContent = updatedContent.replace(imgTag, `<img src="${fileIdx}" />`);
                }
            }
            // 이미지가 포함된 최종 컨텐츠로 업데이트
            const updateResponse = await axios.post(`${urlroot}/mbtmiContainingImgTags/${mbtmi.no}`, { content: updatedContent });
            console.log('결과: ', updateResponse);

            // 게시글 상세 컴포넌트로 이동
            navigate(`/mbtmidetail/${mbtmi.no}`);

        } catch (error) {
            console.log(error);            
        }

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
                        {/* 카테고리 */}
                        <div className={style.categoryBtns}>
                            <label className={activeCategory==='잡담'? style.activeCategory :''} onClick={() => handleCategoryChange('잡담')}>잡담</label>
                            <label className={activeCategory==='연애'? style.activeCategory :''} onClick={() => handleCategoryChange('연애')}>연애</label>
                            <label className={activeCategory==='회사'? style.activeCategory :''} onClick={() => handleCategoryChange('회사')}>회사</label>
                            <label className={activeCategory==='학교'? style.activeCategory :''} onClick={() => handleCategoryChange('학교')}>학교</label>
                            <label className={activeCategory==='취미'? style.activeCategory :''} onClick={() => handleCategoryChange('취미')}>취미</label>
                        </div>
                        {/* 제목 */}
                        <input type="text" className={style.formtitle} onChange={(e)=>setTitle(e.target.value)}/>
                        {/* 내용: 에디터 */}
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
                <div style={{marginRight: '50px', float: 'right', marginTop: '20px'}}>
                    <div className={style.formBtns}>
                            <input type="button" value="취소" onClick={goToPreviousList}/>
                            {/* <button style={{cursor: 'pointer', background: 'pink', zIndex: 10}} onClick={handleFormSubmit}>저장버튼</button> */}
                            <input type="button" value="저장" onClick={handleFormSubmit}/>
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