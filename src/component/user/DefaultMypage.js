import React, { useState } from "react";
import style from "../../css/user/Mypage.module.css";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const DefaultMypage = (props) => {
  //---css
  const formStyle = {
    border: "1px solid black",
    borderRadius: "15px",
    width: "750px",
    height: "auto",
    padding: "25px",
    margin: "0 auto",
    boxShadow: "5px 5px lightGray",
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "40px",
    marginBottom: "25px",
  };
  const mbtiCheckBoxStyle = {
    border: "1px solid gray",
    borderRadius: "10px",
    width: "30px",
    fontSize: "20px",
    textAlign: "center",
    paddingLeft: "0px",
  };
  const mbtiCheckBox = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const btnSelStyle = {
    ...mbtiCheckBoxStyle,
    backgroundColor: "#25B2A2",
    color: "white",
    borderColor: "#25B2A2",
  };

  const btnOrgStyle = {
    ...mbtiCheckBoxStyle,
    backgroundColor: "white",
    color: "black",
    borderColor: "gray",
  };
  //css---

  //state
  const user = useSelector((state) => state.persistedReducer.user.user);
  const token = useSelector((state) => state.persistedReducer.token.token);
  const [changeUser, setChangeUser] = useState({ ...user });
  const dispatch = useDispatch();
  const today = new Date();
  const joinDate = new Date(user.joinDate);
  const mbtiChangeDate = new Date(user.userMbtiChangeDate);
  const modifyMbtiDay = Math.floor(
    (today - mbtiChangeDate) / (1000 * 60 * 60 * 24)
  );
  const changeDay = 90 - modifyMbtiDay;
  const joinDay = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24) + 1);

  const mbti = user.userMbti;
  const arrMbti = [...mbti];
  const [isChangeEmail, setISChageEmail] = useState(false);
  // const [arrMbti, setArrMbti] = useState([...mbti]);

  const [mbtiCheckEI, setMbtiCheckEI] = useState(arrMbti[0]);
  const [mbtiCheckNS, setMbtiCheckNS] = useState(arrMbti[1]);
  const [mbtiCheckTF, setMbtiCheckTF] = useState(arrMbti[2]);
  const [mbtiCheckPJ, setMbtiCheckPJ] = useState(arrMbti[3]);
  //유효성
  const nickRegExp = /^[a-zA-Z0-9가-힣]{2,8}$/;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //수정하기 위한 정보
  //비밀번호확인값
  const [passwordCheckValue, setPasswordCheckValue] = useState("");
  //serverEmailCode
  const [serverEmailCode, setServerEmailCode] = useState("");
  //사용자가 작성한 emailCode
  const [emailCode, setEmailcode] = useState("");
  //비밀번호 일치하는지
  const [isSamePassword, setIsSamePassword] = useState(true);
  //이메일인증했는지 여부
  const [isEmailCheck, setIsEmailCheck] = useState(true);

  //emailCode값 입력할떄
  const changeEmailcode = (e) => {
    setEmailcode(e.target.value);
    if (isEmailCheck) {
      setIsEmailCheck(false);
    }
  };
  //비밀번호 확인란 입력할 때
  const passwordCheck = (e) => {
    setPasswordCheckValue(e.target.value);
    const checkPassword = e.target.value; //set사용해서 바로 값이 랜더링되지않을 수 있으므로 다른 변수에 담아 비교
    if (changeUser.userPassword === checkPassword) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  };
  //email작성후 보내기버튼 눌렀을때(이때 이메일 중복여부도 확인해주어야함.)
  const sendCode = (e) => {
    e.preventDefault();
    console.log("보내기버튼클릭");
    if (emailRegExp.test(changeUser.userEmail)) {
      axios
        .get(`http://localhost:8090/sendmail/${changeUser.userEmail}`)
        .then((res) => {
          console.log(res);
          setServerEmailCode(res.data);
          console.log("serverCode : " + res.data);
          if (res.data === "email중복") {
            Swal.fire({
              title: "Email이 중복됩니다.",
              text: "작성하신 Email을 확인해주세요.",
              icon: "warning",
            });
          } else {
            Swal.fire({
              title: "인증코드가 전송되었습니다.",
              text: "작성하신 Email을 확인해주세요.",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Email을 올바르게 작성해주세요.",
        icon: "warning",
      });
    }
  };
  //email 코드입력후 인증버튼 눌렀을때
  const emailConfirm = (e) => {
    e.preventDefault();
    if (serverEmailCode === emailCode) {
      console.log("code일치!");
      setIsEmailCheck(true);
      Swal.fire({
        title: "CODE가 일치합니다!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "CODE가 일치하지 않습니다.",
        icon: "error",
      });
    }
  };

  const mbtiEIClick = (e, ei) => {
    if (modifyMbtiDay >= 90) {
      e.stopPropagation();
      setMbtiCheckEI(ei);
    }
  };

  const mbtiNSClick = (e, ns) => {
    if (modifyMbtiDay >= 90) {
      e.stopPropagation();
      setMbtiCheckNS(ns);
    }
  };

  const mbtiTFClick = (e, tf) => {
    if (modifyMbtiDay >= 90) {
      e.stopPropagation();
      setMbtiCheckTF(tf);
    }
  };

  const mbtiPJClick = (e, pj) => {
    if (modifyMbtiDay >= 90) {
      e.stopPropagation();
      setMbtiCheckPJ(pj);
    }
  };

  //Input값이 변경될때
  const change = (e) => {
    // isSamePassword, setIsSamePassword
    // isEmailCheck, setIsEmailCheck

    console.log("input:" + e.target.value);
    setChangeUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
    if (isSamePassword) {
      if (e.target.name === "userPassword") {
        setIsSamePassword(false);
      }
    }
    if (e.target.name === "userPassword") {
      if (e.target.value == passwordCheckValue) {
        setIsSamePassword(true);
      }
    }

    if (e.target.name === "userEmail") {
      setIsEmailCheck(false);
    }
  };
  const modifyUser = (e) => {
    e.preventDefault();
    //수정전 mbti도 가지고가서 비교하던지, 여기서 비교하고 수정날짜도 업데이트해서 넘길지
    //mbti
    console.log("수정버튼누름");
    console.log(user.provider);
    let sendUser = {
      ...changeUser,
      userMbti: mbtiCheckEI + mbtiCheckNS + mbtiCheckTF + mbtiCheckPJ,
      beforeMbti: mbti,
    };
    if (!(user.provider === "" || user.provider == null)) {
      console.log("소셜로그인 경우");
      if (nickRegExp.test(changeUser.userNickname)) {
        axios
          .post("http://localhost:8090/user/modify", sendUser, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Swal.fire({
          title: "닉네임을 확인해주세요.",
          text: "닉네임은 특수문자 제외 이루어진 2~8자입니다.",
          icon: "warning",
        });
      }
    } else {
      //소셜아닐때 ( 닉네임 , 비밀번호 ,이메일 validation + email인증여부 확인)
      if (nickRegExp.test(changeUser.userNickname)) {
        if (changeUser.userPassword.length >= 4) {
          if (emailRegExp.test(changeUser.userEmail)) {
            if (isEmailCheck) {
              //서버에 값 넘기고 변경
              axios
                .post("http://localhost:8090/user/modify", sendUser, {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((res) => {
                  console.log(res);
                  dispatch({
                    type: "user",
                    payload: res.data,
                  });
                  Swal.fire({
                    title: "정보수정이 완료되었습니다.",
                    icon: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              Swal.fire({
                title: "Email을 인증을 해주세요.",
                icon: "warning",
              });
            }
          } else {
            Swal.fire({
              title: "Email을 올바르게 입력해주세요.",
              icon: "warning",
            });
          }
        } else {
          Swal.fire({
            title: "비밀번호을 확인해주세요.",
            text: "비밀번호는 4~8자로 구성되어야 합니다.",
            icon: "warning",
          });
        }
      } else {
        Swal.fire({
          title: "닉네임을 확인해주세요.",
          text: "닉네임은 특수문자 제외 이루어진 2~8자입니다.",
          icon: "warning",
        });
      }
    }
  };
  return (
    <div className={style.myProfileContainer}>
      <div className={style.sectionGr}>
        <div className={style.section}>
          <div className={style.sectionTitle}>방문</div>
          <div className={style.sectionCnt}>{user.visitCnt} 회</div>
        </div>
        <div className={style.section}>
          <div className={style.sectionTitle}>가입한지</div>
          <div className={style.sectionCnt}>{joinDay} 일</div>
        </div>
        <div className={style.section}>
          <div className={style.sectionTitle}>작성글수</div>
          <div className={style.sectionCnt}>몇 개</div>
        </div>
      </div>
      <Form style={formStyle}>
        <FormGroup row style={{ justifyContent: "center" }}>
          <h3 style={{ fontSize: "40px" }}>프로필</h3>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={3}>
            아이디
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="username"
              id="username"
              minLength={2}
              maxLength={8}
              readOnly
              defaultValue={user.username}
            ></Input>
          </Col>
        </FormGroup>
        {user.provider === "" ||
          (user.provider == null && (
            <>
              <FormGroup row>
                <Label for="userPassword" sm={3}>
                  비밀번호
                </Label>
                <Col sm={7}>
                  <Input
                    type="password"
                    name="userPassword"
                    id="userPassword"
                    defaultValue={changeUser.userPassword}
                    maxLength={8}
                    onChange={(e) => change(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="user_password_check" sm={3}>
                  비밀번호 확인
                </Label>
                <Col sm={7}>
                  <Input
                    type="password"
                    name="user_password_check"
                    id="user_password_check"
                    placeholder="PASSWORD를 한번더 입력하세요."
                    defaultValue={changeUser.userPassword}
                    maxLength={8}
                    onChange={(e) => passwordCheck(e)}
                  />
                  {changeUser.userPassword}
                </Col>
                {isSamePassword ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "green",
                      marginLeft: "450px",
                    }}
                  >
                    비밀번호가 일치합니다
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginLeft: "420px",
                    }}
                  >
                    비밀번호가 일치하지 않습니다.
                  </span>
                )}
              </FormGroup>
            </>
          ))}

        <FormGroup row>
          <Label for="userNickname" sm={3}>
            닉네임
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="userNickname"
              id="userNickname"
              defaultValue={user.userNickname}
              onChange={(e) => change(e)}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row style={{ display: "flex" }}>
          <Label sm={3}>MBTI</Label>
          <Col style={{ display: "flex" }} sm={7}>
            <div style={mbtiCheckBox}>
              <FormGroup>
                <Label
                  style={mbtiCheckEI === "E" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiEIClick(e, "E")}
                >
                  E
                </Label>
              </FormGroup>

              <FormGroup>
                <Label
                  style={mbtiCheckEI === "I" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiEIClick(e, "I")}
                >
                  {""}I
                </Label>
              </FormGroup>
            </div>
            <div style={{ textAlign: "center", width: "20px" }}>+</div>
            <div style={mbtiCheckBox}>
              <FormGroup>
                <Label
                  style={mbtiCheckNS === "N" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiNSClick(e, "N")}
                >
                  {""}N
                </Label>
              </FormGroup>
              <FormGroup>
                <Label
                  style={mbtiCheckNS === "S" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiNSClick(e, "S")}
                >
                  {""}S
                </Label>
              </FormGroup>
            </div>
            <div style={{ textAlign: "center", width: "20px" }}>+</div>
            <div style={mbtiCheckBox}>
              <FormGroup>
                <Label
                  style={mbtiCheckTF === "T" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiTFClick(e, "T")}
                >
                  {""}T
                </Label>
              </FormGroup>
              <FormGroup>
                <Label
                  style={mbtiCheckTF === "F" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiTFClick(e, "F")}
                >
                  {""}F
                </Label>
              </FormGroup>
            </div>
            <div style={{ textAlign: "center", width: "20px" }}>+</div>
            <div style={mbtiCheckBox}>
              <FormGroup>
                <Label
                  style={mbtiCheckPJ === "P" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiPJClick(e, "P")}
                >
                  {""}P
                </Label>
              </FormGroup>
              <FormGroup>
                <Label
                  style={mbtiCheckPJ === "J" ? btnSelStyle : btnOrgStyle}
                  check
                  onClick={(e) => mbtiPJClick(e, "J")}
                >
                  {""}J
                </Label>
              </FormGroup>
            </div>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}></Label>
          <Col sm={7}>
            <span> * MBTI는 90일에 한번 수정가능합니다. * </span>
            {changeDay > 0 ? (
              <span style={{ marginLeft: "20px" }}> - {changeDay} 일 </span>
            ) : (
              <span style={{ marginLeft: "20px" }}> + {-changeDay} 일 </span>
            )}
          </Col>
        </FormGroup>
        {user.provider === "" ||
          (user.provider == null && (
            <>
              <FormGroup row>
                <Label for="userEmail" sm={3}>
                  이메일
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    defaultValue={user.userEmail}
                    onChange={(e) => change(e)}
                  ></Input>
                </Col>

                <Col sm={2}>
                  <Button
                    color="white"
                    style={{ border: "1px solid black", fontWeight: "600" }}
                    onClick={(e) => sendCode(e)}
                  >
                    보내기
                  </Button>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="join_code" sm={3}>
                  인증코드
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="join_code"
                    id="join_code"
                    placeholder="인증코드를 입력하세요."
                    onChange={(e) => changeEmailcode(e)}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    color="white"
                    style={{ border: "1px solid black", fontWeight: "600" }}
                    onClick={(e) => emailConfirm(e)}
                  >
                    인증
                  </Button>
                </Col>
              </FormGroup>
            </>
          ))}
        <FormGroup style={{ justifyContent: "flex-end", display: "flex" }}>
          <Button
            color="dark"
            style={{
              borderRadius: "10px",
              marginRight: "40px",
              marginTop: "25px",
              width: "80px",
              fontSize: "20px",
            }}
            type="submit"
            name="submit"
            onClick={(e) => modifyUser(e)}
          >
            수정
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default DefaultMypage;
