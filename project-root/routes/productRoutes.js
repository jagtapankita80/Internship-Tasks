const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.post("/", protect, controller.createProduct);
router.get("/", controller.getProducts); // Leaving GET unprotected for public viewing as a common pattern, but modifications require auth
router.put("/:id", protect, controller.updateProduct);
router.delete("/:id", protect, controller.deleteProduct);

module.exports = router;