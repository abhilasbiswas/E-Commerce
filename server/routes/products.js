import express from 'express'

import {get, gets, searchProducts, like} from './../controllers/products.js';

const router = express.Router();


router.get("/",get);
router.post("/",gets);
router.post("/search",searchProducts)
router.post("/like",like);


export default router;