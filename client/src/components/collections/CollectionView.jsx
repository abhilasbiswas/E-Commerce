import React, { Component, useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import Nav from "../home/Nav"
import Product from "../products/Product"
import './CollectionView.css'
import Heading from "../home/Heading"
import axios from 'axios'
 
export default function CollectionView(props) {
    const state = useLocation().state;
    
    const model = state.model;
    // console.log(model)
    const server = process.env.REACT_APP_SERVER;
    const [products, setProducts] = useState([]);

    useEffect(() => {
      if (products.length>0) {
        return;
      }
      axios.post(server+"collection/products", {
        products: model.products})
        .then(res => {
          setProducts(res.data);
        })
    });

    const user = localStorage.getItem("user");
    let favourites = null;
    try{
        favourites = JSON.parse(user).favourites;
    }catch(e){
      favourites=[];
    }
    


    return (
      <div>
        <Nav back nosearch />
        <img className="collection-view-banner" src={model.feature_image} alt="" />
        
        <Heading sticky no_back title={model.title} to="/products"/>
        {products.map((product,i)=>{
          product.love =favourites? favourites.includes(product.id):false;
          return <Product key={i} model={product}/>
          })}
    
      </div>
    )
}
