import mongoose from 'mongoose';
import Bid from '../models/bid.model.js';
import Product from '../models/product.model.js';
import { updateProductBid } from './products.js';


export const getBids = async (req, res) => {
    try {
        // Product.insertMany(data);
        const bids = await Bid.find().populate('user').populate('product');
        console.log(bids);
        res.status(200).json(bids);
    }
    catch (error) {
        res.status(400).json({ message: error.message, info: 'No bid was found' });
    }
}

export const getBidById = async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id).populate('user').populate('product');
        console.log(bid);
        res.status(200).json(bid);
    }
    catch (error) {
        res.status(400).json({ message: error.message, info: 'Bid not found' });
    }
}


export const getBidByUser = async (req, res) => {
    try {
        const bid = await Bid.find({ user: req.params.user }).populate('user').populate('product');
        console.log(bid);
        res.status(200).json(bid);
    }
    catch (error) {
        res.status(400).json({ message: error.message, info: 'Bid not found' });
    }
}

export const getBidByProduct = async (req, res) => {
    try {
        const bid = await Bid.find({ product: req.params.product }).populate('user').populate('product');
        console.log(bid);
        res.status(200).json(bid);
    }
    catch (error) {
        res.status(400).json({ message: error.message, info: 'Bid not found' });
    }
}

export const deleteBid = async (req, res) => {
    try {
        const bid = await Bid.findByIdAndDelete(req.params.id);
        console.log(bid);
        res.status(200).json(bid);
    }
    catch (error) {
        res.status(400).json({ message: error.message, info: 'Bid not found' });
    }
}

export const createBid = async (req, res, next) => {
    // Upload.single('image');
    // console.log(req.file);
    const details = req.body;
    const data = await Bid.find();
    details.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const old = data.filter(bid => (bid.user == req.body.user) && (bid.product == details.product));
    if (old.length > 0) {
        try {
            const up = await Bid.updateOne({ user: details.user }, { price: req.body.price }, { new: true });
            const product = await Product.findByIdAndUpdate(details.product, { last_bid: old._id }, { new: true });
            return res.status(201).json(up);
        } catch (error) {
            console.log(error.message);
            return res.status(422).json({ message: error.message, info: 'Error creating Bid' });
        }
    }
    try {
        details.user = mongoose.Types.ObjectId(details.user);
        details.product = mongoose.Types.ObjectId(details.product);
        const newBid = new Bid(details);
        const bid = await newBid.save();
        const check = updateProductBid(newBid.product, bid._id);
        console.log(bid);
        if (check == null) {
            next(res.status(422).json({
                message: 'Error placing bid',
                bid
            }));
        }
        res.status(200).json(bid);
    }
    catch (error) {
        res.status(422).json({ message: error.message, info: 'Error creating Bid' });
    }
}

export const updateBid = async (req, res) => {
    const { user, product, status, price } = req.body;
    const id = req.params.id;
    try {
        const bid = await Bid.findById(id);
        bid.user = user;
        bid.product = product;
        bid.price = price;
        bid.status = status;
        // console.log(products);
        try {
            const newBid = await bid.save();
            res.status(200).json(newBid);
        }
        catch (error) {
            res.status(400).json({ message: error.message, info: 'Product not updated' })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message, info: 'Product not found' });
    }
}

export const acceptBid = async (req, res) => {
    try {
        const start = await Bid.updateMany({ product: req.body._id }, { status: 'rejected' }, { new: true });
        const up = await Bid.updateOne({ _id: req.body.last_bid }, { status: 'accepted' }, { new: true });
        const product = await Product.findByIdAndUpdate(req.body._id, { open: false }, { new: true });
        const bids = await Bid.find({ product: req.body._id });
        res.status(200).json({ bids, product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
}