import React, { Component, useState, useEffect} from 'react'

import SearchBar from './SearchBar'
import Heading from "./Heading"
import Collections from "../collections/Collections"
import Products from "../products/Products"
import Nav from "./Nav"
import Menu from "./Menu"
import Slider from 'react-slick'
import "./style.css"

import {CollectionCard} from '../collections/CollectionCard'
import CollectionModel from '../../data/model/CollectionModel'
import axios from 'axios'
import {User} from "../../models/models"
import Fab from '@mui/material/Fab';
import ModeIcon from '@mui/icons-material/Mode';
import {useNavigate} from 'react-router-dom'

import { blue } from '@mui/material/colors';

import { googleLogout } from '@react-oauth/google';

import { loadingStart, loadingStop} from '../dialog/dialog'
import {MessageDialog, RateDialog} from "../common/common"


export function showRatingDialog(){
  ratingDialog(true)
}

let ratingDialog;


function Features({features}) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed:2000,
    };
  return (
    <div className='home-feature-carousal'>
      <Slider {...settings}>
        {
          features.map((m,i)=>{
            return (
              <div key={i}>
                <div className="home-feature-container">
                <img className="home-feature-image" src={m} alt="feature" loading='lazy'/>
                </div>
              </div>
            )
          })
        }
        
      </Slider>
    </div>
    );
}


function CollectionList({collections}) {


  return (
    <div className='home-collections bg-shadow-card'>
      {
        collections.map((m,i)=>{
        return (<div key={i}><CollectionCard model = {m}/></div>)
        })
      }
      
    </div>
  )

}

async function login(setLoggedin) {
  const token = localStorage.getItem('token');
  if (token){
    axios.post(process.env.REACT_APP_SERVER+"user/get",{token:token})
    .then((response) => {
      // console.log("token response: "+ JSON.stringify(response.data));
      if(response.data!=-1){
        const user = new User(response.data)
        // console.log("User: "+JSON.stringify(user))
        localStorage.setItem("user", JSON.stringify(user))

        setLoggedin(true);
        
      }else{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        googleLogout();
        setLoggedin(false);
      }
    });
  }
}

const server = process.env.REACT_APP_SERVER;

export default function HomePage(props) {
    const [loggedin, setLoggedin] = useState(false)
    const [home, setHome] = useState({features:[], collections:[]})

    useEffect(()=>{
      // console.log("checking....",server+"home")
      if (!loggedin) {
        login(setLoggedin)
      }

      if (home.features.length===0) {
        loadingStart();
        axios.post(server+"home")
        .then((response) => {
          loadingStop();
          // console.log("Response: ",response.data)
          setHome(response.data)
        })
      }
    })
    
    const navigate = useNavigate();
    function searchProducts(query){
          navigate("/products",{state:{query: query}})
    }

    const [vx, show] = useState(false);
    const [rate_visibility, showRating] = useState(false)
    ratingDialog = showRating;

    return (
      <div className="parent-home-page">
      <div className='home-page'>
        <Nav searchCallback={searchProducts}/>
        <Features features={home.features}/>
        <Heading sticky title="Pick from Collections" to = "/collections"/>
        <CollectionList collections={home.collections}/>
        <Heading sticky title="Trending" to="/products"/>
        <Products/>
        
        <MessageDialog visible={vx} setVisible={show}/>
        <RateDialog visible={rate_visibility} setVisible={showRating}/>
      </div>

      {loggedin?
        <div className='floating-action-button'>
          <Fab color="primary" onClick={()=>{
            show(true)
            
            }}>
            <ModeIcon sx={{ color: blue[50] }}/>
          </Fab>
        </div>:""
      }
      </div>
    )
  }

