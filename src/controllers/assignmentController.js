const Assignment = require('../models/assignmentModel');

// User Controllers
exports.uploadAssignment = async (req, res) => {
    try {
        const { userId, task, admin } = req.body;
        const assignment = new Assignment({ userId, task, admin });
        await assignment.save(); // Save to MongoDB
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload assignment' });
    }
};

// Admin Controllers
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find(); // Fetch all assignments from MongoDB
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

exports.updateAssignmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Update the status of the assignment
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedAssignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        res.json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assignment status' });
    }
};
