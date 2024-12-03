const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/assignments', assignmentRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
