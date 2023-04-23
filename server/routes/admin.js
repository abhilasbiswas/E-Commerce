import express from 'express'

import {login, get, logout,updateHome, getCollections, createCollection, updateCollection, deleteCollection, getProducts, createProduct, updateProduct, deleteProduct} from './../controllers/admin.js';

const router = express.Router();

router.post("/login",login);
router.post("/logout",logout)
router.post("/get",get);
router.post("/home/update",updateHome);

router.post("/collections",getCollections);
router.post("/collection/create",createCollection);
router.post("/collection/update",updateCollection);
router.post("/collection/dropout",deleteCollection);

router.post("/products",getProducts);
router.post("/product/create",createProduct);
router.post("/product/update",updateProduct);
router.post("/product/dropout",deleteProduct);


export default router;