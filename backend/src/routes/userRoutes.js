const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// @route   GET /users
// @desc    Get all users (for admin to assign tasks)
// @access  Private (Admin only)
router.get('/', auth, roleCheck('admin'), async (req, res) => {
    try {
        // Get all users, excluding passwords
        const users = await User.find().select('-password');

        res.json({
            success: true,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
