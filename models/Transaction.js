import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    Email: {
        type: String,
    },
    Amount: {
        type: Number,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    reference: {
        type: String,
    },
    status: {
        type: String,
    },
},  
 { timestamps: true }
)

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
