import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Form
} from 'reactstrap';
import Swal from "sweetalert2";
import axios from 'axios';
import { urlroot } from "../../config";

const ReportWrite = (props) => {
  // 신고 정보 props
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const serializedReportData = urlParams.get('data');
  const reportData = JSON.parse(decodeURIComponent(serializedReportData));

  const [report,setReport] = useState(reportData);
  
  useEffect(() => {
    props.setIsPopup(true);
  }, []);

  const close = (e) => {
    e.preventDefault();
    window.close();
  };
  
  const sendReport = () => {
    let defaultUrl = `${urlroot}/report`;
    axios.post(defaultUrl, report)
    .then(res=> {
      Swal.fire({
        title: "신고 완료",
        icon: "success",
      }).then(function () {
        window.close();
      });
    })
    .catch(err=> {
      //console.log(err);
      Swal.fire({
        title: "신고 실패",
        icon: "fail",
      }).then(function () {
        window.close();
      });
    });
  };

  // const changeReportReason = (e) => {
  //   //console.log(e.target.value);
  //   setReport({...report,reportType:e.target.value});
  // };

  useEffect(()=> {
    //console.log("신고 정보:", report);
  }, [report]);

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
            <h3 style={{ fontSize: "40px" }}>신고</h3>
          </FormGroup>
          <FormGroup style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <Label for="sentUserNick" sm={3}>
              작성자
            </Label>
            <Input type="text" name="reportedId" value={report.reportedId} readOnly style={{ width: "150px"}}></Input>
          </FormGroup>
          <FormGroup style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <Label for="reportType" sm={3}>
              신고 사유
            </Label>
            <Input
              sm={5}
              type="select"
              name="reportType"
              onChange={(e)=>setReport({...report, reportReason:e.target.value})}
              style={{ width: "150px"}}
            >
              <option value="광고">광고</option>
              <option value="도배">도배</option>
              <option value="욕설">욕설</option>
            </Input>

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
            <Button color="dark" onClick={()=>sendReport()}>
              신고
            </Button>
          </FormGroup>
        </Form>
      </div>
  </div>
  );
}

export default ReportWrite;