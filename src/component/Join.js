import React,{ useState} from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const Join = () => {
  const joinFormStyle = {
    border: "1px solid black",
    borderRadius:"15px",
    width: "750px",
    height: "550px",
    padding: "15px",
    margin: "0 auto",
    boxShadow:"5px 5px lightGray"
  };
  const mbtiCheckBoxStyle={
    border: "1px solid gray",
    borderRadius:"10px",
    width:"30px",
    fontSize : "20px",
    textAlign : "center",
    paddingLeft : "0px",
  }
  const mbtiCheckBox = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };
  const [user,setUser] = useState({
    id:'',
    password:'',
    nick:"",
    mbti:'',
    email:'',
  })
  const [mbti,setMbti] = useState([]);
  const submit = (e) =>{
    e.preventDefault();
    setUser({...user,id:'',password:'',nick:'',mbti:'',})
  }
  const  [mbtiCheckE,setMbtiCheckE] = useState(false);
  const  [mbtiCheckI,setMbtiCheckI] = useState(false);
  const  [mbtiCheckN,setMbtiCheckN] = useState(false);
  const  [mbtiCheckS,setMbtiCheckS] = useState(false);
  const  [mbtiCheckT,setMbtiCheckT] = useState(false);
  const  [mbtiCheckF,setMbtiCheckF] = useState(false);
  const  [mbtiCheckP,setMbtiCheckP] = useState(false);
  const  [mbtiCheckJ,setMbtiCheckJ] = useState(false);

  const getLabelBackgroundColor = (type) => {
    if (type === "E" && mbtiCheckE) {
      return "#25B2A2";
    } else if (type === "I" && mbtiCheckI) {
      return "#25B2A2";
    } 
    if(type === "N" && mbtiCheckN){
      return "#25B2A2";
    } else if( type === "S" && mbtiCheckS){
      return "#25B2A2";
    }
    if(type === "T" && mbtiCheckT){
      return "#25B2A2";
    } else if( type === "F" && mbtiCheckF){
      return "#25B2A2";
    }
    if(type === "P" && mbtiCheckP){
      return "#25B2A2";
    } else if( type === "J" && mbtiCheckJ){
      return "#25B2A2";
    }
  };
  const getLabelColor = (type) => {
    if(type === 'E' && mbtiCheckE) {
      return "white";
    } else if( type === 'I' && mbtiCheckI){
      return "white";
    }
    if(type === 'N' && mbtiCheckN) {
      return "white";
    } else if( type === 'S' && mbtiCheckS){
      return "white";
    }
    if(type === 'T' && mbtiCheckT) {
      return "white";
    } else if( type === 'F' && mbtiCheckF){
      return "white";
    }
    if(type === 'P' && mbtiCheckP) {
      return "white";
    } else if( type === 'J' && mbtiCheckJ){
      return "white";
    }
  }
  // const [eRef,setERef] =useRef(false);
  const mbtiClick = (type,e) => {
    const newMbti = [...mbti];
    // e.target.backgroundColor:"";
    if(type === "E"){
      setMbtiCheckE(true);
      setMbtiCheckI(false);
      newMbti[0] = "E";
      setMbti(newMbti);
      // console.log(e);
      console.log("E:"+mbtiCheckE+",I:"+mbtiCheckI);
      console.log("MBTI : "+mbti);
    }else if(type === "I"){
      setMbtiCheckE(false);
      setMbtiCheckI(true);
      newMbti[0] = "I";
      setMbti(newMbti);
      console.log("E:"+mbtiCheckE+",I:"+mbtiCheckI);
      console.log("MBTI : "+mbti);
    }
    if(type ==="N"){
      setMbtiCheckN(true);
      setMbtiCheckS(false);
      newMbti[1] = "N";
      setMbti(newMbti);
      console.log("N:"+mbtiCheckN+",S:"+mbtiCheckS);
      console.log("MBTI : "+mbti);
    }
    else if(type === "S"){
      setMbtiCheckN(false);
      setMbtiCheckS(true);
      newMbti[1] = "S";
      setMbti(newMbti);
      console.log("N:"+mbtiCheckN+",S:"+mbtiCheckS);
      console.log("MBTI : "+mbti);
    }
    if(type ==="T"){
      setMbtiCheckT(true);
      setMbtiCheckF(false);
      newMbti[2] = "T";
      setMbti(newMbti);
      console.log("T:"+mbtiCheckT+",F:"+mbtiCheckF);
      console.log("MBTI : "+mbti);
    }
    else if(type === "F"){
      setMbtiCheckT(false);
      setMbtiCheckF(true);
      newMbti[2] = "F";
      setMbti(newMbti);
      console.log("T:"+mbtiCheckT+",F:"+mbtiCheckF);
      console.log("MBTI : "+mbti);
    }
    if(type ==="P"){
      setMbtiCheckP(true);
      setMbtiCheckJ(false);
      newMbti[3] = "P";
      setMbti(newMbti);
      console.log("P:"+mbtiCheckP+",J:"+mbtiCheckJ);
      console.log("MBTI : "+mbti);
    }
    else if(type === "J"){
      setMbtiCheckP(false);
      setMbtiCheckJ(true);
      newMbti[3] = "J";
      setMbti(newMbti);
      console.log("P:"+mbtiCheckP+",J:"+mbtiCheckJ);
      console.log("MBTI : "+mbti);
    }

  }
  return (
    <div>
      <Form style={joinFormStyle}>
        <FormGroup row  style={{justifyContent: "center"}}>
          <h3 style={{fontSize:"40px"}}>JOIN</h3>
        </FormGroup>
        <FormGroup row>
          <Label for="join_id" sm={3}>
            아이디
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="join_id"
              id="join_id"
              placeholder="ID를 입력하세요."
            />
          </Col>
          <Col sm={2}>
            <Button color="white" style={{border:"1px solid black",fontWeight:"600"}}>중복확인</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="join_password" sm={3}>
            비밀번호
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="join_password"
              id="join_password"
              placeholder="PASSWORD를 입력하세요."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="join_password_check" sm={3}>
            비밀번호 확인
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="join_password_check"
              id="join_password_check"
              placeholder="PASSWORD를 한번더 입력하세요."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="join_nick" sm={3}>
            닉네임
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="join_nick"
              id="join_nick"
              placeholder="NICKNAME 입력하세요."
            />
          </Col>
        </FormGroup>

        <FormGroup tag="fieldset" style={{ display: "flex", gap: "10px" }}>
          <Label for="mbti" sm={3}>
            MBTI
          </Label>
          <div style={mbtiCheckBox}>

            <FormGroup>
              <input type="hidden" name="mbti" value={mbti}/>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('E'),color:getLabelColor('E')}} check onClick={(e)=>mbtiClick("E",e)} >
                <input style={{ display:"none"}} type="radio" name="emti1" checked={mbtiCheckE} onChange={() => mbtiClick("E")}/>
                E
              </Label>

            </FormGroup>

            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('I'),color:getLabelColor('I')}} check onClick={(e)=>mbtiClick("I",e)}>
                <input  style={{ display:"none"}} type="radio" name="emti1" checked={mbtiCheckI} readOnly/>
                {""}
                I
              </Label>
            </FormGroup>
          </div>
          <div style={{textAlign:"center",width:"20px"}}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('N'),color:getLabelColor('N')}} check onClick={()=>mbtiClick("N")}>
                <input style={{ display:"none"}} type="radio" name="emti2" checked={mbtiCheckN} readOnly onChange={() => {}}/>
                {""}
                N
              </Label>
            </FormGroup>
            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('S'),color:getLabelColor('S')}} check onClick={()=>mbtiClick("S")}>
                <input style={{ display:"none"}} type="radio" name="emti2" checked={mbtiCheckS} readOnly/>
                {""}
                S
              </Label>
            </FormGroup>
          </div>
          <div style={{textAlign:"center",width:"20px"}}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('T'),color:getLabelColor('T')}} check onClick={()=>mbtiClick("T")}>
                <input style={{ display:"none"}} type="radio" name="emti3" checked={mbtiCheckT} readOnly/>
                {""}
                T
              </Label>
            </FormGroup>
            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('F'),color:getLabelColor('F')}} check onClick={()=>mbtiClick("F")}>
                <input style={{ display:"none"}} type="radio" name="emti3" checked={mbtiCheckF} readOnly/>
                {""}
                F
              </Label>
            </FormGroup>
          </div>
          <div style={{textAlign:"center",width:"20px"}}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('P'),color:getLabelColor('P')}} check onClick={()=>mbtiClick("P")}>
                <input style={{ display:"none"}} type="radio" name="emti4" checked={mbtiCheckP} readOnly/>
                {""}
                P
              </Label>
            </FormGroup>
            <FormGroup>
              <Label style={{...mbtiCheckBoxStyle,backgroundColor:getLabelBackgroundColor('J'),color:getLabelColor('J')}} check onClick={()=>mbtiClick("J")}>
                <input style={{ display:"none"}} type="radio" name="emti4" checked={mbtiCheckJ} readOnly/>
                {""}
                J
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <FormGroup row>
          <Label for="join_id" sm={3}>
            이메일
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="join_email"
              id="join_email"
              placeholder="Email 입력하세요."
            />
          </Col>
          <Col sm={2}>
            <Button color="white" style={{border:"1px solid black",fontWeight:"600"}}>보내기</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="join_code" sm={3}>
            인증코드
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="join_code"
              id="join_code"
              placeholder="인증코드를 입력하세요."
            />
          </Col>
          <Col sm={2}>
            <Button color="white" style={{border:"1px solid black",fontWeight:"600"}}>인증</Button>
          </Col>
        </FormGroup>
        <FormGroup style={{justifyContent: "flex-end",
    display: "flex"}}>
        <button style={{borderRadius:"10px",backgroundColor:"black",color:"white",marginRight:"40px",marginTop:"25px",width:"100px",fontSize:"20px"}} type="submit" name="submit" onClick={submit}>
          가입
        </button>
        </FormGroup>
      </Form>

    </div>
  );
};

export default Join;
