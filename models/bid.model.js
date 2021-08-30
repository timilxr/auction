import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bidSchema = new Schema({
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
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    }
},{
    timestamps: true,
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;