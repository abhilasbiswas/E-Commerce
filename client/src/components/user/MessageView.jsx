import React, { Component, useState} from 'react'
import axios from 'axios'
import { Empty , MsgSent, MsgRecv, MsgContainer, Sender} from '../common/common';
import Nav from '../home/Nav'
import { loadingStart, loadingStop} from '../dialog/dialog'





export default function MessageView() {

    return (
      <div className="dark-bg message-view-page">
        <Nav nocart back nosearch title="Message"/>
            <div className="message_box">
                <MsgContainer/>
                <Sender/>
            </div>
        {/* <Empty/> */}
      </div>
    )
}
