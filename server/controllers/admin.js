
import {db, uploadImg, generateToken} from "./database.js"
import fs from 'fs'
import { createAdminCollection, getAdminCollections, updateAdminCollection, dropoutAdminCollection} from "./collections.js";
import { createAdminProduct, getAdminProducts, updateAdminProduct, dropoutAdminProduct} from "./products.js";




 //TODO remove existing login token
 export const login = async(req, res) => {
   const admin = req.body;
   // console.log(admin)

   db.collection("admin").findOne(admin, (er, result)=>{
      if (result){
         db.collection("admin_session").deleteOne({
            email: admin.email
         },(e, r)=>{
            if (e){
               err();
            }
            else{
               const token = generateToken();
               db.collection("admin_session").insertOne({
                  token: token,
                  email: admin.email
               }, (er, result)=>{
                  res.send(token);
               })
            }
            
         })
      }
      else{
         err();
      }
   })

   function err(){
      res.send("-1")
   }
 }

 export const logout = async(req, res)=>{
   const token = req.body.token;
   db.collection("admin_session").deleteOne({token: token},(err, result)=>{
      if(result){
         res.send("SUCCESS");
      }
      else{
         res.send("-1");
      }
   });
}

export const get = async(req, res) => {
   const token = req.body.token;
   db.collection("admin_session").findOne({token: token},handle);

   function handle(er, entry)
   {
      if (entry){
         const email = entry.email;
         success(email);
      }
      else{
         err();
      }
   }

   function success(email){
      db.collection("admin").findOne({email: email},(er,admin)=>{
         if (admin){
            res.send({
               name: admin.name,
               email: admin.email,
               dp: admin.dp
            });
         }else{
            err();
         }
      });
   }
   function err(){
      res.send("-1");
   }
}


export const updateHome = async (req, res) =>{

authenticate(req.body.token, async ()=>{
   
   const count = parseInt(req.body.count);
   // console.log(req.body.collections,"Collection ID")
   

   const feature_images = [];
   for(let i=0;i<count;i++){
      var url;
      if(req.files){
         if (req.files["feature"+i]){
            url = await uploadImg(req.files["feature"+i])
         }
         else{
            url = req.body["feature"+i]
         }
      }
      else{
         url = req.body["feature"+i]
      }
      feature_images.push(url)
   }

   const home = {
      features: feature_images,
      collections: JSON.parse(req.body.collections)
   }

   db.collection("home").replaceOne(
      {type: "homepage"},
      {type: "homepage",
         data: home}, 
         (err, data) => 
         {
         // console.log(data);
         if (data)
            res.send("SUCCESS");
         else
            res.send("-1");
         }
      );
   },()=>{
      res.send("-1");
   })
}


  export const getCollections = async (req, res) =>{
      const token = req.body.token;
      authenticate(token, get, err)

      function get(){
         getAdminCollections(success, err);
      }

      
      function success(docs){
         res.send(docs)
     }
 
     function err(){
         res.send("-1")
     }
  }

  export const createCollection = async(req, res) =>{

      const token = req.body.token;
      authenticate(token, create, err)

      async function create(){
         let collection = null;

         try{
            collection = JSON.parse(req.body.collection);
            await createAdminCollection(collection,req.files.image, success, err)
         }catch(e){
            err();
         }

      }
      function success(collection){
         res.send(collection)
      }
      function err(){
         res.send("-1")
      }
  }


  export const updateCollection = async (req, res) =>{
      const token = req.body.token;

      const image = req.files?req.files.image: null;

      authenticate(token, update, err)

      async function update(){
         let collection = null;
         try{
            collection = JSON.parse(req.body.collection);
            
            await updateAdminCollection(collection, image, success, err)
         }catch(e){
            err();
         }

      }
      function success(){
         res.send("SUCCESS");
      }
      function err(){
         res.send("-1")
      }
  }
  export const deleteCollection = async(req , res) =>{
   const token = req.body.token;
   authenticate(token, dropout, err);

   function dropout(){
      const id = req.body.id;
      dropoutAdminCollection(id, success, err)
   }
   function err(){
      res.send("-1")
   }
   function success(){
      res.send("SUCCESS")
   }
   function err(){
      res.send("-1")
   }
  }


  export const getProducts = async (req, res) =>{
      const token = req.body.token;
      authenticate(token, get, err)

      function get(){
      getAdminProducts(success, err);
   }

   
   function success(docs){
      // console.log(docs)
      res.send(docs)
  }

  function err(){
      res.send("-1")
  }
}

export const createProduct = async(req, res) =>{

   const token = req.body.token;
   const count = req.body.count;

   console.log("Count: ",count)
   authenticate(token, create, err)

   async function create(){
      let product = null;

      try{
         product = JSON.parse(req.body.product);
         
         await createAdminProduct(product, req.files, count, success, err)

      }catch(e){
         err();
      }
   }
   function success(product){
      res.send(product)
   }
   function err(){
      res.send("-1")
   }
}

  export const updateProduct = async (req, res) =>{
      const token = req.body.token;
      const img_map = JSON.parse(req.body.img_map);
      
      const image_files = req.files?req.files: null;
      const product = JSON.parse(req.body.product);
            
      authenticate(token, update, err)

      async function update(){
         try{
            await updateAdminProduct(product, img_map, image_files, success, err)
         }catch(e){
            err();
         }

      }
      function success(){
         res.send("SUCCESS")
      }
      function err(){
         res.send("-1")
      }
  }
  export const deleteProduct= async(req , res) =>{
      const token = req.body.token;
      authenticate(token, dropout, err);

      function dropout(){
         const id = req.body.id;
         dropoutAdminProduct(id, success, err)
      }
      function err(){
         res.send("-1")
      }
      function success(){
         res.send("SUCCESS")
      }
      function err(){
         res.send("-1")
      }
  }

   
export async function authenticate(token, callback, err){
   db.collection("admin_session").findOne({
       token: token
   },(e, result)=>{
       if (result){
           callback();
       }else{
           err();
       }
   })
}