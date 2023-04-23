

import React, { Component } from 'react'
import "./Heading.css"

import {Link} from "react-router-dom"

export default function Heading({title,no_back, to, sticky}){

  return (
    <div  className={"head_container "+(sticky?"sticky":"")}>
      <div className="head_bg"></div>
      <p>{title}</p>
      {!no_back?<Link to={to}> <ion-icon className="arrow" name="arrow-forward-outline"></ion-icon></Link>:""}
      
    </div>
  )
}
