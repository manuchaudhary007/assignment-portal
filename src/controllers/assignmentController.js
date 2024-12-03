const { getAssignments, addAssignment, updateAssignment } = require('../models/assignmentModel');

// User Controllers
exports.uploadAssignment = (req, res) => {
    const { userId, task, admin } = req.body;
    const assignment = { id: Date.now().toString(), userId, task, admin, status: 'pending' };
    addAssignment(assignment);
    res.status(201).json(assignment);
};

// Admin Controllers
exports.getAllAssignments = (req, res) => {
    res.json(getAssignments());
};

exports.updateAssignmentStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    updateAssignment(id, status);
    res.json({ message: `Assignment ${id} updated to ${status}` });
};