const { Router } = require('express');
const verifyTokenJWT = require('../middlewares/verifyTokenJWT');
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/admin');

const router = Router();
router.post('/user', verifyTokenJWT, isAdmin, adminController.createUser);
router.get('/users', verifyTokenJWT, isAdmin, adminController.allUsers);
router.delete('/user', verifyTokenJWT, isAdmin, adminController.deleteUser);

module.exports = router;