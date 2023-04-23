
import React, { Component } from 'react'
import "./Login.css"
import {InputField} from './Login'





export default class SignupOTP extends Component {
  render() {
    return (
      <div className="login">
        <div className="background">
            <img className="v1" src="assets/icons/vector 1.png"/>
            <img className="v2" src="assets/icons/vector 2.png"/>
            <img className="v3" src="assets/icons/vector 3.png"/>
        </div>
        <div className="logo">
            <img className="logo" src="assets/images/logo2.png"/>
        </div>
        <div className="form_input">
            <p className="congrats">
                Congratulations!
            </p>
            <p className="details">
                Your account has been created.<br/>
                Thank you for registering
            </p>
            <input type="button" className="login_button" value="Continue"/>
            
        </div>
        
      </div>
    )
  }
}
