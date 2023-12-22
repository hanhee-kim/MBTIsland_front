import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { urlroot } from "../../config";

const SentNoteDetail = (props) => {
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

const close = (e) => {
  e.preventDefault();
  window.close();
};

useEffect(()=>{
  props.setIsPopup(true);
  let userType = "sent";
  console.log(`${urlroot}/notedetail/${noteNo}/${userType}`);
  axios
      .get(`${urlroot}/notedetail/${noteNo}/${userType}`)
      .then((res) => {
        console.log(res);
        setNote(res.data);
        // setAnswer(res.data.answer);
      })
      .catch((err) => {
        console.log(err);
      });
},[])


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
            <h3 style={{ fontSize: "40px" }}>* 보낸 쪽지 *</h3>
          </FormGroup>
          <FormGroup style={{ justifyContent: "center" }}>
            <Label for="receiveUserNick" sm={3}>
              받는이
            </Label>
            <Input type="text" name="receiveUserNick" defaultValue={note.receiveUserNick} readOnly ></Input>
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
            <Button color="dark" onClick={close}>
              닫기
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default SentNoteDetail;