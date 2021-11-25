import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    product:  {
        type: Schema.Types.ObjectId, ref: 'Product'
    },
},
 { timestamps: true }
)

const Review = mongoose.model('Review', ReviewSchema);

export default Review;