import React from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {showRatingDialog} from "../home/HomePage"

const default_dp = "https://ik.imagekit.io/abhilasbiswas/default_dp.png?updatedAt=1678945306750"
  
const server = process.env.REACT_APP_SERVER;

function Star(){

    function show(){
        showRatingDialog()
    }
    
    return (<div className="star-container"
        onClick={()=>{show()}}>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star-half"></ion-icon>
    </div>)
}


////Product List
export function ProductItem({model}){
    model.love = true;
    return (
    
        <Link  to="/product" state = {{model:model}}>
    <div className="product-item">
        <img className="product-item-image" src={model.feature_images[0]} alt="product"/>
        <div className="info">
            <p className="product-item-title">
                {model.title}
            </p>
            <p className="product-item-description">
                {model.short}
            </p>
        </div>
        <p className="product-item-price">
            ₹{model.price}
        </p>
    </div>
    </Link>)
}


export function loveIt(value, id, setLove){
    setLove(value)
    const token = localStorage.getItem("token");
    axios.post(server+"product/like",{token: token, id: id, value: value})
    .then((result)=>{
        // console.log("LOVE: ",result.data)

        if (result.data!==-1)
            localStorage.setItem("user", JSON.stringify(result.data));
        else
        setLove(!value)
        
    })
}


export default function ProductCard({model, nocreater}){
    const navigate = useNavigate();
    const [love, setLove] = React.useState(model.love);
    let [features, setFeatures] = React.useState(model.feature_images);
    
    function preview(index){
        const new_list = [...features]
        new_list[index] = features[0]
        new_list[0] = features[index]
        setFeatures(new_list)
    }
    // console.log(model.feature_images)
    // console.log(features)

    return (
        //Replace with Navigate
            
            <div className="product_card bg-shadow-card">
                <div className="feature_group">
                    {/* //HACK Implement love function for adding in favourites
                    //HACK Update user profile on update favourite
                    //HACK Check whether is in Favorite List */}
                    <ion-icon onClick={()=>{loveIt(!love, model.id, setLove)}} name={love?"heart":"heart-outline"}></ion-icon>
                    <div className="main">
                    <img className="main_img" src={features[0]} alt="image" loading='lazy'/>
                    </div>
                    {/* //HACK Add Select Preview to Main */}
                    <div className="feature_list">
                        <div className="sub">
                        <img className="sub_img" onClick={()=>{preview(1)}} src={features[1]} alt="iamge" loading='lazy'/>
    
                        </div>
                        <div className="sub">
                        <img className="sub_img" onClick={()=>{preview(2)}} src={features[2]} alt="image" loading='lazy'/>
                        </div>
                    </div>
                </div>
                
                {/* //HACK usNavigate to redirect */}
                <div className="product-nameplate">
                        <div className="info">
                            <div className='product-title-box'>

                                
                                <p className='product-title'><Link  to="/product" state = {{model:model}}><p className='product-title'>{model.title}</p></Link></p>
                                
                                <Star/>
                            </div>
                            
                            {!nocreater?
                                <div className="product-creater-container">
                                <img src={default_dp} alt="" className="creater-icon" />
                                
                                <p className='product-creater-id' 
                                onClick={()=>{
                                    navigate("/bio");
                                }}> Creator Name</p>
                                
                                </div>
                                
                                :""}

                            

                            <Link  to="/product" state = {{model:model}}>
                            <p className='product-description'>{model.short}</p>
                            </Link>
                        </div>
                        {/* <p className="product-price">₹{model.price}</p> */}
                </div>
                
            </div> 
    )
  }

