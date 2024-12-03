const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role differentiation
});

// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = User;