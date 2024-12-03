const mongoose = require('mongoose');

// Define Schema
const assignmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    task: { type: String, required: true },
    admin: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    timestamp: { type: Date, default: Date.now },
});

// Create Model
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
