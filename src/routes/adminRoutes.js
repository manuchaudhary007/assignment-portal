const express = require('express');
const { getAllAssignments, updateAssignmentStatus } = require('../controllers/assignmentController');
const router = express.Router();

router.get('/assignments', getAllAssignments);
router.patch('/assignments/:id', updateAssignmentStatus);

module.exports = router;