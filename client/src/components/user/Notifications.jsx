import React, { Component, useState} from 'react'
import axios from 'axios'
import { Empty , Chat} from '../common/common';
import Nav from '../home/Nav'
import { loadingStart, loadingStop} from '../dialog/dialog'

import {useNavigate} from "react-router-dom";
import "./Notifications.css"

function Notification({head, text, action}){
    return (
        <div className="notification_head" onClick={action}>
            <div className="notificaiton-dot"></div>
            <p className="heading">
                {head}
            </p>
            <p className="notification-body">
                {text}
            </p>
        </div>
    )
}

export default function Notifications() {
    const navigate = useNavigate();
    function onMsgClick(){
        navigate("/message");
    }

    return (
      <div className="dark-bg">
        <Nav back nocart nosearch title="Notifications"/>
        <Notification head="Notification 1" text="notification text"/>
        <Notification head="Notification 2" text="notification text"/>
        
        {/* <Empty/> */}
      </div>
    )
}
