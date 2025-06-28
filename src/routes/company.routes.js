const express = require('express');
const router = express.Router();
const { CompanyController } = require('../controllers/CompanyController');

// Company management
router.post('/create', CompanyController.createCompany);
router.get('/list', CompanyController.getCompany);

module.exports = router; 