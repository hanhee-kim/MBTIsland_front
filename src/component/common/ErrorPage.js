import { useNavigate } from 'react-router-dom';
import style from "../../css/common/ErrorPage.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        
        <div className={style.errorDiv}>
            <img
                src={"/desert-island-error.png"}
                alt="에러 이미지"
                className={style.errorImg}
            />
            <div className={style.errorMsgDiv}>
                <h1>404 Error</h1>
                <h6>
                    죄송합니다. 페이지를 찾을 수 없습니다.<br/>
                    존재하지 않는 주소를 입력하셨거나<br/>
                    요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
                </h6>
                <button onClick={()=>navigate(`/`)}>홈으로</button>
            </div>
            
            
        </div>
    );
};

export default ErrorPage;