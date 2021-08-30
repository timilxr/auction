import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Schedule from 'node-schedule';
import Product from './models/product.model.js';
import Bid from './models/bid.model.js';


dotenv.config();

const PORT = process.env.PORT || 5000;
const uri = process.env.URI;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// import Product from './models/product.model.js';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log("Database connected successfully");
let data = [];
Schedule.scheduleJob('*/5 * * * * *', async () => {
    try {
        const products = await Product.find({});
    // let date = new Date();
    data = products.filter(product => (+new Date(product.deadline) <= +new Date()) && (product.open));
    if (data.length > 0) {
        data.map(async prod => {
            const start = await Bid.updateMany({ product: prod._id }, { status: 'rejected' }, { new: true });
            const up = await Bid.updateOne({ _id: prod.last_bid }, { status: 'accepted' }, { new: true });
            const product = await Product.findByIdAndUpdate(prod._id, { open: false }, { new: true });
        });
    }
    } catch (err) {
        console.error(err.message);
    }
})
console.log(data);})
.catch(error=>console.log(error.message));

// mongoose.set("useFindAndModify", false);

// import OrderRouter from './routes/orders.js';
import UserRouter from './routes/users.js';
import ProductRouter from './routes/products.js';
import BidRouter from './routes/bids.js';


app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));

app.use('/bids', BidRouter)
app.use('/products', ProductRouter)
app.use('/users', UserRouter)

app.get('/', (req, res)=>res.send('Hello From Express!!'));