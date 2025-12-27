const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must not exceed 100 characters'
        }),

    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description must not exceed 500 characters'
        }),

    dueDate: Joi.date()
        .min('now')
        .required()
        .messages({
            'date.base': 'Due date must be a valid date',
            'date.min': 'Due date cannot be in the past',
            'any.required': 'Due date is required'
        }),

    assignedTo: Joi.string()
        .required()
        .messages({
            'string.empty': 'Task must be assigned to a user'
        })
});

const updateTaskSchema = Joi.object({
    status: Joi.string()
        .valid('pending', 'completed')
        .required()
        .messages({
            'string.empty': 'Status is required',
            'any.only': 'Status must be either pending or completed'
        })
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};
