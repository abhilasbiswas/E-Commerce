
import {User} from "../models/database_models.js"
import db from "./database.js"
import googleOauth from './googleOauth.js';

import {getFilterProducts} from './products.js'


export const authenticate = async (req, res) => {
   db.collection("session").findOne({token: req.body.token},(err,result) => {
      
      if(result)
         res.send("SUCCESS");
      else
         res.send("-1");
   })
 }

 export const googleLogin = async (req, res) => {
   const token = req.body.token;
   let payload = null;
   
   try{
      payload = await googleOauth(token);
   }
   catch(e){
      err();
   }

   // console.log("PAYLOAD##: ",payload);
   let email = null

   if(payload)
      email = payload.email

   if (email) {
      getUserByEmail(email, newSession, newUser)
   }else{
      err()
   }

   function newUser(){
      const new_user = {
         email: email,
         name: payload.name,
         dp: payload.picture
      }
      createUser(new_user, newSession, err)
   }

   function newSession(user){
      createSession(token, user, success, err)
   }


   function success(user){
      res.send(token)
   }
   function err(){
      res.send("-1")
   }
}


export const logout = async(req, res)=>{
   const token = req.body.token;
   db.collection("session").deleteOne({token:token},(e,result)=>{
     res.send("SUCCESS")
   })
}


export const get = async (req, res) =>{
   const token = req.body.token;
   // console.log("retrieving user: "+token);

   accessUser(token,success, err)

   function success(user){
      res.send(user)
   }

   function err(){
      res.send("-1");
   }

}


export const placeorder = async(req, res) => {
   //TODO implement purchase function
   const token = req.body.token;
   const carts = req.body.carts;
   accessUser(req.body.token,
      (user) => { 
         // console.log("BUY REQUEST: ", carts)
         res.send("-1") },
      ()=> res.send("-1"));
}


export const addcart = async(req, res) => {
   const token = req.body.token;
   const product_id = req.body.id;

   accessUser(token, add, err);

   function add(user){
      let carts = user.carts;
      carts.push({product: product_id, count: 1});
      user.carts = carts;
      updateProfile(user.email,{carts: carts},success,err)

   }
   
   function success(user){
      res.send(user)
   }

   function err(){
      res.send("-1")
   }
} 



export const removeCart = async(req, res) => {
   const token = req.body.token;
   const product_id = req.body.id;

   accessUser(token, add, err);

   function add(user){
      let carts = user.carts;
      carts = carts.filter((c)=>{return c.product!==product_id})
      user.carts = carts;
      // console.log(carts, product_id);
      updateProfile(user.email,{carts: carts},success,err)

   }
   
   function success(user){
      res.send(user)
   }

   function err(){
      res.send("-1")
   }
} 



export const getFavourites = async (req, res) => {
   const favorites = req.body.favourites;
   getFilterProducts(favorites, (products)=>{
       res.send(products)
   },()=>res.send("-1"))
}

export const getCarts = async (req, res) => {
   const carts = req.body.products;
   getFilterProducts(carts, (products)=>{
       res.send(products)
   },()=>res.send("-1"))
}



//////////Internal Interface//////////////////////



function createUser(user, callback, err){
   const new_user = new User(user)
   

   db.collection("users").insertOne(new_user, (e, res)=>{
      if(e)
      err();
      else
      callback(user);
   });
}

const accessUser =async(token, callback, err) => {
   db.collection("session").findOne({token: token}, (e, entry) => {
      if(entry){
         db.collection("users").findOne({email: entry.email},(e, user)=>{
            if(user)
            callback(user);
            else{
               err();
            }
         })
      }
      else{
         err();
      }
   })
}

function createSession(token, user, callback, err){
 
   findInSession(user.email,remove, insert);

   function remove(entry){
      removeSession(user,insert,err)
   }

   function insert(){
      db.collection("session").insertOne({
         token:token,
         email: user.email
      },(e, result) => {
         if (result)
            callback(user);
         else
            err()
      });
   }
}

function removeSession(user, callback, err){
 db.collection("session").deleteOne({email: user.email},(e,res)=>{
         if(res)
            callback()
         else
            err();
      })

}

function findInSession(email, callback, err){
   db.collection("session").findOne({email: email},(e, res)=>{
      if(res)
         callback(res)
      else
         err()
   })
}


function getUserByEmail(email, callback, err) {
 db.collection("users").findOne({email:email},(e,user) =>{
       if(user)
          callback(user);
       else
          err()
    }
 );
}



export const updateUser = async(req, res) => {
   const token = req.body.token;
   const data = req.body.data;

   const update_data ={
      name: data.name,
      mobile: data.mobile,
      addresses: data.addresses
   }
   
   accessUser(token, update, err)

   function update(user){

      updateProfile(user.email, update_data, updated, err)
   }
   
   function updated(user){
      res.send(user)
   }
   function err(){
      res.send("-1")
   }
}

 
function  updateProfile(email, data, callback, err){
   
    db.collection("users").updateOne({email:email},{$set:data},(e, res)=>{
      if(e){
         err();
      }
      else{
         db.collection("users").findOne({email:email},(e, res)=>{
            if(res){
               callback(res);
            }
            else{
               err();
            }
         })
      }
    })
 }

 export function setLike(token, product_id, value, callback, err){
    accessUser(token, like, err);

    function like(user){
      
      let favourites = user.favourites;

      if(value)
         favourites.push(product_id);
      else{
         favourites = favourites.filter(m=>{return m!== product_id});
      }

      updateProfile(user.email, 
         {favourites: favourites}, 
         ()=>callback(user), err);
      
   }
 }