import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
    },
    image: [{}],
    description: {
        type: String
    },
    category: {
        type: String
    },
    rating: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 1000
    }

},  
 { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema);

export default Product;