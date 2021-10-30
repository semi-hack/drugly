import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    item: [{
        
            productId: {
                type: Schema.Types.ObjectId, ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number
            },
    }],
    address: {
        type: String
    },
    status: {
        type: String,
        default: "successful"
    },
    delivery: {
        type: String,
        default: "pending"
    }
},
 { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema);

export default Order;