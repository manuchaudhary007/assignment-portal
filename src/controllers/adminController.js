const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register admin', details: error.message });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email });
        if (!admin) return res.status(404).json({ error: 'Admin not found' });

        // Validate password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ adminId: admin._id, role: admin.role }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login admin', details: error.message });
    }
};

// Get all assignments tagged to the admin
exports.getAdminAssignments = async (req, res) => {
    const adminId = req.adminId; // Assume adminId is set by a middleware

    try {
        const assignments = await Assignment.find({ admin: adminId });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

// Accept an assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        assignment.status = 'accepted';
        await assignment.save();
        res.json({ message: 'Assignment accepted', assignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to accept assignment' });
    }
};

// Reject an assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        assignment.status = 'rejected';
        await assignment.save();
        res.json({ message: 'Assignment rejected', assignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject assignment' });
    }
};
