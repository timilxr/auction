import Product from '../models/product.model.js';
import cloudinary from '../utils/cloudinary.js';
import mongoose from 'mongoose';
import Bid from '../models/bid.model.js';
// import Upload from '../utils/multer.js';
// import data from '../productData.js';


export const getProducts = async (req, res) => {
    try{
        // Product.insertMany(data);
        const products = await Product.find().populate('user').populate('last_bid');
        console.log(products);
        res.status(200).json(products);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'No product now found'});
    }
}

export const getProductByUser = async (req, res) => {
    try{
        const product = await Product.find({user: mongoose.Types.ObjectId(req.params.user)}).populate('user').populate('last_bid');
        console.log(product);
        res.status(200).json(product);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'Product not found'});
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id).populate('user').populate('last_bid');
        console.log(product);
        res.status(200).json(product);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'Product not found'});
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log(product);
        res.status(200).json(product);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'Product not found'});
    }
}

export const createProduct = async (req, res) => {
    // Upload.single('image');
    // console.log(req.file);
    const details = req.body;
    const data = await Product.find();
    details.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    try{
        details.user = mongoose.Types.ObjectId(details.user);
        const image = await cloudinary.uploader.upload(req.file.path);
        details.cloudinary_id = image.public_id;
        details.image = image.secure_url;
        const newProduct = new Product(details);
        const initBid = await Bid.find();
        
        const bidObject = {
            user: req.body.user,
            product: newProduct._id,
            price: req.body.price
        };
        bidObject.id = initBid.length > 0 ? initBid[initBid.length - 1].id + 1 : 1;
        const bid = new Bid(bidObject);
        const bidOut = await bid.save();
        newProduct.last_bid = bid._id;
        const product = await newProduct.save();
        console.log(product);
        res.status(200).json(product);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'Error creating Product'});
    }
}

export const updateProduct = async (req, res) => {
    const {name, image, price, cloudinary_id, description} = req.body;
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        product.name = name;
        product.image = image;
        product.price = price;
        product.cloudinary_id = cloudinary_id;
        product.description = description;
        // console.log(products);
        try{
            const newProduct = await product.save();
            res.status(200).json(newProduct);
        }
        catch(error){
            res.status(400).json({message: error.message, info: 'Product not updated'})
        }
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'Product not found'});
    }
}


export const updateProductBid = async (product_id, bid_id) => {
    // const {name, image, price, cloudinary_id, description} = req.body;
    const id = product_id;
    try{
        const product = await Product.findById(id);
        product.last_bid = bid_id;
        // console.log(products);
        try{
            const newProduct = await product.save();
            return newProduct;
        }
        catch(error){
            console.error(error.message);
            return null
        }
    }
    catch(error){
        console.error(error.message);
        return null;
    }
}