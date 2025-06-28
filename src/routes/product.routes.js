const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/ProductController');

// Product/Buy management
router.post('/create', ProductController.create);
router.get('/list', ProductController.list);
router.put('/update/:id', ProductController.update);
router.delete('/delete/:id', ProductController.remove);

module.exports = router; 