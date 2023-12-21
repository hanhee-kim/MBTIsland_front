import axios from "axios";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useRef, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

    const [modifying, setModifying] = useState(false); // 수정모드 여부
    const [mbtmi, setMbtmi] = useState(null);



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


    // 등록 폼에서 저장 버튼 클릭시
    const addPost = async () => {
        try {
            if (!title || !content) {
                alert('제목과 내용을 모두 입력하세요.');
                return;
            }
            // console.log('title: ', title, ", content: ", content, ", category: "+ selectCategory, ", writerId: ", user.username, ", writerMbti: ", user.userMbti);
    
            let defaultUrl = 'http://localhost:8090/mbtmiwrite';
            const response = await axios.post(defaultUrl, {
                                title: title,
                                content: content,
                                category: selectCategory,
                                writerId: user.username,
                                writerNickname: user.userNickname,
                                writerMbti: user.userMbti,
                                writerMbtiColor: user.userMbtiColor,
                            });
    
            console.log('요청결과: ', response);
            const postNo = response.data.mbtmi.no;
    
            // const makeFlexibleLink = (post) => {
            //     // alert('no, category, type, search, page: ' + post.no + ", " + category + ", " + type + ", " + search + ", " + page);
            //     const linkTo = `/mbtmidetail/${post.no}` +
            //                     (category? `/${category}` : '') +
            //                     (type? `/${type}` : '') +
            //                     (search? `/${search}` : '') +
            //                     (page? `/${page}` : '');
            //     navigate(linkTo, {replace:false});
            // }
            navigate(`/mbtmidetail/${postNo}`);
            
        } catch (error) {
            console.error('오류내용: ', error);
        }
    }


    
    // MBTmiDetail.js의 수정버튼을 통해 진입하여 파라미터 no과 함께 호출된 경우
    useEffect(()=> {
        if(no) {
            getMbtmiDetail(no);
            setModifying(true);
        } 
        // else {
        //     setModifying(false);
        // }
    }, [no]);
    const getMbtmiDetail = (no) => {
        let defaultUrl = `http://localhost:8090/mbtmidetail/${no}`;
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
        })
        .catch(err=> {
            console.log(err);
        });
    }
    
    // 수정 폼에서의 저장 버튼 클릭시
    const modifyPost = async () => {
        try {
            if(!title || !content) {
                alert('제목과 내용을 입력하세요.');
                return;
            }
            console.log("no: ", mbtmi.no, "writeDate: ", mbtmi.writeDate, "category: ", selectCategory, "title: ", title, ", content: ", content, "writerId: ", user.username);

            let defaultUrl = 'http://localhost:8090/mbtmimodify';
            const response = await axios.post(defaultUrl, {
                                no: mbtmi.no, // 수정될 게시글 번호를 전송

                                title: title,
                                content: content,
                                category: selectCategory,

                                writerId: user.username,
                                writeDate: mbtmi.writeDate, // 기존 등록일을 전송
                            });
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




    // 에디터ref등록
    const quillRef = useRef();



    // 텍스트 state
    const [quillValue, setQuillValue] = useState("");




    // 에디터 content의 변경이벤트 감지하여 호출됨... 이미지 삽입 감지하도록함=삽입이미지핸들러함수가 이미지를 처리하도록함(서버에 저장하고 url을 받아와서...)
    const handleQuillChange = async (content, delta, source, editor) => {
        // setQuillValue(editor.getContents());
        // setQuillValue(editor.getHTML());
        setQuillValue(content);

        console.log('editor.getHTML():', editor.getHTML()); // 텍스트는 <p>입력문자열</p> 이미지는 <img src="엄청 긴 base64코드"> 로 콘솔에 찍힌다
        // console.log('editor.getContents():', editor.getContents());


        // 이 함수를 트리거하는 이벤트인 onChange가 이미지 삽입으로 인해서 일어났는지를 체크
        if (source === 'user' && delta.ops.length > 0) {
            const insertedOps = delta.ops.filter((op) => op.insert && op.insert.image);


            if (insertedOps.length > 0) {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
    
                input.addEventListener("change", async () => {
                    const file = input.files[0];
    
                    try {
                        const formData = new FormData();
                        formData.append("image", file);
    
                        const response = await axios.post('http://localhost:8090/uploadImage', formData);
    
                        const editor = quillRef.current.getEditor();
                        editor.clipboard.dangerouslyPasteHTML(response.data.imageUrl, "api");
    
                    } catch (error) {
                        console.error("에러:", error);
                    }
                });
    
                input.click();
            }
        }
    };


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


        // 이미지 핸들러함수 추가하여, 사용자가 툴바에서 이미지버튼 클릭하면 함수가 호출되도록 함--->모듈내에 추가하면 에러 발생
        // imageHandler: imageHandler,
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




    // 외부버튼클릭
    const btnOutsideClick = async () => {
        console.log('외부버튼 클릭');
        
        // 서버로 보내기
        try {
            const response = await axios.post(`http://localhost:8090/quilltest`, {
                content: quillValue,
                title: '퀼테스트제목',
                category: '잡담',
                writerId: user.username,
                writerNickname: user.userNickname,
                writerMbti: user.userMbti,
                writerMbtiColor: user.userMbtiColor,
                
                
            });
            console.log('퀼데이터보내기 요청결과: ', response);
            
        } catch (error) {
            console.error('퀼데이터보내기 오류내용: ', error);
        }
    }


    





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




                {/* react-quill 
                폰트설정은 따로 하지 않은 상태
                이미지 크기가 원본으로 올라가는 상태

                */}
                {/* <div>
                <ReactQuill
                    style={{ height: "400px", margin: "4px" }}
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    modules={modules}
                    formats={formats}
                    onChange={setValue}
                    placeholder="내용을 입력하세요."
                />
                <button onClick={onClickSave}>저장!</button>   
                </div> */}



                <div>


                    {/* <button style={{cursor: 'pointer', background: 'pink'}} onClick={btnOutsideClick}>퀼컴포넌트밖외부저장버튼</button>
                    <EditorComponentimport /> */}


                    <div style={{ margin: "50px" }}>
                        <button style={{cursor: 'pointer', background: 'pink', zIndex: 10}} onClick={btnOutsideClick}>퀼컴포넌트밖외부저장버튼</button>

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





                {/* {modifying===false? (
                    // 최초 등록 폼
                    <form className={style.mbtmiForm}>
                        <li>카테고리</li>
                        <div className={style.categoryBtns}>
                            <label className={activeCategory==='잡담'? style.activeCategory :''} onClick={() => handleCategoryChange('잡담')}>잡담</label>
                            <label className={activeCategory==='연애'? style.activeCategory :''} onClick={() => handleCategoryChange('연애')}>연애</label>
                            <label className={activeCategory==='회사'? style.activeCategory :''} onClick={() => handleCategoryChange('회사')}>회사</label>
                            <label className={activeCategory==='학교'? style.activeCategory :''} onClick={() => handleCategoryChange('학교')}>학교</label>
                            <label className={activeCategory==='취미'? style.activeCategory :''} onClick={() => handleCategoryChange('취미')}>취미</label>
                        </div>

                        <li>제목</li>
                        <input type="text" className={style.formtitle} onChange={(e)=>setTitle(e.target.value)}/>
                        <li>본문</li>
                        <textarea className={style.formContent} rows="18"  onChange={(e)=>setContent(e.target.value)}/>
                        <div className={style.formBtns}>
                            <input type="button" value="취소" onClick={goToPreviousList}/>
                            <input type="button" value="저장" onClick={addPost}/>
                        </div>
                    </form>    

                ) : (
                    // 수정 폼
                    <form className={style.mbtmiForm}>
                    {console.log('selectCategory: ', selectCategory, ", mbtmi: ", mbtmi, ", activeCategory: ", activeCategory)}
                        <li>카테고리</li>
                        <div className={style.categoryBtns}>
                            <label className={activeCategory==='잡담'? style.activeCategory :''} onClick={() => handleCategoryChange('잡담')}>잡담</label>
                            <label className={activeCategory==='연애'? style.activeCategory :''} onClick={() => handleCategoryChange('연애')}>연애</label>
                            <label className={activeCategory==='회사'? style.activeCategory :''} onClick={() => handleCategoryChange('회사')}>회사</label>
                            <label className={activeCategory==='학교'? style.activeCategory :''} onClick={() => handleCategoryChange('학교')}>학교</label>
                            <label className={activeCategory==='취미'? style.activeCategory :''} onClick={() => handleCategoryChange('취미')}>취미</label>
                        </div>

                        <li>제목</li>
                        <input type="text" className={style.formtitle} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <li>본문</li>
                        <textarea className={style.formContent} rows="18" value={content} onChange={(e)=>setContent(e.target.value)}/>
                        <div className={style.formBtns}>
                            <input type="button" value="취소" onClick={goToPreviousList}/>
                            <input type="button" value="저장" onClick={modifyPost}/>
                        </div>
                    </form>    

                )} */}


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