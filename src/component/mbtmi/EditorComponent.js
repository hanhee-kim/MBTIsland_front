import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorComponentimport = (props) => {
    // 텍스트 state
    const [quillValue, setQuillValue] = useState("");
    // 텍스트 state를 변경시킬 함수
    const handleQuillChange = (content, delta, source, editor) => {
        setQuillValue(editor.getContents());
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
            [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
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



    // 내부버튼클릭
    const btnClick = () => {
        console.log('내부버튼 클릭');
        console.log('quillValue:', quillValue);
        
        
    }


    return (
        <div style={{ margin: "50px" }}>
            <button style={{cursor: 'pointer', background: 'skyblue', zIndex: 10}} onClick={btnClick}>퀼컴포넌트안내부저장버튼</button>

            <ReactQuill
                style={{ height: "400px", width: '100%' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={quillValue || ""}
                onChange={handleQuillChange}
            />
        </div>
    );
    
}
export default EditorComponentimport;