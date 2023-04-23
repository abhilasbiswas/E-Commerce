import express from 'express'

import { gets, getCollectionProducts} from './../controllers/collections.js';

const router = express.Router();

router.post("/",gets);
router.post("/products",getCollectionProducts);



export default router;