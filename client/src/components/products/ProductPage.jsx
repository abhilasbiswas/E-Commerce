import React, { Component, useEffect, useState} from 'react'
import Product from './Product'
import "./style.css"
import axios from 'axios'
import Nav from "../home/Nav"
import {useLocation} from 'react-router-dom'

import { loadingStart, loadingStop} from '../dialog/dialog'

export default function ProductPage(props) {


  const state = useLocation().state;
  const query = state?state.query:null;

  const [update, setUpdate] = useState(false)
  const [model, setModel] = useState([])

  useEffect(() => {
    console.log("getting products");
    if (query){
      document.getElementById("search-input-field").value = query;
      document.getElementById("logo").className = "logo2";
      document.getElementById("seach-bar-container").className = "search-bar2";
      searchProducts(query);
    }else{
      getproducts();
    }
  }, [update]);


  function searchProducts(query){
    loadingStart();
    axios.post(process.env.REACT_APP_SERVER+"product/search",{query: query})
    .then((res)=>{
      // console.log(res.data)
      loadingStop();
      if(res.data){
        setModel(res.data);
      }
    })
  }
  

  function getproducts(){
    axios.post(process.env.REACT_APP_SERVER+'product')
    .then((data) => {
      console.log(data.data)
      setModel(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const user = localStorage.getItem("user");
    let favourites = null;
    try{
        favourites = JSON.parse(user).favourites;
    }catch(e){}
    



    return (
      <>
        <Nav searchCallback={(query)=>{searchProducts(query)}} title="Products" back logged_in={localStorage.getItem("token")}/>
        <div className="product_page">
          {model.map((m, i)=>{
            m.love =favourites? favourites.includes(m.id):false;
            return <Product key={Math.floor(Math.random()*10000)} model={m} />
          })
          }
        </div>
      </>
    )
  }
