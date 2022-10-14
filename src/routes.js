const express = require('express');
const router = express.Router();
const authController = require('./controllers/authentication');
const stockInApprovalController = require('./controllers/product');
const jwtAuth = require('./middleware/jwt');
const role = require('./middleware/access-right');

//----  Router for '/' -----
router.get('/', (req, res) =>{
    res.status(200).json({
        status: "success",
        data: null
    })
})

//----  Router for User Login -----
router.post('/api/v1/users/login', authController.loginUser);
router.post('/api/v1/users/register', authController.registerUser);

//----  Router for Stock-In Aprroval Feature -----
router.get('/api/v1/products', jwtAuth, role.supervisorAccess, stockInApprovalController.getAllProducts);
router.get('/api/v1/products/:id', jwtAuth, role.supervisorAccess, stockInApprovalController.getProductById);
router.get('/api/v1/products/:statusId', jwtAuth, role.staffAccess, stockInApprovalController.getAllApprovedProducts);
router.post('/api/v1/products', jwtAuth, role.cashierAccess, stockInApprovalController.createProduct);
router.put('/api/v1/products/approval-status/:id', jwtAuth, role.supervisorAccess, stockInApprovalController.updateApprovalStatusProduct);

module.exports = router;