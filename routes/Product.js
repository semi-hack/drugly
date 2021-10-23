import express from 'express';
import ProdController from '../controllers/Product.js';
const router = express.Router();

router.post('/add', ProdController.addProduct);
router.get('/all', ProdController.getAllProducts);

export default router