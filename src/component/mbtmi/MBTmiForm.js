import axios from "axios";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { urlroot } from "../../config";
import Swal from "sweetalert2";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const MBTmiForm = () => {
    
    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user);
    
    const { no } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectCategory, setSelectCategory] = useState("");
    const [activeCategory, setActiveCategory] = useState("");

    const [modifying, setModifying] = useState(false); // 수정모드 여부
    const [mbtmi, setMbtmi] = useState(null);

    // 에디터ref등록
    const quillRef = useRef();

    // 선택된 이미지 (백엔드로 보내어 처리 전)
    const [selectedImage, setSelectedImage] = useState(null);

    // 텍스트 state
    const [quillValue, setQuillValue] = useState("");

    // 에디터 content의 변경을 감지하여 호출됨.
    const handleQuillChange = async (content, delta, source, editor) => {
        setQuillValue(content);

        console.log('editor.getHTML():', editor.getHTML()); // 텍스트는 <p>입력문자열</p> 이미지는 <img src="엄청 긴 base64코드"> 로 콘솔에 찍힌다

        // 이미지가 삽입또는 제거됐는지 확인 후 처리
        if (source === 'user') {
            const insertedImages = delta.ops.filter(op => op.insert && op.insert.image);
            const deletedImages = delta.ops.filter(op => op.delete);
            if (insertedImages.length > 0) { // 이미지가 삽입된 경우
                const imageData = insertedImages[0].insert.image;
                setSelectedImage(imageData); // 이미지 삽입 처리
            } else if (deletedImages.length > 0) { // 이미지가 제거된 경우
                setSelectedImage(null); // 이미지 제거 처리
            }
        }
    };

    // 이미지 업로드
    const uploadImage = async (imageData, postNo) => {
        const formData = new FormData();
        // Base64 이미지데이터를 Blob으로 변환
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

    // 등록폼에서 저장 버튼 클릭시
    const handleFormSubmit = async () => {
        
        console.log('title: ', title, ", content: ", quillValue, ", category: "+ selectCategory, ", writerId: ", user.username, ", writerMbti: ", user.userMbti);
        if (title==='' || quillValue==='' || selectCategory==='') {
            Swal.fire({
                title: "게시글 등록 실패",
                text: "제목, 내용, 카테고리를 확인해주세요.",
                icon: "warning",
            });
            return;
        } 
        // 에디터 내용에서 이미지 태그 제거하고 텍스트만 추출
        const contentWithoutImages = quillValue.replace(/<img[^>]*>/g, "");
        setQuillValue(contentWithoutImages);
        // console.log('***contentWithoutImages: ', contentWithoutImages);


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
            const response = await axios.post(`${urlroot}/mbtmiwritewithoutimages`, postData);
            const mbtmi = response.data.mbtmi;
            // console.log('*****반환받은데이터: ', response.data.mbtmi);
            // console.log('넘길 no: ', mbtmi.no);


            // 이미지 URL을 포함한 새로운 컨텐츠 생성
            let updatedContent = quillValue;
            const imageTags = quillValue.match(/<img[^>]*src="([^"]+)"[^>]*>/g) || [];

            for (const imgTag of imageTags) {
                const imgSrcMatch = imgTag.match(/src\s*=\s*"([^"]+)"/);
                const imgWidthMatch = imgTag.match(/width\s*=\s*"([^"]+)"/); // width 속성 추출
                const imageData = imgSrcMatch ? imgSrcMatch[1] : null;
                if (imageData) {
                    const fileIdx = await uploadImage(imageData, mbtmi.no);
                    console.log('fileIdx: ', fileIdx);

                    // 추가
                    const newImgTag = `<img src="${fileIdx}" ${imgWidthMatch ? `width="${imgWidthMatch[1]}px"` : ''} />`;
                    updatedContent = updatedContent.replace(imgTag, newImgTag);

                    updatedContent = updatedContent.replace(imgTag, `<img src="${fileIdx}" />`);
                }
            }

            /*
            // 이미지가 포함된 최종 컨텐츠로 업데이트
            const updateResponse = await axios.post(`${urlroot}/mbtmiContainingImgTags/${mbtmi.no}`, { content: updatedContent });
            console.log('결과: ', updateResponse);
            
            // 게시글 상세 컴포넌트로 이동
            // navigate(`/mbtmidetail/${mbtmi.no}`);
            */

            try {
                const updateResponse = await axios.post(`${urlroot}/mbtmiContainingImgTags/${mbtmi.no}`, { content: updatedContent });
                console.log('결과: ', updateResponse);
                navigate(`/mbtmidetail/${mbtmi.no}`);
            } catch (error) {
                console.error('게시글업데이트 에러 내용:', error);
            }


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
            ["image"],
            [{ align: [] }, { color: [] }, { background: [] }],
        ],

        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
        },
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



    // 취소 버튼
    const goToPreviousList = () => {
        navigate(-1);
    };

    // 카테고리 선택
    const handleCategoryChange = (categoryParam) => {
        setSelectCategory(categoryParam);
        setActiveCategory(categoryParam);
    };
    // useEffect(() => {
    //     setActiveCategory(selectCategory);
    // }, [selectCategory]);


    
    // MBTmiDetail.js의 수정버튼을 통해 진입하여 파라미터 no과 함께 호출된 경우
    useEffect(()=> {
        if(no) {
            getMbtmiDetail(no);
            setModifying(true);
        } 
    }, [no]);
    const getMbtmiDetail = (no) => {
        let defaultUrl = `${urlroot}/mbtmidetail/${no}`;
        // if(user.username!=="" || user.username!==undefined) defaultUrl += `?username=${user.username}`;
        axios.get(defaultUrl)
        .then(res=> {
            console.log('getMbtmiDetail 요청결과: ', res);
            let mbtmi = res.data.mbtmi;
            let prevCategory = res.data.mbtmi.category;
            setMbtmi(mbtmi);
            setTitle(mbtmi.title);
            setContent(mbtmi.content);
            setActiveCategory(prevCategory);
            setSelectCategory(prevCategory);

            // setQuillValue(mbtmi.content); // 에디터의 내용값 설정
            mbtmi.content = replaceImagePlaceholders(mbtmi.content); // 이미지 출력을 위한 처리
            setQuillValue(mbtmi.content); // 이미지URL로 교체된 내용을 에디터의 내용값으로 설정
        })
        .catch(err=> {
            console.log(err);
        });
    }
    // 이미지출력을 위한 처리: fileIdx가 들어간 이미지태그 이미지 URL로 교체
    // const replaceImagePlaceholders = (content) => {
    //     return content.replace(/<img src="(\d+)" \/>/g, (match, fileIdx) => {
    //         return `<img src="${urlroot}/mbtmiimg/${fileIdx}" alt=''/>`;
    //     });
    // };
    // 이미지 사이즈 조절 모듈 추가 이후 width 속성을 고려
    const replaceImagePlaceholders = (content) => {
        console.log('content: ', content);
        return content.replace(/<img src="(\d+)"(.*)\/>/g, (match, fileIdx, otherAttributes) => {
            return `<img src="${urlroot}/mbtmiimg/${fileIdx}" ${otherAttributes} alt=''/>`;
        });
    };
    

    // 수정 폼에서의 저장 버튼 클릭시
    const modifyPost = async () => {
        try {
            console.log("no: ", mbtmi.no, "writeDate: ", mbtmi.writeDate, "category: ", selectCategory, "title: ", title, ", content: ", content, "writerId: ", user.username);
            if (title==='' || quillValue==='' || selectCategory==='') {
                Swal.fire({
                    title: "게시글 등록 실패",
                    text: "제목, 내용, 카테고리를 확인해주세요.",
                    icon: "warning",
                });
                return;
            }
            // 에디터 내용에서 이미지 태그 제거하고 텍스트만 추출
            const contentWithoutImages = quillValue.replace(/<img[^>]*>/g, "");
            console.log('contentWithoutImages: ', contentWithoutImages);
            // 게시글 수정 데이터
            const postData = {
                no: mbtmi.no,  // 수정될 게시글 번호를 전송
                title: title,
                content: contentWithoutImages,
                category: selectCategory,
                writerId: user.username,
                writeDate: mbtmi.writeDate // 기존 등록일을 전송
            };

            // 이미지 URL을 포함한 새로운 컨텐츠 생성
            let updatedContent = quillValue;
            const imageTags = quillValue.match(/<img[^>]*src="([^"]+)"[^>]*>/g) || [];

            for (const imgTag of imageTags) {
                const imgSrcMatch = imgTag.match(/src\s*=\s*"([^"]+)"/);
                const imageData = imgSrcMatch ? imgSrcMatch[1] : null;
                
                if (imageData && isBase64Image(imageData)) {
                    // 새로운 이미지가 삽입된 경우, 서버에 업로드
                    const fileIdx = await uploadImage(imageData, mbtmi.no);
                    updatedContent = updatedContent.replace(imgTag, `<img src="${fileIdx}" />`);
                } else {
                    // 기존 이미지 유지
                    updatedContent = updatedContent.replace(imgTag, `<img src="${imageData}" />`);
                }
            }

            postData.content = updatedContent;
            // 수정된 게시글 데이터로 서버에 요청
            const response = await axios.post(`${urlroot}/mbtmimodify`, postData);

            console.log('수정 요청결과: ', response);
            const modifiedMbtmi = response.data.mbtmi;
            setMbtmi(modifiedMbtmi);
            setModifying(false);

            // 수정 완료 후 Detail.js로 이동하기
            navigate(`/mbtmidetail/${no}`)

        } catch (error) {
            console.error('수정 오류내용: ', error);
        }

    }

    // Base64 이미지 데이터인지 확인하는 함수
    const isBase64Image = (imageData) => {
        return imageData.startsWith('data:image');
    };

    return (
        <>
        <div className={style.container} id="top">
            
            <section className={style.sectionLeftArea}></section>
            <section className={style.section}>

                <div className={style.boardTitleB}>
                    <div className={style.boardTitleTextArea}>
                        <p>MB-TMI</p>
                        <p>유형별로 모여 자유롭게 이야기를 나눌 수 있는 공간</p>
                    </div>
                    <div>
                        <img alt="tmi" src={"/tmi.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                    </div>
                </div>

                {modifying===false? (
                    // 최초 등록 폼
                    <form className={style.mbtmiForm}>
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
                            className={style.customQuill}
                        />
                        <div className={style.formBtns}>
                                <input type="button" value="취소" onClick={goToPreviousList}/>
                                {/* <button style={{cursor: 'pointer', background: 'pink', zIndex: 10}} onClick={handleFormSubmit}>저장버튼</button> */}
                                <input type="button" value="저장" onClick={handleFormSubmit}/>
                        </div>
                    </form>    

                ) : (
                    // 수정 폼
                    <form className={style.mbtmiForm}>
                    {console.log('selectCategory: ', selectCategory, ", mbtmi: ", mbtmi, ", activeCategory: ", activeCategory)}

                        {/* 카테고리 */}
                        <div className={style.categoryBtns}>
                            <label className={activeCategory==='잡담'? style.activeCategory :''} onClick={() => handleCategoryChange('잡담')}>잡담</label>
                            <label className={activeCategory==='연애'? style.activeCategory :''} onClick={() => handleCategoryChange('연애')}>연애</label>
                            <label className={activeCategory==='회사'? style.activeCategory :''} onClick={() => handleCategoryChange('회사')}>회사</label>
                            <label className={activeCategory==='학교'? style.activeCategory :''} onClick={() => handleCategoryChange('학교')}>학교</label>
                            <label className={activeCategory==='취미'? style.activeCategory :''} onClick={() => handleCategoryChange('취미')}>취미</label>
                        </div>
                        {/* 제목 */}
                        <input type="text" className={style.formtitle} value={title} onChange={(e)=>setTitle(e.target.value)}/>
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
                        <div className={style.formBtns}>
                                <input type="button" value="취소" onClick={goToPreviousList}/>
                                <input type="button" value="저장" onClick={modifyPost}/>
                        </div>
                    </form>    
                )}


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