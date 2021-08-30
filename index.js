import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 5000;
const uri = process.env.URI;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// import Product from './models/product.model.js';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Database connected successfully"))
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