import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { urlroot } from "../../config";

const QuestionDetail = (props) => {
  const user = useSelector((state) => state.persistedReducer.user);
  const no = useParams();
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    props.setIsPopup(true);
    //console.log(no);
    const num = no.no;
    //console.log(num);
    axios
      .get(`${urlroot}/questiondetail/${num}`)
      .then((res) => {
        //console.log(res);
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
      })
      .catch((err) => {
        //console.log(err);
      });
      
  }, [no]);
  const close = (e) => {
    e.preventDefault();
    window.close();
  };
  return (
    <div>
      <div style={{ fontFamily: "GangwonEdu_OTFBoldA" }}>
        <Form
          style={{
            width: "600px",
            minHeight: "750px",
            margin: "40px auto",
            border: "1px solid gray",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <FormGroup row style={{ justifyContent: "center" }}>
            <h3 style={{ fontSize: "40px" }}>문의 내용</h3>
          </FormGroup>
          <FormGroup>
            <div>
              <div style={{ textAlign: "right" }}>
                작성일 : {formatDate(question.writeDate)}
              </div>
            </div>
          </FormGroup>
          <FormGroup style={{ justifyContent: "center" }}>
            <Label for="sentUserNick" sm={3}>
              제목
            </Label>
            <Input
              type="text"
              name="title"
              defaultValue={question.title}
              style={{ backgroundColor: "#f5f5f56b" }}
              readOnly
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="noteContent" sm={3}>
              내용
            </Label>
            <Input
              type="textarea"
              name="content"
              defaultValue={question.content}
              readOnly
              style={{
                minHeight: "250px",
                resize: "none",
                backgroundColor: "#f5f5f56b",
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <div style={{ border: "1px solid gray", margin: "25px" }}></div>
          </FormGroup>
          {question.isAnswered == "N" ? (
            <>
              <FormGroup>
                <div
                  style={{
                    fontSize: "25px",
                    minHeight: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  * 처리중 *{" "}
                </div>
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup style={{ display: "flex" }}>
                <img
                  src="/replyArrow.png"
                  alt="답글 화살표"
                  width={"30px"}
                  height={"30px"}
                ></img>
                <Label for="answer" sm={3} style={{ textAlign: "center" }}>
                  운영자 답변
                </Label>

                <Input
                  type="textarea"
                  name="answer"
                  defaultValue={answer.content}
                  readOnly
                  style={{
                    minHeight: "150px",
                    resize: "none",
                    backgroundColor: "#f5f5f56b",
                    padding:'20px',
                  }}
                >
                </Input>
              </FormGroup>
            </>
          )}
          <FormGroup
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button color="light" onClick={(e) => close(e)}>
              닫기
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default QuestionDetail;
