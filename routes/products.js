import Upload from '../utils/multer.js';
import express from "express";
// import Product from "../models/product.model.js";

import { getProducts, getProductById, getProductByUser, updateProduct, createProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();

// router.route('/').get((req, res)=>{
//     Product.find();
//     res.send('Hello world');
// })

router.route('/').get(getProducts);

router.route('/user/:user').get(getProductByUser);

router.route('/').post(Upload.single('image'), createProduct);

router.route('/:id').get(getProductById).post(updateProduct).delete(deleteProduct);


export default router;