import {Product} from '../models/database_models.js';

import db,{uploadImg, generateToken} from "./database.js"
import {setLike} from "./user.js"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// gets
//getProducts
//#searchProducts GET method
//#getProduct(id) GET method
//like
//#review
//#rate
//getAdminProducts
//getAll
//getFilterProducts
//createAdminProduct
//updateAdminProduct
//updateProducts
//dropoutAdminProduct


function getAll(callback, err){
    db.collection("products").find({}).toArray((e, docs) => {
        if(e)
            err()
        else
            callback(docs)
    });
}

function getOne(id, callback, err){
    db.collection("products").find({id: id}).toArray((e, docs) => {
        if(e)
            err()
        else
            callback(docs)
    });
}


export const get = async (req, res) =>{

    const id = req.query.id;
    console.log("ID: ", id);
    function success(docs){
        res.send(docs)
    }

    function err(){
        res.send("-1")
    }

    res.sendFile(path.join(__dirname,"..","html","welcome.html"));
}


export const gets = async (req, res) =>{

    getAll(success, err);

    function success(docs){
        res.send(docs)
    }

    function err(){
        res.send("-1")
    }
}

export const getProducts = async (req, res) =>{

    const product_ids = req.body.products;
    getFilterProducts(product_ids, (result)=>{res.send(result)},()=>res.send("-1"))
}





export const searchProducts = async (req, res) =>{
    
    const query = [
        {
          '$search': {
            'index': 'searchProducts',
            'text': {
              'query': req.body.query,
              'path': {
                'wildcard': "*"
              },
              'fuzzy': {
                'maxEdits': 2,
              }
            },
          }
        }
      ]

    db.collection("products").aggregate(query).toArray((er,docs)=>{
        res.send(docs);
    })
}


export const like = async (req, res) =>{
    const token = req.body.token;
    const product_id = req.body.id;
    const value = req.body.value;


    setLike(token, product_id, value, liked, err);

    function liked(user){
        res.send(user)
    }
    function err(){
        res.send("-1");
    }
}



export function getAdminProducts(callback, err){
    getAll(callback, err);
}




export function getFilterProducts(product_ids, callback, failed){

    db.collection("products").find({id:{$in:product_ids}}).toArray()
    .then((result)=>{
        if(result){
            callback(result)
        }else{
            failed()
        }
    })
}



export async function createAdminProduct(p, image_files, count, success, err){
        
    const product = new Product(p);

    const c = parseInt(count);
    const feature_images = [];
    for(let i=0;i<c;i++){

        const url = await uploadImg(image_files["image"+i])
        feature_images.push(url)
    }

    product.feature_images = feature_images;
    product.id = generateToken();

    db.collection("products").insertOne(product,(err, result)=>{
        if(result) 
            success(product)
        else 
            err()
    });
}



export async function updateAdminProduct(pro, img_map, images, success, err){
    

        const product = {
                            title: pro.title,
                            short: pro.short,
                            description: pro.description,
                            price: pro.price,
                            feature_images: [],
                            tags: pro.tags
                        }

        const feature_images = [];
        var i = 0;
        for (const img of img_map){
            if (img === "__file__"){
                const url = await uploadImg(image_files["image"+i])
                i++;
                feature_images.push(url)
            }
            else{
                feature_images.push(img)
            }
        }

        product.feature_images = feature_images;
        updateProducts(pro.id, product, success, err)
}



export function updateProducts(id, data, success, err){
    console.log(data)
    db.collection("products").updateOne({id: id},{$set:data}, 
        (e, res)=>
        {
            if (e)
                err()
            else
                success();
        })
}

export function dropoutAdminProduct(id, success, err){
    db.collection("products").deleteOne({id: id},(e, res)=>{
        if(e)
            err()
        else
            success();
    })
}



