const express = require('express');
const router = express.Router();
const { ServiceController } = require('../controllers/ServiceController');

// Service management
router.post('/create', ServiceController.create);
router.get('/list', ServiceController.list);
router.put('/update/:id', ServiceController.update);
router.delete('/delete/:id', ServiceController.remove);

module.exports = router; 