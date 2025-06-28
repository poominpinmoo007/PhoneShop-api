const express = require('express');
const router = express.Router();
const { SellController } = require('../controllers/SellController');

// Sell management
router.post('/create', SellController.create);
router.get('/list', SellController.list);
router.delete('/remove/:id', SellController.remove);
router.get('/confirm', SellController.confirm);
router.get('/dashboard', SellController.dashboard);

module.exports = router; 