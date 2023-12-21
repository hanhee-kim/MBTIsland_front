import EditorComponentimport from "./EditorComponent";

const TestBoardForm = () => {

    return (    
        <div style={{marginTop: '200px', marginBottom: '200px'}}>
            <div>MB-TMI게시판제목</div>
            
            <EditorComponentimport />
            <button>저장</button>

        </div>
    )
}
export default TestBoardForm;