import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const CartSchema = new Schema({
    userId: {},
    product: [{}],

},  
 { timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;