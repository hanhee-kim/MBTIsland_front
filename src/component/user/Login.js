import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
  const [findModal, setFindModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const toggle = () => {
    //서버에 userEmail과 modalType을 전송하고 보내줌.
    setFindModal(!findModal);
  };

  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState({
    username: "",
    userPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //function
  const change = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
    // console.log("user:" + user.username + "  " + user.password);
  };
  const login = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:8090/login", user)
    //         .then(res=> {
    //             console.log(res.headers.authorization);
    //             dispatch({type:"token", payload:res.headers.authorization});
    //             navigate("/user");
    //         })
    //         .catch(err=> {
    //             console.log(err);
    //         })
  };
  const openFind = (e, type) => {
    e.preventDefault();
    setModalType(type);
    toggle();
  };
  // const goJoin = () => {
  //   navigate("/join");
  // };
  const goKakaoLogin = () => {
    Location.href = "http://www.naver.com";
  };
  const goNaverLogin = () => {};

  return (
    <div style={{display: 'flex',
    alignItems: 'center',
    minHeight: '800px',
    marginTop: '60px'}}>
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
            onClick={login}
          >
            로그인
          </Button>
        </FormGroup>
        <div style={BtnGroupStyle}>
          <button sm={4} onClick={(e) => openFind(e, "ID")} style={aTagStyle}>
            아이디 찾기
          </button>
          <button
            sm={4}
            onClick={(e) => openFind(e, "PASSWORD")}
            style={aTagStyle}
          >
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
          <a href="http://www.kakao.com" target="_blank">
            {/* <a
            href="http://localhost:8090/oauth2/authorization/kakao"
            target="_blank"
          > */}
            <img
              className=""
              src={"../kakao_login.png"}
              style={{ width: "183px", height: "45px" }}
              onClick={goKakaoLogin}
              alt="kakaoLogin"
            />
          </a>
          <a href="http://www.naver.com" target="_blank">
            {/* <a href="http://localhost:8090/oauth2/authorization/naver" target="_blank"> */}
            <img
              className=""
              src={"../naver_Login.png"}
              style={{ width: "183px", height: "45px" }}
              onClick={goNaverLogin}
              alt="naverLogin"
            />
          </a>
        </div>
      </Form>
      {/* 모달 */}
      <Modal isOpen={findModal}>
        <ModalHeader>{modalType} 찾기</ModalHeader>
        <ModalBody>
          <div row>
            <Label for="userEmail">E-Mail</Label>
            <Input
              type="text"
              name="userEmail"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              * 가입하신 이메일을 입력해주세요. 이메일로 정보를 전송해드립니다.
              *
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle}>
            보내기
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
