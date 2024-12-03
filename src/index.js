const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import database connection
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize app and connect database
const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});