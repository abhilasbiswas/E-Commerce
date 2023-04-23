
import "./style.css"
import React, { Component, useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import { loadingStart, loadingStop} from '../dialog/dialog'


const error_icon = 'https://ik.imagekit.io/abhilasbiswas/wrong.jpg?updatedAt=1678945317204'
const success_icon = 'https://ik.imagekit.io/abhilasbiswas/success.png?updatedAt=1678945306753'
const empty = 'https://ik.imagekit.io/abhilasbiswas/empty.png?updatedAt=1678945306909'

export function NavHead({data}) {

  // console.log("USER DATA: ", data)

  let dp = data.dp;
  if (!dp.startsWith("http")){
    dp = process.env.REACT_APP_SERVER + dp
  }

    return (
    <div>
      <div className="nav-profile-head">
        <div className="profile_pic"><img id="nav-profile-pic" src={dp}></img></div>
        
        {
          data.logged_in?
            <div className="name">
              <p className="profile_name">{data.name}</p>
              <SmallButton onClick={data.logout} name="Log out"/>
            </div>
          :
            <SmallButton onClick={data.login} name="Log in"/>
        }
      </div>
      </div>
    )
  }

  
 export function Button({onClick, disable, defocus, value}){
  return (<div 
    onClick={onClick} 
    className={"button-common "+(!defocus?"button-container-active":"button-container-defocus")}>{value}</div>)
}


 function SmallButton(props){
  return (<div onClick={props.onClick} className={"small-button-common "+(props.disable?"button-container-disable":"button-container-active")}>{props.name}</div>)
}


export function Loading({set}){

  const [visible, setVisble] = useState(false)
  set(setVisble);

  return (
    <div className= {visible?"circular-loading-screen":"circular-loading-screen-close"}>
        <CircularProgress/>
    </div>
  )
}

export function Dialog({set}){
  const [state, setState] = useState(
    {
      message: "",
     error_msg: false,
     message_only: false,
     visible: false
    })
  const [action, setAction] = useState(null)



  function message(msg, action_name, action){
    setAction(()=>{return action})
    setState({
      message: msg,
     error_msg: false,
     message_only: true,
     visible: true,
     action_name: "",
     action_name: action_name
    })
    
  }
  function success(msg, action_name, action){
    setAction(()=>{return action})
    setState({
      message: msg,
     error_msg: false,
     message_only: false,
     visible: true,
     action_name: action_name
    })

  }
  function error(msg, action_name, action){
    setAction(()=>{return action})
    setState({
      message: msg,
     error_msg: true,
     message_only: false,
     visible: true,
     action_name: action_name
    })
  }

  function close(){
    setAction(null)
    setState({
      message: state.message,
     error_msg: state.error_msg,
     message_only: state.message_only,
     visible: false,
     action_name: ""
    })
  }

  set(message, success, error, close);



  return (
    <div className={state.visible?"common-dialog-background":"common-dialog-background-close"}>
      <div className="background"></div>
      <div className="common-dialog-body">
        {!state.message_only?
          <img src={state.error_msg?error_icon:success_icon} alt="" />:""
        }
        <p className="common-dialog-message">{state.message}</p>
        <div className= "dialog-button-container">
          <Button defocus onClick={()=>{
            close();
          }} value= "Close"/>
          {action?<Button onClick={
            ()=>{
              action();
              close();
            }
            
            } value= {state.action_name}/>:""}
        </div>
      </div>
    </div>
  )
}


export function Empty(){
  return (<div className="common-emty-box">
    <img src={empty} alt="" />
  </div>)
}


export function Chat({onClick}){
  return (
      <div className="chat-item" onClick={onClick}>
          <div className="message-direction">
            <ion-icon name="arrow-up"></ion-icon>
          </div>
          <div className="message-info">
            <p className="subject">Chat Subject</p>
            <p className="lastmsg">This is the last msg</p>
          </div>
      </div>
  )
}

export function MsgSent({msg}){
  return (
    <div className = "sent-msg-container single-msg-container">
      <p className="sent_msg common-mgs-style">{msg}</p>
    </div>
  )
}

export function MsgRecv({msg}){
  return (
    <div className="recv-msg-container single-msg-container">
      <p className="recv_msg common-mgs-style">{msg}</p>
    </div>
  )
}

export function MsgContainer(){
  return (
  <div className="messagae_container">
      <div className="all_messages">
        <MsgRecv msg="Hello"/>
        <MsgSent msg="Hi, this is test msg"/>
        <MsgSent msg="Hi, this s is test msg sjfskl slf s is test msg sjfskl slf  is test msg sjfskl slf s"/>
        <MsgRecv msg="Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello "/>
        <MsgSent msg="How's going on?"/>
        <MsgRecv msg="Hello"/>
        <MsgSent msg="Hi, this is test msg"/>
        <MsgRecv msg="Hello"/>
        <MsgSent msg="Hi, this is test msg"/>
        <MsgRecv msg="Hello"/>
        <MsgSent msg="Hi, this is test msg"/>
        <MsgRecv msg="Hello"/>
        <MsgSent msg="Hi, this is test msg"/>
      </div>
  </div>)
}
export function Sender(){
  return (
  <div className="send_container">
      <div placeholder="start typing" contentEditable="true" className="input-message">
        
      </div>
      <div className="send-button-container">
        
        <IconButton  m={0} edge={false} pt={0} aria-label="delete" size="small">
          <SendIcon  className="send-button" fontSize="small" />
        </IconButton>
      </div>
  </div>)
}

export function MessageDialog({visible,setVisible}){
  const navigate = useNavigate();
  function onSend(){
    // navigate("/inbox")
  }

  return (
    <div 
      className={visible?"common-dialog-background":"circular-loading-screen-close"} 
      onClick={()=>{setVisible(false)}}>

      <div className="background"></div>
      <div 
        className="message-dialog-body" 
        onClick={
          (e)=>{
            e.stopPropagation();
        }}>
          <p className="msg_heading">
            Send Message
          </p>
          <p className="msg_subject">Subject</p>
          <input placeholder="Type messge subject here" className="msg_subject_input msg_input" type="text" />
          <p className="msg_subject">Type your message</p>
          <textarea placeholder="Type your query..." className="msg_body_input msg_input" name="message-body" id="" cols="30" rows="10">
          
          </textarea>

        <div className="message-send-button-container">
        
        <IconButton onClick={onSend}  m={0} edge={false} pt={0} aria-label="delete" size="small">
          <SendIcon  className="send-button" fontSize="small" />
        </IconButton>
      </div>
      </div>
    </div>
  )
}


export function RateDialog({visible,setVisible}){
  const navigate = useNavigate();
  const [rate, setRate] = useState(5)
  const [updated, setUpdate] = useState(false)


  function onStar(rating){
    setRate(rating);
    setUpdate(false);
  }
  function onRatePressed(){
    if (!updated){
      loadingStart();
        
      loadingStop();
      setUpdate(true)

    }else{
      setVisible(false);
    }
  }


  const rate_color = ["rate-color-1", "rate-color-2", "rate-color-3", "rate-color-4", "rate-color-5"]

  return (
    <div 
      className={visible?"common-dialog-background":"circular-loading-screen-close"} 
      onClick={()=>{setVisible(false)}}>

      <div className="background"></div>
      <div 
        className="common-dialog-body" 
        onClick={
          (e)=>{
            e.stopPropagation();
        }}>
          <div className={updated?"rating-star-container-updated":"rating-star-container "}>
            <ion-icon name={rate>=1?"star":"star-outline"} onClick={()=>{onStar(1)}}></ion-icon>
          <ion-icon name={rate>=2?"star":"star-outline"} onClick={()=>{onStar(2)}} ></ion-icon>
          <ion-icon name={rate>=3?"star":"star-outline"} onClick={()=>{onStar(3)}} className={rate_color[rate]}></ion-icon>
          <ion-icon name={rate>=4?"star":"star-outline"} onClick={()=>{onStar(4)}} className={rate_color[rate]}></ion-icon>
          <ion-icon name={rate>=5?"star":"star-outline"} onClick={()=>{onStar(5)}} className={rate_color[rate]}></ion-icon>
        </div>
        <p className={updated?"rating-thankyou-msg-updated":"rating-thankyou-msg"}> Thank you</p>
        <input onClick={onRatePressed} className="input-rating-button" type="button" value={!updated?"Rate":"close"}/>
        </div>
    </div>
  )
}



export function Drawer({setter, children}){
    
  const [drawer,setDrawer] = useState(false)

    setter(setDrawer)

    return(
      <div 
        className={"drawer_container " + (drawer?"drawer_container_open":"drawer_container_close")}
        onClick={()=>{setDrawer(false);}}
        >
        <div className="drawer_content"
          onClick={(e)=>{
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    )
  }


  
export function BackButton(){
  const navigate = useNavigate();
  return(
  <div className="common-back-button">
      {/* <IconButton onClick={()=>navigate("/")}>
          <ArrowBackIcon color="white"/>
      </IconButton> */}
      <ion-icon id="navigation" onClick={()=>navigate(-1)}  name="arrow-back"></ion-icon>
  </div>)
}


export function FAB({action, icon}){
  return(
    <div className='floating-action-button' id='fab'>
        <Fab onClick={action}
          color="primary" aria-label="add" >
        {icon?icon:<AddIcon />}
        </Fab>
    </div>
  )
}