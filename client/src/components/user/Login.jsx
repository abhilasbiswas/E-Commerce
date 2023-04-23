import React, {useState } from 'react'
import "./Login.css"

import {User} from "../../models/models"
import md5 from 'md5';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {GoogleLogin} from '@react-oauth/google'

import { loadingStart, loadingStop} from '../dialog/dialog'
import {Button} from '../common/common'

const logo = 'https://ik.imagekit.io/abhilasbiswas/logo.png?updatedAt=1678945307021';

export function InputField(props) {
    return (
    <div className="container">
      <div className="input_field">
        <ion-icon name={props.icon}></ion-icon>
        <input type = {props.password?"password":"text"} onChange={(event)=>props.onChange(event.target.value)} className="field" placeholder={props.title}/>
      </div>
    </div>
    )
  }


  const server = process.env.REACT_APP_SERVER;


export default function Login(props) {
  
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate();
  
  function login(){
    // console.log("logging in...")
    axios.post(server+"user/login",data)
    .then((response) => {
      // console.log("Login response: "+response.data);
      if (response.data!=-1){
        localStorage.setItem("token", response.data);
        
        navigate("/")
      }
      else{
        alert("Please check username and passward");
      }
    })
  }

  async function login(token) {

    loadingStart();
    if (token){
      axios.post(process.env.REACT_APP_SERVER+"user/get",{token:token})
      .then((response) => {
        loadingStop();
        // console.log("token response: "+ JSON.stringify(response.data));
        if(response.data!=-1){
          const user = new User(response.data)
          // console.log("User: "+JSON.stringify(user))
          localStorage.setItem("user", JSON.stringify(user))
          navigate(-1);
          
        }else{
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      });
    }
  }

  async function googleLogin(token){
    loadingStart();
    // console.log("CREDENTIAL: ", token);
    const data = {token: token}
    axios.post(server+"user/login/google",data)
    .then((response) => {
      loadingStop();
      // console.log("Login response: ",response.data);
      if (response.data!=-1){
        localStorage.setItem("token", response.data);

        login(response.data);
      }
      else{
        alert("Please check username and passward");
      }
    })
  }


    const setEmail =(email)=>{
      data.email=email
      setData(data)
      // console.log(data)
    }
    const setPassword =(password)=>{
      data.password= md5(password);
      setData(data)
      // console.log(data)
    }
    return (
      <div className="login">
        <div className="background">
            <img className="v1" src="https://ik.imagekit.io/abhilasbiswas/background.png?"/>
        </div>
        <div className="logo">
            <img className="logo" src={logo}/>
        </div>
        <div className="login-button">
          <GoogleLogin
            useOneTap
            // auto_select
            onSuccess={response=>googleLogin(response.credential)}
            onFailure={()=>console.log("Error in login")}
          />
        </div>
      </div>
    )
  }


export let login_dialog;

export function LoginPopup(){

  const navigate = useNavigate();

  function googleLogin(token){
    loadingStart();
    // console.log("CREDENTIAL: ", token);
    const data = {token: token}
    axios.post(server+"user/login/google",data)
    .then((response) => {
      loadingStop();
      // console.log("Login response: ",response.data);
      if (response.data!=-1){
        localStorage.setItem("token", response.data);
        window.location.reload();
      }
      else{
        alert("Please check username and passward");
      }
    })
  }

  const [visible, setVisibility] = useState(false);
  login_dialog = setVisibility;

  return (
    <div className={""+(visible?"new-comment-bg":"new-comment-bg-close")} >
      <div className="comment-new ">
        <div className="login-dialog-popup-button">
          <GoogleLogin
            useOneTap
            // auto_select
            onSuccess={response=>googleLogin(response.credential)}
            onFailure={()=>console.log("Error in login")}
          />
        </div>
        <div className="comment-input-buttons">
          <Button 
          defocus 
          className="comment-cancel-button" 
          value="Cancel"
          onClick={()=>{
            setVisibility(false);
          }}
          />
          <Button className="comment-post-button" value="Continue"/>
        </div>
      </div>
    </div>
  )
}
