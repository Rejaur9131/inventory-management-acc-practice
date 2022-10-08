const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.route('/bulk-update').patch(productController.bulkProductUpdate);
router.route('/bulk-delete').delete(productController.bulkProductDelete);

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

module.exports = router;
