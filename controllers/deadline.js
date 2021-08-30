// import Schedule from 'node-schedule';
// import Product from '../models/product.model.js';
// import Bid from '../models/bid.model.js';


// export let data = [];
// Schedule.scheduleJob('*/15 * * * * *', async () => {
//     try {
//         const products = await Product.find({});
//     // let date = new Date();
//     data = products.filter(product => (+new Date(product.deadline) <= +new Date()) && (product.open));
//     if (data.length > 0) {
//         data.map(async prod => {
//             const start = await Bid.updateMany({ product: prod._id }, { status: 'rejected' }, { new: true });
//             const up = await Bid.updateOne({ _id: prod.last_bid }, { status: 'accepted' }, { new: true });
//             const product = await Product.findByIdAndUpdate(prod._id, { open: false }, { new: true });
//         });
//     }
//     } catch (err) {
//         console.error(err.message);
//     }
// })
// console.log(data);