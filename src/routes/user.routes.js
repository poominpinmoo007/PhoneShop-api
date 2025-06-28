const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/UserController');

// User authentication
router.post('/signin', UserController.signIn);

// User management
router.get('/info', UserController.info);
router.put('/update', UserController.update);
router.get('/list', UserController.list);
router.post('/create', UserController.create);

// Routes with parameters - make sure these are defined correctly
router.put('/update/:id', UserController.updateRow);
router.delete('/delete/:id', UserController.remove);

module.exports = router; 