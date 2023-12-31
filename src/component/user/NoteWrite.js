import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { FormGroup } from "reactstrap";
import { Input } from "reactstrap";
import { Label } from "reactstrap";
import { Form } from "reactstrap";
import Swal from "sweetalert2";
import { urlroot } from "../../config";

const NoteWrite = (props) => {
  const user = useSelector((state) => state.persistedReducer.user);
  const { receiveName, receiveNick } = useParams();
  // const formatReceiveName = receiveName.startsWith(':') ? receiveName.substring(1) : receiveName;
  // const formatReceiveNick = receiveNick.startsWith(':') ? receiveNick.substring(1) : receiveNick;

  const [note, setNote] = useState({
    sentUsername: user.username,
    sentUserNick: user.userNickname,
    noteContent: "",
    receiveUsername: receiveName,
    receiveUserNick: receiveNick,
  });
  useEffect(() => {
    props.setIsPopup(true);
  }, []);

  const close = (e) => {
    e.preventDefault();
    window.close();
  };

  const send = (e) => {
    e.preventDefault();
    if (note.noteContent.length === 0) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
      });
      return;
    }
    let sendNote = {
      ...note,
      sentUsername: user.username,
      sentUserNick: user.userNickname,
    };
    //note 보내기
    axios
      .post(`${urlroot}/notewrite`, sendNote)
      .then((res) => {
        //console.log(res);
        Swal.fire({
          title: "쪽지가 발송되었습니다.",
          icon: "success",
        }).then(function () {
          window.close();
        });
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          title: "쪽지 발송이 실패했습니다.",
          icon: "error",
        }).then(function () {
          window.close();
        });
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
            <h3 style={{ fontSize: "40px" ,textAlign:'center'}}>쪽지 보내기</h3>
          </FormGroup>
          <FormGroup style={{ justifyContent: "center" }}>
            <Label for="sentUserNick" sm={3}>
              받는 이
            </Label>
            <Input
              type="text"
              name="sentUserNick"
              defaultValue={note.receiveUserNick}
              readOnly
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="noteContent" sm={3}>
              내용
            </Label>
            <Input
              type="textarea"
              name="noteContent"
              onChange={(e) =>
                setNote({ ...note, noteContent: e.target.value })
              }
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
            <Button color="light" onClick={(e) => close(e)}>
              취소
            </Button>
            <Button color="dark" onClick={(e) => send(e)}>
              보내기
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default NoteWrite;
