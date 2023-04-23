import {Collection} from '../models/database_models.js';
import {db, uploadImg, generateToken} from "./database.js"
import { getProducts } from './products.js';
import fs from 'fs'





export const gets = async (req, res) =>{
    getAll(success, err);

    function success(docs){
        res.send(docs)
    }

    function err(){
        res.send("-1")
    }
}

export const getCollectionProducts = async (req, res)=>{
    getProducts(req, res)
}

export function getAdminCollections(callback, err){
    getAll(callback, err);
}

function getAll(callback, err){
    db.collection("collections").find({}).toArray((e, docs) => {
        if(e)
            err()
        else
            callback(docs)
    });
}


export async function createAdminCollection(coll, image, success, err){
    
    const collection = new Collection(coll);

    collection.feature_image = await uploadImg(image);
    collection.id = generateToken();

    console.log(collection);
    db.collection("collections").insertOne(collection,(err, result)=>{
        if(result) 
            success(collection)
        else 
            err()
    })
}

export async function updateAdminCollection(coll, image, success, err){
    
    const collection = new Collection(coll);

    if (image){
        collection.feature_image = await uploadImg(image);
    }
    updateCollection(collection.id, collection, success, err)
}

export function updateCollection(id, data, success, err){
    db.collection("collections").updateOne({id: id},{$set:data}, 
        (e, res)=>
        {
            if (e)
                err()
            else
                success();
        })
}

export function dropoutAdminCollection(id, success, err){
    db.collection("collections").deleteOne({id: id},
        (e, res)=>
        {
            if(e)
                err()
            else
                success();
        })
}


