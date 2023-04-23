import express from 'express'

import {get,home} from './../controllers/home.js';

const router = express.Router();

router.get("/",home)
router.post("/",get);
router.post("/home",get);
router.post("/get",get);

export default router;