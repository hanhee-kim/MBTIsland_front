import React, { useEffect, useState } from "react";
import style from "../../css/common/common.css";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";

const QnAWrite = (props) => {
  const user = useSelector((state) => state.persistedReducer.user.user);
  
  useEffect(() => {
    props.setIsPopup(true);
    // props.setCurLocation("qnawrite");
  }, []);
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    writerId: user.username,
    isAnswered: "N",
  });
  const changeQna = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
    setQuestion({...question,writerId: user.username,})
    console.log(question);
  };

  const close = (e) => {
    e.preventDefault();
    window.close();
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(question.writerId);
    console.log(user.username);
    //데이터 전달
    axios
      .post("http://localhost:8090/questionwrite",question)
      .then((res)=>{
        console.log(res);
        Swal.fire({
          title: "문의가 등록되었습니다.",
          icon: "success",
        }).then(function () {
          window.close();
        });
      })
      .catch((err)=>{
        console.log(err);
        Swal.fire({
          title: "문의 등록에 실패했습니다.",
          icon: "error",
        }).then(function () {
          window.close();
        });
      })
    
  };

  return (
    <div>
      <div style={{ fontFamily: "GangwonEdu_OTFBoldA" }}>
        <Form
          style={{
            width: "550px",
            margin: "40px auto",
            border: "1px solid gray",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <FormGroup row style={{ justifyContent: "center" }}>
            <h3 style={{ fontSize: "40px" }}>문의하기</h3>
          </FormGroup>
          <FormGroup style={{ justifyContent: "center" }}>
            <Label for="title" sm={3}>
              제목
            </Label>
            <Input type="text" name="title" onChange={(e)=>changeQna(e)}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="content" sm={3}>
              내용
            </Label>
            <Input
              type="textarea"
              name="content"
              onChange={(e)=>changeQna(e)}
              style={{ minHeight: "250px", resize: "none" }}
            ></Input>
          </FormGroup>
          <FormGroup
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button color="light" onClick={(e)=>close(e)}>
              취소
            </Button>
            <Button color="dark" onClick={(e)=>submit(e)}>
              등록
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default QnAWrite;
