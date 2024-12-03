const Assignment = require('../models/assignmentModel');

// Upload an assignment (User Functionality)
exports.uploadAssignment = async (req, res) => {
    const { userId, task, admin } = req.body;

    try {
        const assignment = await Assignment.create({ userId, task, admin });
        res.status(201).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload assignment', details: error.message });
    }
};

// Get all assignments (Admin Functionality)
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments', details: error.message });
    }
};

// Update assignment status (Admin Functionality)
exports.updateAssignmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return updated doc & validate
        );

        if (!updatedAssignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment status updated successfully', updatedAssignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assignment status', details: error.message });
    }
};
