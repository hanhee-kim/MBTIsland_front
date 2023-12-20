import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";

const CheckAbnormalAccess = ({children}) => {

    // 관리자 로그인되지 않은 상태로 관리자페이지 url요청시(비정상 접근 처리)
    const uri = useLocation().pathname;
    const user = useSelector((state) => state.persistedReducer.user.user); // 로그인정보 (Provider로 감싸져 리덕스스토어가 제공되는 컴포넌트내에서 요청 가능)
    const navigate = useNavigate();

    useEffect(() => {
        if(uri.includes('/admin') && user.userRole !== "ROLE_ADMIN") {
            alert("허용되지 않은 접근입니다.");
            navigate(-1);
            // window.location.replace("/");
        }
    }, [uri, user.userRole, navigate]);

    // return null;
    return user.userRole === "ROLE_ADMIN" ? <>{children}</> : null;

}

export default CheckAbnormalAccess;