import express from 'express';
import UserController from '../controllers/User.js';
const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/charge', UserController.chargeCard);
router.post('/pay', UserController.chargeCard);

export default router