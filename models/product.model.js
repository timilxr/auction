import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users1'
    },
    name: {
        type: String,
        required: true,
    },
    last_bid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    open: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    cloudinary_id: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    }
},{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;