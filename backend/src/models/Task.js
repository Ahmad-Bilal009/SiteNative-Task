const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must be assigned to a user']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
