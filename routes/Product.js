import express from 'express';
import ProdController from '../controllers/Product.js';
const router = express.Router();

router.post('/add', ProdController.addProduct);
router.get('/product/id', ProdController.getProductById);
router.get('/product/:name', ProdController.getProductByName);
router.get('/all', ProdController.getAllProducts);

export default router