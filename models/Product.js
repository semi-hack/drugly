import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import mongoosePaginate from 'mongoose-paginate-v2';



const ProductSchema = new Schema({
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    image: [{type: String}],
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
        default: 1
    },
    price: {
        type: Number,
        default: 1000
    }

},  
 { timestamps: true }
)

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', ProductSchema);

export default Product;