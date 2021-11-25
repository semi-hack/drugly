import express from 'express';
import reviewController from '../controllers/Review.js';
const router = express.Router();

router.post('/review', reviewController.addReview);
router.get('/review', reviewController.getUserReview);

export default router