import React, { Component, useState} from 'react'
import axios from 'axios'
import { Empty , Chat} from '../common/common';
import Nav from '../home/Nav'
import { loadingStart, loadingStop} from '../dialog/dialog'

import {useNavigate} from "react-router-dom";



export default function Inbox() {
    const navigate = useNavigate();
    function onMsgClick(){
        navigate("/message");
    }

    return (
      <div className="dark-bg">
        <Nav back nosearch title="Inbox"/>
        <Chat onClick={onMsgClick}/>
        <Chat onClick={onMsgClick}/>
        <Chat onClick={onMsgClick}/>
        <Chat onClick={onMsgClick}/>
        
        {/* <Empty/> */}
      </div>
    )
}
