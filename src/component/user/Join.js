import React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";

const Join = () => {
  const joinFormStyle = {
    border: "1px solid black",
    width: "750px",
    height: "850px",
    padding: "15px",
  };
  return (
    <div>
      <Form style={joinFormStyle}>
        <FormGroup row>
          <h3>JOIN</h3>
        </FormGroup>
        <FormGroup row>
          <Label for="join_id" sm={2}>
            아이디
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="join_id"
              id="join_id"
              placeholder="ID를 입력하세요."
            />
          </Col>
          <Col sm={2}>
            <Button>중복확인</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="join_password" sm={2}>
            비밀번호
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="join_password"
              id="join_password"
              placeholder="PASSWORD를 입력하세요."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examSelect" sm={2}>
            Select
          </Label>
          <Col sm={10}>
            <Input type="select" name="select" id="examSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examText" sm={2}>
            TextArea
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="textarea" id="examText" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examFile" sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" id="examFile" />
            <FormText color="muted">
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Radio Buttons</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />
              {""}
              Option one is this and that-be sure to include why it's great
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />
              {""}
              Option two can be somethis else and selecting it will deselect
              option one
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" disabled />
              {""}
              Option three is disabled
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> Check me out
          </Label>
        </FormGroup>

        <Button type="submit" name="submit">
          제출
        </Button>
      </Form>
      <br />
      <br />
      {/* <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examEmail2" className="mr-sm-2 ">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="examEmail2"
            placeholder="something@kosta.com"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examPassword2" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examPassword2"
            placeholder="don't tell !"
          />
        </FormGroup>
      </Form> */}
    </div>
  );
};

export default Join;
