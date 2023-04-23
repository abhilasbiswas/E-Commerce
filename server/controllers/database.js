import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import md5 from "md5";
import { Admin } from "../models/database_models.js";
import ImageKit from "imagekit";
import fs from "fs";

dotenv.config();

const client = new MongoClient(process.env.DATA_ACCESS);
export const db = client.db("ecommerce");

// SDK initialization

export const imagekit = new ImageKit({
  publicKey: process.env.IMGAEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

export async function uploadImg(file) {
  const img = new Buffer(fs.readFileSync(file.tempFilePath)).toString("base64");

  const result = await imagekit.upload({
    file: img,
    fileName: file.name,
    extensions: [
      {
        name: "google-auto-tagging",
        maxTags: 5,
        minConfidence: 95,
      },
    ],
  });
  return result.url;
}

function init_admin() {
  const admin = new Admin({
    name: "creator",
    email: "creator@admin",
    password: md5("12345"),
  });
  const index = {
    id: "img_count",
    value: 0,
  };

  const home = {
    features: ["https://ik.imagekit.io/abhilasbiswas/default_product_icon.png?updatedAt=1678945307107"],
    collections: [],
  };
  db.collection("home").insertOne({ type: "homepage", data: home });

  db.collection("register").insertOne(index)
  db.collection("admin").insertOne(admin)
}

export function generateToken() {
  const token = Math.random().toString(36).slice(2, 12);
  return md5(md5(new Date()) + token);
}
// init_admin();
export default db;
