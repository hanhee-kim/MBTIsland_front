import { Table } from "reactstrap";
import { Link } from 'react-router-dom';

import style from "../../css/mbtwhy/MbtwhyMain.module.css"

function MbtwhyMain() {
    const cardStyle = {
        display:"flex",
        width:"170px",
        height:"125px",
        margin:"10px",
        border:"solid lightgray 2px",
        borderRadius:"20px",
        justifyContent:"center",
        flexDirection:"column",
        color:"black"
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
                        <h6 className={style.pageHeaderWriteBtn}>글 작성</h6>
                    </div>
                </div>

                <Table className={style.mbtwhyTable}>
                    <tbody>
                        <tr>
                            <Link to="/mbtwhy/istj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#ADB1B0"}}><h1>ISTJ</h1></td></Link>
                            <Link to="/mbtwhy/isfj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#F2DCB3"}}><h1>ISFJ</h1></td></Link>
                            <Link to="/mbtwhy/infj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#EAEFF9"}}><h1>INFJ</h1></td></Link>
                            <Link to="/mbtwhy/intj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#D8D4EA"}}><h1>INTJ</h1></td></Link>
                        </tr>
                        <tr>
                            <Link to="/mbtwhy/istp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#4D6879"}}><h1>ISTP</h1></td></Link>
                            <Link to="/mbtwhy/isfp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#BDC9A6"}}><h1>ISFP</h1></td></Link>
                            <Link to="/mbtwhy/infp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#648181"}}><h1>INFP</h1></td></Link>
                            <Link to="/mbtwhy/intp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#9BB7D4"}}><h1>INTP</h1></td></Link>
                        </tr>
                        <tr>
                            <Link to="/mbtwhy/estp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#D8927A"}}><h1>ESTP</h1></td></Link>
                            <Link to="/mbtwhy/esfp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#F0A4AB"}}><h1>ESFP</h1></td></Link>
                            <Link to="/mbtwhy/enfp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#FFD966"}}><h1>ENFP</h1></td></Link>
                            <Link to="/mbtwhy/entp" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#B6634A"}}><h1>ENTP</h1></td></Link>
                        </tr>
                        <tr>
                            <Link to="/mbtwhy/estj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#596D55"}}><h1>ESTJ</h1></td></Link>
                            <Link to="/mbtwhy/esfj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#E6D0CE"}}><h1>ESFJ</h1></td></Link>
                            <Link to="/mbtwhy/enfj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#82B8AD"}}><h1>ENFJ</h1></td></Link>
                            <Link to="/mbtwhy/entj" style={{textDecoration:"none"}}><td style={{...cardStyle, backgroundColor:"#35598F"}}><h1>ENTJ</h1></td></Link>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default MbtwhyMain;
