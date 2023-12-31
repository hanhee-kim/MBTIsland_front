import { Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import Swal from "sweetalert2";
import style from "../../css/mbtwhy/MbtwhyMain.module.css"

function MbtwhyMain() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user);

    const navigate = useNavigate();

    const goMbtwhy = (mbti) => {
        const url = `/mbtwhy/${mbti}`;
        navigate(url);
    }

    // mbtwhywrite 이동
    const goMbtwhyWrite = () => {
        if(!user.username) {
            Swal.fire({
                title: "로그인해주세요.",
                icon: "warning",
            });
            return;
        }

        if(user.isBanned==="Y") {
            Swal.fire({
                title: "정지 상태에서는 글을 작성하실 수 없습니다.",
                icon: "warning",
            });
            return;
        }

        if(user.userRole==="ROLE_ADMIN") {
            Swal.fire({
                title: "게시판 이용을 위해 일반회원으로 로그인해주세요.",
                icon: "warning",
            });
            return;
        }

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
                <div className={style.boardTitleB}>
                    <div className={style.boardTitleTextArea}>
                        <p>MBT-WHY</p>
                        <p>원하는 MBTI 유형에게 질문을 남겨보세요!</p>
                    </div>
                    <div>
                        <img alt="mbtwhy" src={"/why.png"} width={"220px"} height={"120px"} className={style.boardTitleImg}></img>
                    </div>
                </div>
                <div className={style.writebtnDiv}>
                    <button onClick={()=>goMbtwhyWrite()}><img src={"/writebtnIcon.png" } alt="" className={style.writebtnIcon} />작성하기</button>
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
                            <td style={{...cardStyle, backgroundColor:"#B6634A"}} onClick={()=>goMbtwhy("entp")}><h1>ENTP</h1></td>
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
            <section className={style.sectionRightArea}>
                <div>
                    <a href="#top"><img src={"/movetopIcon.png" } alt="top" className={style.movetopIcon}/></a>
                </div>
            </section>
        </div>
    );
}

export default MbtwhyMain;
