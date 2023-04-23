import React, { Component, useEffect } from 'react'
import "./ProductCart.css"
import {useNavigate} from "react-router-dom"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { loadingStart,dialogMsg, loadingStop, dialogError, dialogSuccess, dialogClose} from '../dialog/dialog'



import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const server = process.env.REACT_APP_SERVER;


function Heading() {
  const navigate = useNavigate();
  return (
    <div className="cart-head-container">
      <div className='heading_back_key'>
        <ion-icon onClick={()=>navigate(-1)}  className="arrow" name="arrow-back-outline"></ion-icon>
        <p>Shopping Bag</p>
      </div>
    </div>
  )
}


export function ItemInfo({count, shipping}) {
    return (
      <div className='item_info'>
        <h4>{count} Items</h4>
        {shipping===0?<p>Shipping:<span className='free_delivery'> Free</span></p>:""}
      </div>
    )
  }



function Quantity({count, onChange}){
  
  const [age, setAge] = React.useState(count);

  const handleChange = (event) => {
    setAge(event.target.value);
    onChange(event.target.value);
  };


  return <FormControl sx={{ m: 0, minWidth: 80, p: 0,maxHeight:50, minHeight:10 }} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label=""
        onChange={handleChange}
      >
        <MenuItem value={1}>Qty 1</MenuItem>
        <MenuItem value={2}>Qty 2</MenuItem>
        <MenuItem value={3}>Qty 3</MenuItem>
        <MenuItem value={4}>Qty 4</MenuItem>
      </Select>
    </FormControl>
}

export function ProductItem({index, cart,  onUpdateCount, onRemove}) {

  const index_i = index;



    return (
      <div className='product_item'>
        <div className="remove-product-item-container">
            <IconButton className="remove-product" aria-label="delete" size="large" onClick={
              () => {
                onRemove(index_i)
              }
              }>
              <ion-icon  color="danger" name="close-circle"></ion-icon>
            </IconButton>
        </div>

        <div className="icon">
            <img className="icon_img" src={cart.product.feature_images[0]}/>
        </div>
        <div className="info">
            <p className="title">{cart.product.title}</p>
            <p className="short_description">{cart.product.short}</p>
                
            <div className="price-card">
                <p>₹{cart.product.price * cart.count}</p>
                <Quantity count={cart.count} onChange={(count)=>onUpdateCount(index_i, count)}/>
            </div>
        </div>
      </div>
    )
  }

  

export function Address({address,id}) {
    return (
      <div className='address'>
        <div className="radio">
        <FormControlLabel value={id} control={<Radio />} label="" />
            {/* <input type="radio" /> */}
        </div>
        <div className="info">
            <div className="address_name">
                {address.type}
            </div>
            <div className="line">
                {address.line1}
            </div>
            <div className="line">
                {address.line2}
            </div>
            <div className="line">
                Ph: {address.mobile} , PIN: {address.pin}
            </div>
            <div className="line">
                {address.district} , {address.state}
            </div>
            
        </div>
      </div>
    )
  }


export function AddressList(){
  const user_info = localStorage.getItem("user");
  let addresses = [];
  if (user_info){
    const user = JSON.parse(user_info)
    addresses = user.addresses?user.addresses:[];
  }
    return (
      <div className="address_list">
        <h3>Select Address</h3>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={0}
          name="radio-buttons-group"
        >
        {
          addresses.map((address, i) =>{
            return <Address key={i} id={i} address={address}/>
          })
        }
        
        </RadioGroup>
        
      </div>
    )
  }

export function PriceSummery({total, shipping}){
    return (
      <div className='price_summery'>
        <div className="type">Subtotal</div>
        <div className="price">₹{total}</div>
        <div className="type">Shipping</div>
        <div className="price">₹{shipping}</div>
        <div className="type">Total</div>
        <div className="price">₹{total+shipping}</div>
        
      </div>
    )
  }


export function Checkout({total, checkout}) {
    return (
      <div>
        <div className='checkout'>
          <p className='checkout_price'>Pay ₹{total}</p>
          <div className="checkout_price"></div>
        </div>
      
        <div className='checkout2'>
          <p></p>
          <p id="checkout-button" onClick={checkout}  className='checkout_text'>CHECKOUT</p>
        </div>
      </div>
    )
  }





export default function ProductCart(){

  
  const [my_carts, setCart] = React.useState([]);
  const [update, setUpdate] = React.useState(false)

  const navigate = useNavigate();
  
  useEffect(()=>{
    if (update) 
    return;
     
    const user = JSON.parse(localStorage.getItem("user"));
    const carts = user.carts;
    const products_ids = [];
    carts.forEach((p) => products_ids.push(p.product))

    axios.post(server+"user/carts", {products: products_ids})
    .then(res => {
      setUpdate(true);
      const cart_items = [];
      res.data.forEach((product, i)=>cart_items.push({product: product, count: carts[i].count}));
      setCart(cart_items);
    })
  });


  //TODO process in backend
  function onUpdateCount(index, count){
    const new_carts = [...my_carts]
    new_carts[index].count = count;
    setCart(new_carts)
  }

  let total = 0;
  let shipping = 40;

  my_carts.forEach((cart)=>total += cart.product.price*cart.count)

  if (total >500)
  shipping = 0

  

  function removeCart(cart_id, callback){
      loadingStart()
      const token = localStorage.getItem("token");
      if(!token){
        loadingStop();
        dialogMsg("Please login first", "Login", ()=>navigate("/login"))
      }
      axios.post(server+"user/removecart",{token: token, id: cart_id})
      .then((result)=>{
          if (result.data!==-1){
            localStorage.setItem("user", JSON.stringify(result.data));

            if(callback)
            callback()
            loadingStop()
          }
      })
      .catch((error)=>{
        loadingStop()
        dialogError("Failed to remove cart")
      });
    }

  function requestBuy(){
      loadingStart();
      document.getElementById("checkout-button").className = "checkout_text-active"
      const token = localStorage.getItem("token");
      const data = {token: token, carts: my_carts}
      axios.post(process.env.REACT_APP_SERVER+"user/placeorder", data)
      .then(res => {
        loadingStop()
        if(res.data!="-1"){

        }else{
          dialogError("The site is under construction. Thanks for your interest")
          document.getElementById("checkout-button").className = "checkout_text"
        }
      })

  }
  function onRemove(index){
    dialogMsg("Do you wanto remove from cart?", "Remove", ()=>{
        
        removeCart(my_carts[index].product.id,()=>{
            const new_carts = [...my_carts]
            new_carts.splice(index, 1)
            setCart(new_carts)
        })
    })
  }

    return (
        <div className='product_cart'>
          
        
          <Heading/>
          <ItemInfo count={my_carts.length} shipping={shipping}/>

          {
              my_carts.map((cart, i) => {
              return (<ProductItem  key={i} onRemove={onRemove} index={i} onUpdateCount={onUpdateCount} cart={cart}/>)
            })
          }

          <AddressList/>
          <div className="space"/>
          <div className="fix">
              <PriceSummery total={total} shipping={shipping}/>
              <Checkout total={total} checkout={requestBuy}/>
          </div>
        </div>
    )
  }

