import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';

const AddJoin = () => {
//css
  const addJoinFormStyle ={
    width:"700px",
      height : "450px",
      padding: "15px",
      margin: "0 auto",
      boxShadow: "5px 5px lightGray",
      border: "1px solid black",
      borderRadius: "15px",
      fontSize:"20px",
      fontWeight:"500",
      marginTop:"200px",
  }
  const mbtiCheckBoxStyle = {
    border: "1px solid gray",
    borderRadius: "10px",
    width: "30px",
    fontSize: "20px",
    textAlign: "center",
    paddingLeft: "0px",
  };
  const mbtiCheckBox = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  //state,effect,...
  const [user,setUser] = useState({
  userMbti:'',
  userEmail:'',
})
const [emailCode,setEmailCode] = useState('');

  const [mbtiCheckE, setMbtiCheckE] = useState(false);
  const [mbtiCheckI, setMbtiCheckI] = useState(false);
  const [mbtiCheckN, setMbtiCheckN] = useState(false);
  const [mbtiCheckS, setMbtiCheckS] = useState(false);
  const [mbtiCheckT, setMbtiCheckT] = useState(false);
  const [mbtiCheckF, setMbtiCheckF] = useState(false);
  const [mbtiCheckP, setMbtiCheckP] = useState(false);
  const [mbtiCheckJ, setMbtiCheckJ] = useState(false);

  // const [mbti, setMbti] = useState("");
  const [arrMbti, setArrMbti] = useState([]);
//보내기를 눌렀는지? 인증이 되었는지?mbti 4개 선택 했는지
//function
const addJoin = (e) =>{
  e.preventDefault();
}
const change = (e) => {
  setUser({...user,[e.target.name]:[e.target.value],userMbti:arrMbti.join("")});
  console.log("user:"+user.userMbti+"email:"+user.userEmail);
};
const codeChange = (e) =>{
  setEmailCode(e.target.value);
  console.log(emailCode);
}
const getLabelBackgroundColor = (type) => {
  if (type === "E" && mbtiCheckE) {
    return "#25B2A2";
  } else if (type === "I" && mbtiCheckI) {
    return "#25B2A2";
  }
  if (type === "N" && mbtiCheckN) {
    return "#25B2A2";
  } else if (type === "S" && mbtiCheckS) {
    return "#25B2A2";
  }
  if (type === "T" && mbtiCheckT) {
    return "#25B2A2";
  } else if (type === "F" && mbtiCheckF) {
    return "#25B2A2";
  }
  if (type === "P" && mbtiCheckP) {
    return "#25B2A2";
  } else if (type === "J" && mbtiCheckJ) {
    return "#25B2A2";
  }
};
const getLabelColor = (type) => {
  if (type === "E" && mbtiCheckE) {
    return "white";
  } else if (type === "I" && mbtiCheckI) {
    return "white";
  }
  if (type === "N" && mbtiCheckN) {
    return "white";
  } else if (type === "S" && mbtiCheckS) {
    return "white";
  }
  if (type === "T" && mbtiCheckT) {
    return "white";
  } else if (type === "F" && mbtiCheckF) {
    return "white";
  }
  if (type === "P" && mbtiCheckP) {
    return "white";
  } else if (type === "J" && mbtiCheckJ) {
    return "white";
  }
};
const mbtiClick = (type, e) => {
  const newMbti = [...arrMbti];
  if (type === "E") {
    setMbtiCheckE(true);
    setMbtiCheckI(false);
    newMbti[0] = "E";
    setArrMbti(newMbti);
    console.log("E:" + mbtiCheckE + ",I:" + mbtiCheckI);
    console.log("arrMBTI : " + arrMbti);
  } else if (type === "I") {
    setMbtiCheckE(false);
    setMbtiCheckI(true);
    newMbti[0] = "I";
    setArrMbti(newMbti);
    console.log("E:" + mbtiCheckE + ",I:" + mbtiCheckI);
    console.log("arrMBTI : " + arrMbti);
  }
  if (type === "N") {
    setMbtiCheckN(true);
    setMbtiCheckS(false);
    newMbti[1] = "N";
    setArrMbti(newMbti);
    console.log("N:" + mbtiCheckN + ",S:" + mbtiCheckS);
    console.log("arrMBTI : " + arrMbti);
  } else if (type === "S") {
    setMbtiCheckN(false);
    setMbtiCheckS(true);
    newMbti[1] = "S";
    setArrMbti(newMbti);
    console.log("N:" + mbtiCheckN + ",S:" + mbtiCheckS);
    console.log("arrMBTI : " + arrMbti);
  }
  if (type === "T") {
    setMbtiCheckT(true);
    setMbtiCheckF(false);
    newMbti[2] = "T";
    setArrMbti(newMbti);
    console.log("T:" + mbtiCheckT + ",F:" + mbtiCheckF);
    console.log("arrMBTI : " + arrMbti);
  } else if (type === "F") {
    setMbtiCheckT(false);
    setMbtiCheckF(true);
    newMbti[2] = "F";
    setArrMbti(newMbti);
    console.log("T:" + mbtiCheckT + ",F:" + mbtiCheckF);
    console.log("arrMBTI : " + arrMbti);
  }
  if (type === "P") {
    setMbtiCheckP(true);
    setMbtiCheckJ(false);
    newMbti[3] = "P";
    setArrMbti(newMbti);
    console.log("P:" + mbtiCheckP + ",J:" + mbtiCheckJ);
    console.log("arrMBTI : " + arrMbti);
  } else if (type === "J") {
    setMbtiCheckP(false);
    setMbtiCheckJ(true);
    newMbti[3] = "J";
    setArrMbti(newMbti);
    console.log("P:" + mbtiCheckP + ",J:" + mbtiCheckJ);
    console.log("arrMBTI : " + arrMbti);
    const mb = arrMbti.join("");
    console.log(mb);
    console.log(mb.length);
  }
};

  return (
    <div>
      <Form style={addJoinFormStyle}>
      <FormGroup row style={{ justifyContent: "center" }}>
        <h3 style={{ fontSize: "40px" }}>ADD</h3>
      </FormGroup>
      <FormGroup>
      <Label sm={12}>
          필수입력 정보 미추가시 정상 회원가입이 되지 않습니다.
        </Label>
      </FormGroup>
      <FormGroup tag="fieldset" style={{ display: "flex", gap: "10px" }}>
          <Label for="mbti" sm={3}>
            MBTI
          </Label>
          <div style={mbtiCheckBox}>
            <FormGroup>
              {/* <input type="hidden" name="mbti" value={mbti} /> */}
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("E"),
                  color: getLabelColor("E"),
                }}
                check
                onClick={(e) => mbtiClick("E", e)}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti1"
                  checked={mbtiCheckE}
                  onChange={() => mbtiClick("E")}
                />
                E
              </Label>
            </FormGroup>

            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("I"),
                  color: getLabelColor("I"),
                }}
                check
                onClick={(e) => mbtiClick("I", e)}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti1"
                  checked={mbtiCheckI}
                  readOnly
                />
                {""}I
              </Label>
            </FormGroup>
          </div>
          <div style={{ textAlign: "center", width: "20px" }}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("N"),
                  color: getLabelColor("N"),
                }}
                check
                onClick={() => mbtiClick("N")}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti2"
                  checked={mbtiCheckN}
                  readOnly
                  onChange={() => {}}
                />
                {""}N
              </Label>
            </FormGroup>
            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("S"),
                  color: getLabelColor("S"),
                }}
                check
                onClick={() => mbtiClick("S")}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti2"
                  checked={mbtiCheckS}
                  readOnly
                />
                {""}S
              </Label>
            </FormGroup>
          </div>
          <div style={{ textAlign: "center", width: "20px" }}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("T"),
                  color: getLabelColor("T"),
                }}
                check
                onClick={() => mbtiClick("T")}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti3"
                  checked={mbtiCheckT}
                  readOnly
                />
                {""}T
              </Label>
            </FormGroup>
            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("F"),
                  color: getLabelColor("F"),
                }}
                check
                onClick={() => mbtiClick("F")}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti3"
                  checked={mbtiCheckF}
                  readOnly
                />
                {""}F
              </Label>
            </FormGroup>
          </div>
          <div style={{ textAlign: "center", width: "20px" }}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("P"),
                  color: getLabelColor("P"),
                }}
                check
                onClick={() => mbtiClick("P")}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti4"
                  checked={mbtiCheckP}
                  readOnly
                />
                {""}P
              </Label>
            </FormGroup>
            <FormGroup>
              <Label
                style={{
                  ...mbtiCheckBoxStyle,
                  backgroundColor: getLabelBackgroundColor("J"),
                  color: getLabelColor("J"),
                }}
                check
                onClick={() => mbtiClick("J")}
              >
                <input
                  style={{ display: "none" }}
                  type="radio"
                  name="emti4"
                  checked={mbtiCheckJ}
                  readOnly
                />
                {""}J
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <FormGroup row>
          <Label for="userEmail" sm={3}>
            이메일
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="userEmail"
              id="userEmail"
              placeholder="Email 입력하세요."
              onChange={change}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
            >
              보내기
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="emailCode" sm={3}>
            인증코드
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="emailCode"
              id="emailCode"
              placeholder="인증코드를 입력하세요."
              onChange={codeChange}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
            >
              인증
            </Button>
          </Col>
        </FormGroup>
      
      <FormGroup style={{ justifyContent: "flex-end", display: "flex" }}>
          <Button
          color='dark'
            style={{
              borderRadius: "10px",
              // backgroundColor: "black",
              // color: "white",
              marginRight: "40px",
              marginTop: "25px",
              width: "100px",
              fontSize: "20px",
            }}
            type="submit"
            name="submit"
            onClick={addJoin}
          >
            추가
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default AddJoin;