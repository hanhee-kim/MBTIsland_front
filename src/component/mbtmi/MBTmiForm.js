import axios from "axios";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { urlroot } from "../../config";

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
    
            let defaultUrl = `${urlroot}/mbtmiwrite`;
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

            let defaultUrl = `${urlroot}/mbtmimodify`;
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

                {modifying===false? (
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