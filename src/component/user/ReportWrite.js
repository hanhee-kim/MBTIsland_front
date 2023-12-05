import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Input } from 'reactstrap';
import { Label } from 'reactstrap';
import { Form } from 'reactstrap';
import Swal from "sweetalert2";

const ReportWrite = (props) => {
  const user = useSelector((state) => state.persistedReducer.user.user);
  const {receiveName,receiveNick} = useParams();
  const formatReceiveName = receiveName.startsWith(':') ? receiveName.substring(1) : receiveName;
  const formatReceiveNick = receiveNick.startsWith(':') ? receiveNick.substring(1) : receiveNick;

  const [note,setNote] = useState({
    sentUsername:user.username,
    sentUserNick:user.userNickname,
    noteContent: '',
    receiveUsername:formatReceiveName,
    receiveUserNick:formatReceiveNick,
    sentDate:new Date(),
    noteIsRead:'N'
})
  useEffect(() => {
    props.setIsPopup(true);
    
  }, []);

  const close = (e) => {
    e.preventDefault();
    window.close();
  };
  
  const send = (e) => {
    e.preventDefault();
    //note 보내기
    Swal.fire({
      title: "쪽지를 성공적으로 보냈습니다.",
      icon: "success",
    }).then(function () {
      window.close();
    });
  }

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
            <h3 style={{ fontSize: "40px" }}>쪽지 보내기</h3>
          </FormGroup>
          <FormGroup style={{ justifyContent: "center" }}>
            <Label for="sentUserNick" sm={3}>
              받는 이
            </Label>
            <Input type="text" name="sentUserNick" defaultValue={note.receiveUserNick} readOnly ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="noteContent" sm={3}>
              내용
            </Label>
            <Input
              type="textarea"
              name="noteContent"
              onChange={(e)=>setNote({...note,noteContent:e.target.value})}
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
            <Button color="dark" onClick={send}>
              보내기
            </Button>
          </FormGroup>
        </Form>
      </div>
  </div>
  );
};

export default ReportWrite;
