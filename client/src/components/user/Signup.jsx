import React, { Component, useState } from 'react'
import "./Login.css"
import {InputField} from './Login'
import {Link} from "react-router-dom"
import axios from 'axios';
import md5 from 'md5'
import {useNavigate} from 'react-router-dom'


const logo = 'https://ik.imagekit.io/abhilasbiswas/logo.png?updatedAt=1678945307021';

export default function Signup(props) {
  const navigate = useNavigate();
  const server = process.env.REACT_APP_SERVER;
  const [data, setData] = useState({
    name:"",
    email: "",
    password: ""
  })
  function signUp(){
    // console.log("signing up...")
    axios.post(server+"signup",data)
    .then((response) => {
      if (response.data!="-1"){
        localStorage.setItem("token", response.data);
        // console.log(response.data);
        navigate("/")
      }
      else{
        
      }
    })
  }

  function setName(name) {
    data.name = name;
    setData(data)
    // console.log(data)
  }
  function setEmail(email) {
    data.email = email;
    setData(data)
    // console.log(data)
  }
  function setPassword(password) {
    data.password = md5(password);
    setData(data)
    // console.log(data)
  }
  
  return (
      <div className="login">
        {/* <div className="background">
            <img className="v1" src="assets/icons/background.png"/>
            
        </div> */}
        <div className="logo">
            <img className="logo" src={logo}/>
        </div>
        <div className="form_input">
            <InputField onChange={setName} icon="person-outline" title="Name"/>
            <InputField onChange={setEmail} icon="person-outline" title="Email"/>
            <InputField onChange={setPassword} password icon="lock-closed-outline" title="********"/>
            <input type="button" onClick={signUp} className="login_button" value="Sign Up"/>
            
        </div>
        <div className="other_option">
            <div className="line"/>
            or
            <div className="line"/>
        </div>
        <div className="social_options">
            <div className="social google">
                <img src="assets/icons/google.png"/>
            </div>
            <div className="social facebook">
                <img src="assets/icons/facebook.png"/></div>
            <div className="social insta">
                <img src="assets/icons/instagram.png"/></div>
        </div>
        <p className="signup" >
            Already have an account? <Link to="/login"><span className="sign_up_here">Log In</span></Link>
        </p>
      </div>
    )
  }
