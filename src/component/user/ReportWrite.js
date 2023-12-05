import React, { useEffect, useState } from "react";
// import style from "../../css/user/Mypage.module.css";
import style from "../../css/common/common.css";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import Swal from "sweetalert2";

const ReportWrite = (props) => {
  useEffect(() => {
    props.setIsPopup(true);
    // props.setCurLocation("reportwrite");
  }, []);
  const [report, setReport] = useState({
    title: "",
    content: "",
    // writerId: "",
    isAnswered: "N",
  });
  const changeReport = (e) => {
    setReport({ ...report, [e.target.name]: [e.target.value] });
  };

  const close = (e) => {
    e.preventDefault();
    window.close();
  };
  const submit = (e) => {
    e.preventDefault();
    //데이터 전달
    Swal.fire({
      title: "문의가 등록되었습니다.",
      icon: "success",
    }).then(function () {
      window.close();
    });
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
            <Input type="text" name="title" onChange={changeReport}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="content" sm={3}>
              내용
            </Label>
            <Input
              type="textarea"
              name="content"
              onChange={changeReport}
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
            <Button color="light" onClick={close}>
              취소
            </Button>
            <Button color="dark" onClick={submit}>
              등록
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default ReportWrite;
