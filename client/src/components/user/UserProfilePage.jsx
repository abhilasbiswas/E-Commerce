import React from 'react';
import './UserProfilePage.css'; // import the CSS file for styling

import Products from "../products/Products"
import {BackButton} from '../common/common'

import { useNavigate } from 'react-router-dom';

const default_dp = "https://ik.imagekit.io/abhilasbiswas/default_dp.png?updatedAt=1678945306750";


export function ProfileCover(){
  return (
    <>
    <BackButton/>
        <img src={cover} alt="" className="user-cover-image" />
        
    </>
  )
}
export function ProfileInfo({self}){
  const navigate=useNavigate();

  return (
    <div className="profile-info">
      <div className="heading">
        <div className="dp-container">
          
          <img src={default_dp} alt="" className="dp" />
        </div>
        
        <p className="user-name">Creator Name</p>
        <p className="user-address">Artist, <span>Crafting</span></p>
      </div>
      <div className="user-statistics">
        <div className="statics-data">
          <p className="data-type">
            FOLLWERS
          </p>
          <p className="data">
            120
          </p>
        </div>
        <div className="statics-data">
          <p className="data-type">
            PRODUCTS
          </p>
          <p className="data">
            271
          </p>
        </div>
        <div className="statics-data">
          <p className="data-type">
            RATING
          </p>
          <p className="data">
            3.6
          </p>
        </div>
      </div>
      {!self?
        <div className="follow-buttons">
          <p className="follow">Follow</p>
          <p className="message"
              onClick={()=>{
                navigate("/message");
              }}
          >Send Message</p>
        </div>:""
      }
    </div>
  )
}

function Collection({background, name}){
  return (
    <div className="collection-container">
      <div className="bg"></div>
      <img src={background} alt="" className="collection-bg" />
      <p className="collection-name">{name}</p>
    </div>
  )
}

export function UserProfile({self}){
  return (
    <div className="user-profile-page">
        <ProfileCover/>
        <div className="user-profile-data">
        <ProfileInfo self={self}/>
      </div>
    </div>
  )
}


function Collections(){

  const bg ="https://ik.imagekit.io/abhilasbiswas/feature3.png?updatedAt=1678710427743"

  return (
    <div className="user-collections">
      <p className="collection-heading user-heading-common">
        Collection
      </p>
      <div className="collection-holder">
      <Collection background={bg} name="Winter"/>
      <Collection background={bg} name="Summer"/>
      <Collection background={bg} name="Autonum"/>
      <Collection background={bg} name="Autonum"/>
      <Collection background={bg} name="Autonum"/>
        
      </div>
    </div>
  )
}

function ProductList(){
  
  return (
    <div className="user-products">
      <p className="product-heading user-heading-common">
        Products
      </p>
      <Products nocreater/>
    </div>
  )
}

const cover ="https://ik.imagekit.io/abhilasbiswas/feature4.png?updatedAt=1678710427681"

function ProfilePage() {
  
  return (
    <div className="user-profile-page-top">
        <UserProfile/>
        <Collections/>
        <ProductList/>
    </div>
  );
}

export default ProfilePage;
