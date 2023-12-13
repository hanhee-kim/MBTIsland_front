import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

const OAuth2User = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { loginType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("token:" + token);
    dispatch({ type: "token", payload: token });

    localStorage.setItem("token", token);
    // // user 정보
    // axios
    // .get("http://localhost:8090/user",{
    //     headers : {
    //         Authorization : token,
    //     }
    // })
    // .then(res=> {
    //     console.log(res);
    //     console.log("data:"+res.data);
    //     // setUser(res.data);
    //     dispatch({type:"user",payload:res.data});
    // })
    // .catch(err=> {
    //     console.log("user가져오기 에러");
    //     console.log(err);
    // })
    console.log("loginType : " + loginType);
    if (loginType === "join") {
      navigate("/addjoin");
    } else {
      navigate("/");
    }
  }, []);
};

export default OAuth2User;
