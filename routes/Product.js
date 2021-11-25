import express from 'express';
import ProdController from '../controllers/Product.js';
import reviewController from '../controllers/Review.js';
const router = express.Router();

router.post('/add', ProdController.addProduct);
router.get('/product', ProdController.getProduct);
router.get('/product/id', ProdController.getProductById);
router.get('/product', ProdController.getProductByCategory);
router.get('/product/:name', ProdController.getProductByName);
router.get('/all', ProdController.getAllProducts);

router.post('/review', reviewController.addReview);

export default router