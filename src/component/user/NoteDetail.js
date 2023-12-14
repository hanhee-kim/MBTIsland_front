import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from "../../css/common/common.css";
import { useParams } from 'react-router';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const NoteDetail = (props) => {
  // const user = useSelector((state) => state.persistedReducer.user.user);
  const {noteNo} = useParams();


  const [note,setNote] = useState({
      noteNo:0,
      sentUsername:'',
      sentUserNick:'',
      noteContent: '',
      receiveUsername:'',
      receiveUserNick:'',
      sentDate:'',
      noteIsRead:''
  })
  useEffect(() => {
    props.setIsPopup(true);
    // formatNo가지고 note 가져오기(더미데이터)
    setNote({
      noteNo:1,
      sentUsername:'asdf',
      sentUserNick:'asdf',
      noteContent: '노트 내용',
      receiveUsername:'123456AA7891011',
      receiveUserNick:'나',
      sentDate:'0000-00-00T00:00:00',
      noteIsRead:'N'
    })
  }, []);

  const close = (e) => {
    e.preventDefault();
    window.close();
  };

  const reWrite = (e) => {
    e.preventDefault();
    //데이터 전달
    const url = `/notewrite/${note.sentUsername}/${note.sentUserNick}`;
    window.open(
      url,
      "_blank",
      "width=650,height=700,location=no,status=no,scrollbars=yes"
      );
      window.close();
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
            <h3 style={{ fontSize: "40px" }}>받은 쪽지</h3>
          </FormGroup>
          <FormGroup style={{ justifyContent: "center" }}>
            <Label for="sentUserNick" sm={3}>
              보낸이
            </Label>
            <Input type="text" name="sentUserNick" defaultValue={note.sentUserNick} readOnly ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="noteContent" sm={3}>
              내용
            </Label>
            <Input
              type="textarea"
              name="noteContent"
              defaultValue={note.noteContent}
              readOnly
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
            <Button color="dark" onClick={reWrite}>
              답장하기
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default NoteDetail;