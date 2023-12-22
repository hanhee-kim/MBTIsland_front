import { Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import style from "../../css/mbtwhy/MbtwhyMain.module.css"

function MbtwhyMain() {
    // 로그인 유저 정보]
    const user = useSelector((state) => state.persistedReducer.user.user);

    const navigate = useNavigate();

    const goMbtwhy = (mbti) => {
        const url = `/mbtwhy/${mbti}`;
        navigate(url);
    }

    // mbtwhywrite 이동
    const goMbtwhyWrite = () => {
        let defaultUrl = `/mbtwhywrite`;
        navigate(defaultUrl);
    }

    const cardStyle = {
        display:"flex",
        width:"170px",
        height:"125px",
        margin:"10px",
        border:"solid lightgray 2px",
        borderRadius:"20px",
        justifyContent:"center",
        flexDirection:"column",
        color:"black",
        cursor:"pointer"
    };

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>MBT-Why</h1>
                    <div>
                        <h6 className={style.pageHeaderContent}>원하는 MBTI 유형에게 질문을 남겨보세요!</h6>
                        {user.username!==undefined?<div className={style.pageHeaderWriteBtn} onClick={()=>goMbtwhyWrite()}>글 작성</div>:<></>}
                    </div>
                </div>

                <Table className={style.mbtwhyTable}>
                    <tbody>
                        <tr>
                            <td style={{...cardStyle, backgroundColor:"#ADB1B0"}} onClick={()=>goMbtwhy("istj")}><h1>ISTJ</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#F2DCB3"}} onClick={()=>goMbtwhy("isfj")}><h1>ISFJ</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#EAEFF9"}} onClick={()=>goMbtwhy("infj")}><h1>INFJ</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#D8D4EA"}} onClick={()=>goMbtwhy("intj")}><h1>INTJ</h1></td>
                        </tr>
                        <tr>
                            <td style={{...cardStyle, backgroundColor:"#4D6879"}} onClick={()=>goMbtwhy("istp")}><h1>ISTP</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#BDC9A6"}} onClick={()=>goMbtwhy("isfp")}><h1>ISFP</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#648181"}} onClick={()=>goMbtwhy("infp")}><h1>INFP</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#9BB7D4"}} onClick={()=>goMbtwhy("intp")}><h1>INTP</h1></td>
                        </tr>
                        <tr>
                            <td style={{...cardStyle, backgroundColor:"#D8927A"}} onClick={()=>goMbtwhy("estp")}><h1>ESTP</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#F0A4AB"}} onClick={()=>goMbtwhy("esfp")}><h1>ESFP</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#FFD966"}} onClick={()=>goMbtwhy("enfp")}><h1>ENFP</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#B6634A"}} onClick={()=>goMbtwhy("istj")}><h1>ENTP</h1></td>
                        </tr>
                        <tr>
                            <td style={{...cardStyle, backgroundColor:"#596D55"}} onClick={()=>goMbtwhy("estj")}><h1>ESTJ</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#E6D0CE"}} onClick={()=>goMbtwhy("esfj")}><h1>ESFJ</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#82B8AD"}} onClick={()=>goMbtwhy("enfj")}><h1>ENFJ</h1></td>
                            <td style={{...cardStyle, backgroundColor:"#35598F"}} onClick={()=>goMbtwhy("entj")}><h1>ENTJ</h1></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default MbtwhyMain;
