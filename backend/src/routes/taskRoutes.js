const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { createTaskSchema, updateTaskSchema } = require('../validations/taskValidation');

// @route   POST /tasks
// @desc    Create a new task
// @access  Private (Admin only)
router.post('/', auth, roleCheck('admin'), async (req, res) => {
    try {
        // Validate request body
        const { error } = createTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, description, dueDate, assignedTo } = req.body;

        // Create new task
        const task = new Task({
            title,
            description,
            dueDate,
            assignedTo
        });

        await task.save();

        // Populate assignedTo user details
        await task.populate('assignedTo', 'name email');

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /tasks
// @desc    Get tasks (all for admin, assigned for dev)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'admin') {
            // Admin sees all tasks
            tasks = await Task.find().populate('assignedTo', 'name email').sort({ createdAt: -1 });
        } else {
            // Developer sees only their assigned tasks
            tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'name email').sort({ createdAt: -1 });
        }

        res.json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /tasks/:id
// @desc    Update task status to completed
// @access  Private (Dev only)
router.put('/:id', auth, roleCheck('dev'), async (req, res) => {
    try {
        // Validate request body
        const { error } = updateTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { status } = req.body;

        // Find task
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if task is assigned to the logged-in developer
        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only update tasks assigned to you' });
        }

        // Update task status
        task.status = status;
        await task.save();

        await task.populate('assignedTo', 'name email');

        res.json({
            success: true,
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /tasks/:id
// @desc    Delete a task
// @access  Private (Admin only)
router.delete('/:id', auth, roleCheck('admin'), async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
