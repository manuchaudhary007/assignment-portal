const mongoose = require('mongoose');

// Define Assignment Schema
const assignmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    timestamp: { type: Date, default: Date.now },
});

// Create Assignment Model
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
