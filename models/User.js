import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    blood_group: {
        type: String,
    },
    blood_type: {
        type: String
    },
    health_status: {
        type: String
    },
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    referral_code: {
        type: String
    },
    
    resetToken: {
        type: String,
        default: ''
    },
},
 { timestamps: true }
)

// UserSchema.pre('save', async function save(next) {
//     //if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//         this.password = await bcrypt.hash(this.password, salt);
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

// UserSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// }

const User = mongoose.model('User', UserSchema);

export default User;
