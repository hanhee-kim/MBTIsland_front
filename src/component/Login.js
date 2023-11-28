import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // css
  const loginFormStyle = {
    width: "550px",
    height: "450px",
    padding: "15px",
    margin: "0 auto",
    boxShadow: "5px 5px lightGray",
    border: "1px solid black",
    borderRadius: "15px",
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "200px",
  };
  const socialBtnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "70px",
    height: "60px",
    marginTop: "10px",
  };
  const BtnGroupStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "50px",
    alignItems: "center",
    height: "60px",
  };
  const aTagStyle = {
    color: "gray",
    textDecoration: "none",
    border: "none",
    backgroundColor: "white",
  };

  //state,effect,navigate...
  const [findIdModal, setFindIdModal] = useState(false);
  const idToggle = () => {
    setFindIdModal(!findIdModal);
  };
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState({
    username: "",
    userPassword: "",
  });
  // const navigate = useNavigate();
  //function
  const change = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
    console.log("user:" + user.username + "  " + user.password);
  };
  const submit = (e) => {
    e.preventDefault();
  };
  const openIdFind = (e) => {
    e.preventDefault();
    idToggle();
  };
  // const goJoin = () => {
  //   navigate("/join");
  // };
  const goKakaoLogin = () => {};
  const goNaverLogin = () => {};

  return (
    <div>
      <Form style={loginFormStyle}>
        <FormGroup row style={{ justifyContent: "center" }}>
          <h3 style={{ fontSize: "40px" }}>LOGIN</h3>
        </FormGroup>
        <FormGroup row style={{ justifyContent: "center" }}>
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
        </FormGroup>
        <FormGroup row style={{ justifyContent: "center" }}>
          <Label for="userPassword" sm={3}>
            비밀번호
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="PW를 입력하세요."
              onChange={change}
            />
          </Col>
        </FormGroup>
        <FormGroup style={{ justifyContent: "center", display: "flex" }}>
          <Button
            color="dark"
            style={{
              borderRadius: "10px",
              marginTop: "20px",
              width: "440px",
              fontSize: "20px",
            }}
            type="button"
            name="submit"
            onClick={submit}
          >
            로그인
          </Button>
        </FormGroup>
        <div style={BtnGroupStyle}>
          <button sm={4} onClick={(e) => openIdFind(e)} style={aTagStyle}>
            아이디 찾기
          </button>
          <button sm={4} onClick={idToggle} style={aTagStyle}>
            비밀번호 찾기
          </button>
          <a sm={4} href="/join" style={aTagStyle}>
            회원가입
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "440px", border: "1px solid gray" }}></div>
        </div>
        <div style={socialBtnStyle}>
          <img
            className=""
            src={"../kakao_login.png"}
            style={{ width: "183px", height: "45px" }}
            onClick={goKakaoLogin}
            alt="kakaoLogin"
          />
          <img
            className=""
            src={"../naver_Login.png"}
            style={{ width: "183px", height: "45px" }}
            onClick={goNaverLogin}
            alt="naverLogin"
          />
        </div>
      </Form>

      <Modal isOpen={findIdModal}>
        <ModalHeader>아이디 찾기</ModalHeader>
        <ModalBody>
          <div row>
            <Label for="userEmail">이메일</Label>
            <Input
              type="text"
              name="userEmail"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={idToggle}>
            보내기
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
