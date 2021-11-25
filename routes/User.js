import express from 'express';
import UserController from '../controllers/User.js';
const router = express.Router();

router.post('/register', UserController.createUser);
router.get('/user', UserController.getUser)
router.patch('/save', UserController.saveItem);
router.post('/charge', UserController.chargeCard);
router.post('/pay', UserController.corserr);

export default router