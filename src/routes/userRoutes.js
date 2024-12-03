const express = require('express');
const { registerUser, loginUser, getAdmins } = require('../controllers/userControllers');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/admins', getAdmins);

module.exports = router;
