import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const Login = () => {
// css
  const loginFormStyle = {
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
  const socialBtnStyle ={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "100px",
    height: "60px",
  }
  const BtnGroupStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "50px",
    alignItems: "center",
    height: "100px",
  }



  //state,effect,navigate...
  const [user,setUser] =useState({
    username : '',
    password:''
  })
  const navigate = useNavigate();
  //function
  const change = (e) => {
    setUser({...user,[e.target.name]:[e.target.value]})
    console.log("user:"+user.username+"  "+user.password);
  }
  const submit = (e) => {
    e.preventDefault();
  }
  const goJoin = () => {
    navigate("/join");
  }
  const goKakaoLogin = () => {
    
  }
  const goNaverLogin = () => {

  }

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
          <Input type='text' name='username' id='username'placeholder='ID를 입력하세요.' onChange={change}/>
        </Col>
      </FormGroup>
      <FormGroup row style={{ justifyContent: "center" }}>
        <Label for="password" sm={3}>
          비밀번호
        </Label>
        <Col sm={7}>
          <Input type='password' name='password' id='password'placeholder='PW를 입력하세요.' onChange={change}/>
        </Col>
      </FormGroup>
      <div style={socialBtnStyle}><img src={'../kakao_login.png'} style={{width:"183px",height:"45px"}} onClick={goKakaoLogin}/><img src={'../naver_Login.png'} style={{width:"183px",height:"45px"}} onClick={goNaverLogin}/></div>
      <div style={BtnGroupStyle}>
        <a  sm={4} href='/findusername'>
          아이디 찾기
        </a>
        <a sm={4} href='/findpassword'>
          비밀번호 찾기
        </a>
        <a sm={4} href='/join'>
          회원가입
        </a>
      </div>
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
            onClick={submit}
          >
            로그인
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;