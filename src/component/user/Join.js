import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    userPassword: "",
    userNickname: "",
    userMbti: "",
    userEmail: "",
  });
  //비밀번호확인값
  const [passwordCheckValue, setPasswordCheckValue] = useState("");
  //serverEmailCode
  const [serverEmailCode, setServerEmailCode] = useState("");
  //사용자가 작성한 emailCode
  const [emailCode, setEmailcode] = useState("");

  const [mbtiCheckEI, setMbtiCheckEI] = useState("E");
  const [mbtiCheckNS, setMbtiCheckNS] = useState("N");
  const [mbtiCheckTF, setMbtiCheckTF] = useState("T");
  const [mbtiCheckPJ, setMbtiCheckPJ] = useState("P");
  //Id중복체크
  const [isIdDuplicateCheck, setIsIdDuplicateCheck] = useState(false);
  //비밀번호 일치하는지
  const [isSamePassword, setIsSamePassword] = useState(false);
  //이메일인증했는지 여부
  const [isEmailCheck, setIsEmailCheck] = useState(false);

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
  //Email의 유효성조건
  const validateUserEmail = () => {
    var emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegExp.test(user.userEmail);
  };

  //emailCode값 입력할떄
  const changeEmailcode = (e) => {
    setEmailcode(e.target.value);
    if (isEmailCheck) {
      setIsEmailCheck(false);
    }
  };
  //Input값이 변경될때
  const change = (e) => {
    console.log("input:" + e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (isSamePassword) {
      if (e.target.name === "userPassword") {
        setIsSamePassword(false);
      }
    }
    if (e.target.name === "userPassword") {
      if (e.target.value == passwordCheckValue) {
        setIsSamePassword(true);
      }
    }
    if (e.target.name === "username") {
      setIsIdDuplicateCheck(false);
    }
    if (e.target.name === "userEmail") {
      setIsEmailCheck(false);
    }
  };
  //비밀번호 확인란 입력할 때
  const passwordCheck = (e) => {
    setPasswordCheckValue(e.target.value);
    const checkPassword = e.target.value; //set사용해서 바로 값이 랜더링되지않을 수 있으므로 다른 변수에 담아 비교
    if (user.userPassword == checkPassword) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  };

  //중복체크 버튼 눌렀을때
  const duplicateCheck = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8090/duplicate/${user.username}`)
      .then((res) => {
        console.log(res);
        if (res.data == "사용가능") {
          Swal.fire({
            title: "사용가능한 ID입니다.",
            icon: "success",
          });
          setIsIdDuplicateCheck(true);
        } else if (res.data == "사용불가") {
          Swal.fire({
            title: "ID가 중복됩니다.",
            icon: "warning",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "ID가 중복됩니다.",
          icon: "warning",
        });
      });
  };
  //email작성후 보내기버튼 눌렀을때(이때 이메일 중복여부도 확인해주어야함.)
  const sendCode = (e) => {
    e.preventDefault();
    console.log("valiEmail" + validateUserEmail());
    if (!validateUserEmail()) {
      Swal.fire({
        title: "Email을 올바르게 작성해주세요.",
        icon: "warning",
      });
      return;
    }
    axios
      .get(`http://localhost:8090/sendmail/${user.userEmail}`)
      .then((res) => {
        console.log(res);
        setServerEmailCode(res.data);
        console.log("serverCode : " + res.data);
        if (res.data === "email중복") {
          Swal.fire({
            title: "Email이 중복됩니다.",
            text: "작성하신 Email을 확인해주세요.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "인증코드가 전송되었습니다.",
            text: "작성하신 Email을 확인해주세요.",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //email 코드입력후 인증버튼 눌렀을때
  const emailConfirm = (e) => {
    e.preventDefault();
    if (serverEmailCode === emailCode) {
      console.log("code일치!");
      setIsEmailCheck(true);
      Swal.fire({
        title: "CODE가 일치합니다!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "CODE가 일치하지 않습니다.",
        icon: "error",
      });
    }
  };
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
  //가입버튼 눌렀을 때
  const submit = (e) => {
    e.preventDefault(); //기본 제출 막기
    const isIdValid = validateUsername(); //id 유효성 통과하는지
    const isNickValid = validateUserNick(); //닉네임 유효성 통과하는지

    if (isIdValid) {
      //id유효성
      if (isNickValid) {
        //닉네임 유효성
        if (isIdDuplicateCheck) {
          //id 중복체크
          if (!user.userPassword.length < 4) {
            // 비밀번호 길이 4자 이하인지
            if (isSamePassword) {
              if (isEmailCheck) {
                let sendUser = {
                  ...user,
                  userMbti:
                    mbtiCheckEI + mbtiCheckNS + mbtiCheckTF + mbtiCheckPJ,
                };
                console.log("아무거나");
                console.log(sendUser);
                axios
                  .post("http://localhost:8090/join", sendUser)
                  .then((res) => {
                    console.log(res);
                    Swal.fire({
                      title:'가입이 완료되었습니다.',
                      icon:'success',
                    }).then(function(){
                      navigate("/login");
                    })
                    // window.location.href('/login');
                  })
                  .catch((err) => {
                    console.log("err");
                    console.log(err);
                  });
              } else {
                Swal.fire({
                  title: "이메일 인증을 해주세요.",
                  icon: "warning",
                });
              }
            } else {
              Swal.fire({
                title: "비밀번호가 일치하지 않습니다.",
                icon: "warning",
              });
            }
          } else {
            Swal.fire({
              title: "비밀번호를 확인해주세요.",
              text: "비밀번호는 4자이상작성해주세요.",
              icon: "warning",
            });
          }
        } else {
          Swal.fire({
            title: "ID가 중복됩니다.",
            icon: "warning",
          });
        }
      } else {
        Swal.fire({
          title: "닉네임을 확인해주세요.",
          text: "닉네임은 특수문자 제외 이루어진 2~8자입니다.",
          icon: "warning",
        });
      }
    } else {
      Swal.fire({
        title: "ID를 확인해주세요.",
        text: "ID는 영문 숫자로 이루어진 4~8자입니다.",
        icon: "warning",
      });
    }
  };
  //function---
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "800px",
        marginTop: "60px",
      }}
    >
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
              required
              onChange={change}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
              onClick={(e) => duplicateCheck(e)}
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
              required
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
              required
              onChange={(e) => passwordCheck(e)}
            />
          </Col>
          {isSamePassword ? (
            <span
              style={{ fontSize: "12px", color: "green", marginLeft: "450px" }}
            >
              비밀번호가 일치합니다
            </span>
          ) : (
            <span
              style={{ fontSize: "12px", color: "red", marginLeft: "420px" }}
            >
              비밀번호가 일치하지 않습니다.
            </span>
          )}
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
              required
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
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Email 입력하세요."
              required
              onChange={change}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
              onClick={(e) => sendCode(e)}
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
              required
              maxLength={8}
              onChange={(e) => changeEmailcode(e)}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
              onClick={(e) => emailConfirm(e)}
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
