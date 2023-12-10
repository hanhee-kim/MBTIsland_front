import {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import {useDispatch} from 'react-redux';

const OAuth2User = () => {
    const dispatch = useDispatch();    
    const {token} = useParams();
    const {loginType} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        console.log("token:"+token);
        dispatch({type:"token", payload:token})
        console.log("loginType : "+loginType);
        if(loginType === "join"){
          navigate("/addjoin");
        } else{
          navigate("/");
        }
    }, [])
} 

export default OAuth2User;