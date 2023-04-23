import express from 'express'

import {authenticate, googleLogin, logout, get, placeorder, addcart, removeCart,updateUser, getFavourites, getCarts} from './../controllers/user.js';

const router = express.Router();

router.post("/authenticate",authenticate);
router.post("/login/google",googleLogin);
router.post("/logout",logout);
router.post("/get", get)
router.post("/placeorder",placeorder);
router.post("/addcart",addcart);
router.post("/removeCart",removeCart);
router.post("/update",updateUser);
router.post("/favourites",getFavourites);
router.post("/carts",getCarts);


export default router;