import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { urlroot } from "../../config";

const AddJoin = () => {
  //css
  const addJoinFormStyle = {
    width: "700px",
    height: "auto",
    padding: "15px",
    margin: "0 auto",
    boxShadow: "5px 5px lightGray",
    border: "1px solid black",
    borderRadius: "15px",
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "200px",
    marginBottom:"200px"
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
  //state,effect,...
  const token = useSelector((state) => state.persistedReducer.token);
  const user = useSelector((state) =>  state.persistedReducer.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailCode, setEmailCode] = useState("");

  const [mbtiCheckEI, setMbtiCheckEI] = useState("E");
  const [mbtiCheckNS, setMbtiCheckNS] = useState("N");
  const [mbtiCheckTF, setMbtiCheckTF] = useState("T");
  const [mbtiCheckPJ, setMbtiCheckPJ] = useState("P");
  useEffect(()=>{
    console.log(token);
  },[])
  //function
  const addJoin = (e) => {
    e.preventDefault();
    const userMbti= mbtiCheckEI + mbtiCheckNS + mbtiCheckTF + mbtiCheckPJ;
    
    axios
    .get(`${urlroot}/guest/${userMbti}`,{
      headers : {
        Authorization : token,
      }
    })
    .then(res=> {            
      console.log(res);
      console.log("data:"+res.data);
      // setUser(res.data);
      dispatch({type:"user",payload:res.data});
      console.log(user.userMbti);
      navigate("/");
    })
    .catch(err=> {
      console.log("user가져오기 에러");
      console.log(err);
    })
  };
  // const change = (e) => {
  //   setUser({ ...user });
  //   console.log("user:" + user.userMbti + "email:" + user.userEmail);
  // };
  // const codeChange = (e) => {
  //   setEmailCode(e.target.value);
  //   console.log(emailCode);
  // };
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

  return (
    <div>
      <Form style={addJoinFormStyle}>
        <FormGroup row style={{ justifyContent: "center" }}>
          <h3 style={{ fontSize: "40px" }}>ADD</h3>
        </FormGroup>
        <FormGroup>
          <Label sm={12} style={{textAlign:'center'}}>
            * 필수입력 정보 미추가시 정상 이용이 불가합니다. *
          </Label>
        </FormGroup>
        <FormGroup tag="fieldset" style={{ display: "flex", gap: "10px" }} row>
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
        {/* <FormGroup row>
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
        </FormGroup> */}

        <FormGroup style={{ justifyContent: "flex-end", display: "flex" }}>
          <Button
            color="dark"
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
