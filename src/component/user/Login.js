import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import localStorage from "redux-persist/es/storage";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import { urlroot } from "../../config";

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

  // const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState({
    username: "",
    userPassword: "",
  });
  const [findForm, setFindForm] = useState({
    userEmail: "",
    type: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //function
  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user:" + user.username + "  " + user.userPassword);
  };
  //엔터 포커싱
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login(e); // Enter 키를 눌렀을 때 로그인 함수 호출
    }
  }
  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${urlroot}/login`, user)
      .then((res) => {
        console.log(res.headers.authorization);
        dispatch({ type: "token", payload: res.headers.authorization });
        console.log(res.data);
        dispatch({ type: "user", payload: res.data});
        // localStorage.setItem("token", res.headers.authorization);
        // localStorage.setItem("user",res.data);
        Swal.fire({
          title: "로그인되었습니다.",
          icon: "success",
        }).then(function () {
          navigate("/"); //main으로 이동
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "회원정보가 일치하지 않습니다.",
          icon: "error",
        });
      });
  };
  const openFind = (e, type) => {
    e.preventDefault();
    setModalType(type);
    toggle();
  };
  //비밀번호 아이디 찾기에서 보내기 눌렀을때
  const sendFindEmail = (e, type) => {
    console.log(type);
    console.log(findForm.userEmail);
    //Email의 유효성조건
    var emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegExp.test(findForm.userEmail)) {
      setFindForm({ ...findForm, type: type });
      let sendFindForm = { ...findForm };

      axios
        .post(`${urlroot}/find`, sendFindForm)
        .then((res) => {
          console.log(res);
          if (res.data === "해당 Email 존재하지 않음.") {
            Swal.fire({
              title: res.data,
              icon: "warning",
            });
          } else if (res.data === "ID전송완료") {
            Swal.fire({
              title: res.data,
              text: "전송이 완료되었습니다. Email을 확인해주세요!",
              icon: "success",
            }).then(toggle());
          } else if (res.data === "PW전송완료") {
            Swal.fire({
              title: res.data,
              text: "전송이 완료되었습니다. Email을 확인해주세요!",
              icon: "success",
            }).then(toggle());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Email을 올바르게 입력해주세요.",
        icon: "warning",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "800px",
        marginTop: "60px",
      }}
    >
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
              onChange={(e) => change(e)}
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
              onChange={(e) => change(e)}
              onKeyDown={(e)=>handleKeyPress(e)} // Enter 키 이벤트 처리
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
        <a href = {`${urlroot}/oauth2/authorization/kakao`}
            // target="_blank"
          >
            <img
              className=""
              src={"../kakao_login.png"}
              style={{ width: "183px", height: "45px" }}
              // onClick={goKakaoLogin}
              alt="kakaoLogin"
            />
          </a>
          <a
            href={`${urlroot}/oauth2/authorization/naver`}
            // target="_blank"
          >
            <img
              className=""
              src={"../naver_Login.png"}
              style={{ width: "183px", height: "45px" }}
              // onClick={goNaverLogin}
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
                setFindForm({ ...findForm, userEmail: e.target.value });
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
          <Button color="light" onClick={toggle}>
            취소
          </Button>
          <Button color="dark" onClick={(e) => sendFindEmail(e, modalType)}>
            보내기
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
