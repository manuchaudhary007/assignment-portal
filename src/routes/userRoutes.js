const express = require('express');
const { uploadAssignment } = require('../controllers/assignmentController');
const router = express.Router();

router.post('/upload', uploadAssignment);

module.exports = router;