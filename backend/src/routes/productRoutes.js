import { Router } from 'express';
import {
  destroyProduct,
  listProducts,
  showProduct,
  storeProduct,
  updateProductById
} from '../controllers/productController.js';
import { adminOnly, authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', showProduct);
router.post('/', authMiddleware, adminOnly, storeProduct);
router.put('/:id', authMiddleware, adminOnly, updateProductById);
router.delete('/:id', authMiddleware, adminOnly, destroyProduct);

export default router;
