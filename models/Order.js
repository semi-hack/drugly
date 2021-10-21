import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    userId: {},
    product: [{}],

},  
 { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema);

export default Cart;