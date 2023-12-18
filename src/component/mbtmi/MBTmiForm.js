import axios from "axios";
import style from "../../css/mbtmi/MBTmi.module.css";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MBTmiForm = () => {
    
    // 로그인정보 가져오기
    const user = useSelector((state) => state.persistedReducer.user.user);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectCategory, setSelectCategory] = useState("");
    const [activeCategory, setActiveCategory] = useState("");

    
    const handleCategoryChange = (categoryParam) => {
        setSelectCategory(categoryParam);
        setActiveCategory(categoryParam);
    };
    // useEffect(() => {
    //     setActiveCategory(selectCategory);
    // }, [selectCategory]);


    // 취소 버튼
    const navigate = useNavigate();
    const goToPreviousList = () => {
        navigate(-1);
    };

    // 저장 버튼
    const addPost = async () => {
        try {
            if (!title || !content) {
                alert('제목과 내용을 모두 입력하세요.');
                return;
            }
            console.log('title: ', title, ", content: ", content, ", category: "+ selectCategory, ", writerId: ", user.username, ", writerMbti: ", user.userMbti);
    
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