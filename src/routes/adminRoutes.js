const express = require('express');
const { registerAdmin, loginAdmin, getAdminAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new admin
router.post('/register', registerAdmin);

// Admin login
router.post('/login', loginAdmin);

// View assignments tagged to the admin
router.get('/assignments', authMiddleware, getAdminAssignments);

// Accept an assignment
router.post('/assignments/:id/accept', authMiddleware, acceptAssignment);

// Reject an assignment
router.post('/assignments/:id/reject', authMiddleware, rejectAssignment);

module.exports = router;

