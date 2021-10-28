import express from 'express';
import userRoute from './User.js';
import prodRoute from './Product.js';
import authRoute from './Auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        data: "working.."
    })
})

router.use('/v1', authRoute)
router.use('/v1', userRoute)
router.use('/v1', prodRoute)

export default router