import {RateDialog, Button} from '../common/common'
import React, { useEffect, useState } from 'react'
import "./ProductView.css"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "../home/Nav";
import Slider from "react-slick";
import {loveIt} from "./Product";
import axios from 'axios';
import Fab from '@mui/material/Fab';
import {LoginPopup, login_dialog} from "../user/Login"
import { loadingStart,dialogMsg, loadingStop, dialogError, dialogSuccess, dialogClose} from '../dialog/dialog'

import follow from '../../assets/images/follow.png'

const default_dp = "https://ik.imagekit.io/abhilasbiswas/default_dp.png?updatedAt=1678945306750";
const server = process.env.REACT_APP_SERVER;
let ratingDialog;

function Rating(props){
    return (
    <div className="rating-card" 
    onClick={ratingDialog}>
        <div className="stars">
            {props.rating}<ion-icon name="star"></ion-icon>                                             
        </div>
        <p>{props.count}</p>
    </div>
    )
}

function Carousal(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };
    return (
      <div className="carousal-container">
        <Slider {...settings}>
        { props.feature_images.map((img,i)=>{
            return (
            <div key = {i}>
                <div className="carousal-item-container ">
                    <div className="product_img bg-shadow-card">
                        <img className="main_img" src={img}/>
                    </div>
                </div>
            </div>
            )
        }) }
        
        
        </Slider>
      </div>
    );
  }


let writeNewComment;
function CommentSection({comments}){
  return (
    <div className="comment-section">
      <CommentHeader count={comments.length}/>
      
      {
        comments.length!=0?(<>
      <CommentBlock dp={default_dp} name={"User Name 1"} comment={"this is a test comment"}/>
      <CommentBlock dp={default_dp} name={"User Name 2"} comment={"this is a test comment. Hi This my reviw of the product."}/></>)
      :<WriteComment/>
      }
      <NewComment/>

    </div>
  )
}
function CommentHeader({count}){
  return (
    <div className='comment-header'>
      <p className="comment-count">{count}</p>
      <p className="comment-heading">
        Reviews
      </p>
      <img 
      src="https://ik.imagekit.io/abhilasbiswas/comment_write_icon.png?updatedAt=1678955293080" 
      alt="" className="comment-write-icon" 
      onClick={()=>{
         writeNewComment(true);
      }}
      />
    </div>
  )
}
function CommentBlock({dp, name, comment}){
  return (
    <div className="comment-block">
      <img src={dp} alt="dp" className="comment-writer-dp" />
      <div className="comment-info">
        <p className="comment-writer-name">{name}</p>
        <p className="comment-data">{comment}</p>
      </div>
    </div>
  )
}
function WriteComment(){



  return (
    <div className="comment-write">
      <img 
      src="https://ik.imagekit.io/abhilasbiswas/comment_write_icon.png?updatedAt=1678955293080" 
      alt="" className="comment-write-icon" 
      onClick={()=>{
        writeNewComment(true);
      }}
      />
      <p className="comment-write-message">Review the product</p>
    </div>
  )
}

function NewComment(){


  const [visible, setVisibility] = useState(false);
  writeNewComment = setVisibility;

  return (
    <div className={visible?"new-comment-bg":"new-comment-bg-close"} >
      <div className="comment-new">
        <textarea placeholder="start writing..." className='comment-input' name="comment-input" id="" cols="30" rows="10"/>
        <div className="comment-input-buttons">
          <Button 
          defocus 
          className="comment-cancel-button" 
          value="Cancel"
          onClick={()=>{
            setVisibility(false);
          }}
          />
          <Button className="comment-post-button" value="Post"/>
        </div>
      </div>
    </div>
  )
}


// Tag ##############

function Tags({values}){
  const navigate = useNavigate();
  function searchProducts(query){
      navigate("/products",{state:{query: query}})
  }
  return(
    <div className="product-tag-container">
      {
        values.map((value, index)=>{
          return <p key={index} className="product-tag" onClick={()=>searchProducts(value)}> {value} </p>
        })
      }
    </div>
  )
}

// ####### Creater #######

function Creater(){
  const navigate = useNavigate();
  return(
    <div className="creater_container" onClick={()=>{
      navigate("/bio");
    }}>
      <img src={default_dp} alt="" className="creater_dp" />
      <p className="creater_name">Creator Name</p>
      <p className="followers_count">1K</p>
      <ion-icon name="add-sharp"></ion-icon>
    </div>
  )
}


export default function ProductView() {
    // console.log("Logging Consol...")
    const state = useLocation().state;
    const  model = state.model;

    const [love, setLove] = React.useState(model.love);
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    let cart = false;
    if (user){
      // console.log("USER RECEIVED: ", user)
      const carts = JSON.parse(user).carts;
      for(let i = 0; i <carts.length;i++){
        if (carts[i].product === model.id){
          cart = true;
          break;
        }
      }
    }

    const [in_cart,setCart] = useState(cart)

    function addToCart(callback){
      if(in_cart){
        navigate("/cart")
      }else{
        loadingStart();
        const token = localStorage.getItem("token");
        if(!token){
          loadingStop();
          // login_dialog(true);
          dialogMsg("Please login first", "Login", ()=>navigate("/login"))
        }
        axios.post(server+"user/addcart",{token: token, id: model.id})
        .then((result)=>{
            if (result.data!==-1){
              // console.log(result.data)
              localStorage.setItem("user", JSON.stringify(result.data));
              setCart(true)
              if(callback)
              callback()
              loadingStop()
              dialogSuccess("Added to cart successfully")
            }
        })
        .catch((error)=>{
          loadingStop()
          dialogError("Failed to add cart")
        });
      }
    }

      
    const [rate_visibility, showRating] = useState(false)
    ratingDialog = showRating;

    

    function onCartAdded(){

    }

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


    return (
      <div className="product-parent">
      <div className='product-view'>
        
        <Nav back={true} nosearch={true} />
        
        <div className="preview">
          <ion-icon onClick={
            ()=>{loveIt(!love, model.id, setLove)}} 
            name={love==true?"heart":"heart-outline"}>
          </ion-icon>
            <Carousal feature_images={model.feature_images}/>
        </div>
        
        <div className="nameplate">
          <div className="rating_and_price">
            
          <Rating 
              rating={model.rating} 
              count={model.rate_count} />
              
              <p className='product-price'>₹{model.price}</p>
          </div>
                <p className='product-title'>{model.title}</p>

            {/* <p className='product-creater-id'> @Creater</p> */}
            <Creater/>
            <p className='description'>{model.description}</p> 
            
        </div>
          <Tags values={["gift", "hanging", "wall"]}/>
            <CommentSection comments={["comment id 1", "comment id 2", "comment id 3"]}/>
          </div>

        <div  className="floating-action-button">
          <Fab color="primary" onClick={()=>addToCart(onCartAdded)}>
            {in_cart?<ion-icon name="bag-check"></ion-icon>:<ion-icon name="bag-add" color="white"></ion-icon>}
          </Fab>
        </div>
          
        <RateDialog visible={rate_visibility} setVisible={showRating}/>
        {/* <LoginPopup/> */}
      </div> 
    )
  }

