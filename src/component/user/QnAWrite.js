import React from "react";
import { Button, Input, Label } from "reactstrap";

const QnAWrite = () => {
  return (
    <div>
      무늬는 포도
      <div>
        <Label> 문의하기</Label>
        <Label for="title">제목</Label>
        <Input type="text"></Input>
        <Label for="content">내용</Label>
        <Input type="textarea"></Input>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button color="light">취소</Button>
          <Button color="dark">문의</Button>
        </div>
      </div>
    </div>
  );
};

export default QnAWrite;
