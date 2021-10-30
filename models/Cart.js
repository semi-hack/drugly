import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    product: [{}],

},  
 { timestamps: true }
)

const Cart = mongoose.model('Item', ItemSchema);

export default Cart;