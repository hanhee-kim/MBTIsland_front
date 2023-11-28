import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

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
    marginTop: "100px",
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

  const [mbtiCheckEI, setMbtiCheckEI] = useState("E");
  const [mbtiCheckNS, setMbtiCheckNS] = useState("N");
  const [mbtiCheckTF, setMbtiCheckTF] = useState("T");
  const [mbtiCheckPJ, setMbtiCheckPJ] = useState("P");

  // const [mbti, setMbti] = useState("");
  const [arrMbti, setArrMbti] = useState([]);
  //state---
  //---function
  const change = (e) => {
    setUser({
      ...user,
      [e.target.name]: [e.target.value],
      // userMbti: arrMbti.join(""),
    });
    console.log("input:" + e.target.value);
    console.log("user" + user);
    console.log("username:" + user.username + "  " + user.userPassword);
  };
  const submit = (e) => {
    e.preventDefault();
    let sendUser = {
      ...user,
      muserMbti: mbtiCheckEI + mbtiCheckNS + mbtiCheckTF + mbtiCheckPJ,
    };
  };

  const mbtiEIClick = (e, ei) => {
    e.stopPropagation();
    setMbtiCheckEI(ei);
  };

  const mbtiNSClick = (e, ns) => {
    e.stopPropagation();
    setMbtiCheckNS(ns);
  };

  const mbtiTFClick = (e, tf) => {
    e.stopPropagation();
    setMbtiCheckTF(tf);
  };

  const mbtiPJClick = (e, pj) => {
    e.stopPropagation();
    setMbtiCheckPJ(pj);
  };
  //function---
  return (
    <div>
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
              placeholder="ID를 입력하세요."
              onChange={change}
            />
          </Col>
          <Col sm={2}>
            <Button
              color="white"
              style={{ border: "1px solid black", fontWeight: "600" }}
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
              onChange={change}
            />
          </Col>
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
              marginTop: "25px",
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
