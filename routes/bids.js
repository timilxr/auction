// import Upload from '../utils/multer.js';
import express from "express";
// import Product from "../models/product.model.js";

import { getBids, getBidById, getBidByProduct, getBidByUser, updateBid, createBid, deleteBid, acceptBid } from '../controllers/bids.js';

const router = express.Router();

// router.route('/').get((req, res)=>{
//     Bid.find();
//     res.send('Hello world');
// })

router.route('/').get(getBids);
router.route('/product/:product').get(getBidByProduct);
router.route('/user/:user').get(getBidByUser);
router.route('/').post(createBid);

router.route('/accept').post(acceptBid);

router.route('/:id').get(getBidById).post(updateBid).delete(deleteBid);


export default router;