import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import Swal from "sweetalert2";

const Join = () => {
  //---css
  const joinFormStyle = {
    border: "1px solid black",
    borderRadius: "15px",
    width: "750px",
    height: "600px",
    padding: "15px",
    margin: "0 auto",
    boxShadow: "5px 5px lightGray",
    fontSize: "20px",
    fontWeight: "500",
  };
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

  const btnSelStyle = {
    ...mbtiCheckBoxStyle,
    backgroundColor: "#25B2A2",
    color: "white",
    borderColor: "#25B2A2",
  };

  const btnOrgStyle = {
    ...mbtiCheckBoxStyle,
    backgroundColor: "white",
    color: "black",
    borderColor: "gray",
  };
  //css---
  //---state
  const [user, setUser] = useState({
    username: "",
    userPassword: "",
    userNickname: "",
    userMbti: "",
    userEmail: "",
  });
  //비밀번호확인값
  const [passwordCheckValue,setPasswordCheckValue] = useState('');
  
  const [mbtiCheckEI, setMbtiCheckEI] = useState("E");
  const [mbtiCheckNS, setMbtiCheckNS] = useState("N");
  const [mbtiCheckTF, setMbtiCheckTF] = useState("T");
  const [mbtiCheckPJ, setMbtiCheckPJ] = useState("P");
  //Id중복체크
  const [isIdDuplicateCheck,setIsIdDuplicateCheck] = useState(false);
  //비밀번호 일치하는지
  const [isSamePassword,setIsSamePassword] = useState(false);
  //이메일인증했는지 여부
  const [isEmailCheck,setIsEmailCheck] = useState(false);

  //state---
  //id의 유효성조건
  const validateUsername = () => {
    var idRegExp = /^[a-zA-Z0-9]{4,8}$/;
    return idRegExp.test(user.username);
  };
  //Nick의 유효성조건
  const validateUserNick = () => {
    var nickRegExp = /^[a-zA-Z0-9가-힣]{2,8}$/;
    return nickRegExp.test(user.userNickname);
  };
  //Input값이 변경될때
  const change = (e) => {
    setUser({
      ...user,
      [e.target.name]: [e.target.value],
    });
    if(isSamePassword){
      if(e.target.name === 'userPassword'){
        setIsSamePassword(false);
      }
    }
    if(e.target.name === 'userPassword'){
      if(e.target.value == passwordCheckValue){
        setIsSamePassword(true);
      }
    }
    console.log("input:" + e.target.value);
    // console.log("user" + user);
    // console.log("username:" + user.username + "  " + user.userPassword);
  };
  //비밀번호 확인란 입력할 때
  const passwordCheck = (e) => {
    setPasswordCheckValue(e.target.value);
    const checkPassword = e.target.value; //set사용해서 바로 값이 랜더링되지않을 수 있으므로 다른 변수에 담아 비교
    if(user.userPassword == checkPassword){
      setIsSamePassword(true);
    }else{
      setIsSamePassword(false);
    }
    
  }
  //가입버튼 눌렀을 때
  const submit = (e) => {
    e.preventDefault(); //기본 제출 막기
    const isIdValid = validateUsername(); //id 유효성 통과하는지
    const isNickValid = validateUserNick(); //닉네임 유효성 통과하는지
    //id중복체크했는지
    if(!isIdDuplicateCheck){

    }
    //email 인증했는지
    if(!isEmailCheck){

    }
    //비밀번호 길이 4자 이하인지
    if(user.userPassword.length<4){
      Swal.fire({

      })
    }
    // console.log(isIdValid);
    


    let sendUser = {
      ...user,
      muserMbti: mbtiCheckEI + mbtiCheckNS + mbtiCheckTF + mbtiCheckPJ,
    };


  };
  //중복체크 버튼 눌렀을때
  const duplicateCheck = (e) => {
    e.preventDefault();
    axios
            .get(`http://localhost:8090/duplicate/${user.username}`)
            .then((res) => {
                console.log(res);
                // Swal.fire(res.data);
            })
            .catch((err) => {
                console.log(err);
                // Swal.fire(err.response.data);
            });
  }
  //email작성후 보내기버튼 눌렀을때(이때 이메일 중복여부도 확인해주어야함.)
  const sendCode = (e) =>{
    e.preventDefault();
  }
  //email 코드입력후 인증버튼 눌렀을때
  const emailConform = (e) => {
    e.preventDefault();
  }
  //E I 라벨 눌렀을때
  const mbtiEIClick = (e, ei) => {
    e.stopPropagation();
    setMbtiCheckEI(ei);
  };
  
  //N S 라벨 눌렀을때
  const mbtiNSClick = (e, ns) => {
    e.stopPropagation();
    setMbtiCheckNS(ns);
  };
  
  //T F 라벨 눌렀을때
  const mbtiTFClick = (e, tf) => {
    e.stopPropagation();
    setMbtiCheckTF(tf);
  };
  
  //P J 라벨 눌렀을때
  const mbtiPJClick = (e, pj) => {
    e.stopPropagation();
    setMbtiCheckPJ(pj);
  };
  //function---
  return (
    
      <div style={{display: 'flex',
    alignItems: 'center',
    minHeight: '800px',
    marginTop: '60px'}}>
      <Form style={joinFormStyle}>
        <FormGroup row style={{ justifyContent: "center" }}>
          <h3 style={{ fontSize: "40px" }}>JOIN</h3>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={3}>
            아이디
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="username"
              id="username"
              maxLength={8}
              placeholder="ID를 입력하세요."
              onChange={change}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
              onClick={(e)=>duplicateCheck(e)}
            >
              중복확인
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userPassword" sm={3}>
            비밀번호
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="PASSWORD를 입력하세요."
              minLength={4}
              maxLength={12}
              onChange={change}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="user_password_check" sm={3}>
            비밀번호 확인
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="user_password_check"
              id="user_password_check"
              placeholder="PASSWORD를 한번더 입력하세요."
              minLength={4}
              maxLength={12}
              onChange={(e)=>passwordCheck(e)}
            />
          </Col>
        {isSamePassword?<span style={{fontSize:'12px',color:'green',marginLeft:'450px'}}>비밀번호가 일치합니다</span>:<span style={{fontSize:'12px',color:'red',marginLeft:'420px'}}>비밀번호가 일치하지 않습니다.</span>}
        </FormGroup>
        <FormGroup row>
          <Label for="userNickname" sm={3}>
            닉네임
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="userNickname"
              id="userNickname"
              placeholder="NICKNAME 입력하세요."
              maxLength={8}
              onChange={change}
            />
          </Col>
        </FormGroup>

        <FormGroup tag="fieldset" style={{ display: "flex", gap: "10px" }}>
          <Label for="mbti" sm={3}>
            MBTI
          </Label>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={mbtiCheckEI === "E" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiEIClick(e, "E")}
              >
                E
              </Label>
            </FormGroup>

            <FormGroup>
              <Label
                style={mbtiCheckEI === "I" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiEIClick(e, "I")}
              >
                {""}I
              </Label>
            </FormGroup>
          </div>
          <div style={{ textAlign: "center", width: "20px" }}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={mbtiCheckNS === "N" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiNSClick(e, "N")}
              >
                {""}N
              </Label>
            </FormGroup>
            <FormGroup>
              <Label
                style={mbtiCheckNS === "S" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiNSClick(e, "S")}
              >
                {""}S
              </Label>
            </FormGroup>
          </div>
          <div style={{ textAlign: "center", width: "20px" }}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={mbtiCheckTF === "T" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiTFClick(e, "T")}
              >
                {""}T
              </Label>
            </FormGroup>
            <FormGroup>
              <Label
                style={mbtiCheckTF === "F" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiTFClick(e, "F")}
              >
                {""}F
              </Label>
            </FormGroup>
          </div>
          <div style={{ textAlign: "center", width: "20px" }}>+</div>
          <div style={mbtiCheckBox}>
            <FormGroup>
              <Label
                style={mbtiCheckPJ === "P" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiPJClick(e, "P")}
              >
                {""}P
              </Label>
            </FormGroup>
            <FormGroup>
              <Label
                style={mbtiCheckPJ === "J" ? btnSelStyle : btnOrgStyle}
                check
                onClick={(e) => mbtiPJClick(e, "J")}
              >
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
              onClick={(e)=>sendCode(e)}
            >
              보내기
            </Button>
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
              onChange={change}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
              onClick={(e)=>emailConform(e)}
            >
              인증
            </Button>
          </Col>
        </FormGroup>
        <FormGroup style={{ justifyContent: "flex-end", display: "flex" }}>
          <Button
            color="dark"
            style={{
              borderRadius: "10px",
              marginRight: "40px",
              // marginTop: "25px",
              width: "100px",
              fontSize: "20px",
            }}
            type="submit"
            name="submit"
            onClick={submit}
          >
            가입
          </Button>
        </FormGroup>
      </Form>
      </div>
    
  );
};

export default Join;
