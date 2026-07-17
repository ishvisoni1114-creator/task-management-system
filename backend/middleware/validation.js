const { body, validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    };
};

const userValidations = {
    register: [
        body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/[A-Z]/).withMessage('Must contain uppercase')
            .matches(/[a-z]/).withMessage('Must contain lowercase')
            .matches(/[0-9]/).withMessage('Must contain number')
    ],
    login: [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    task: [
        body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required'),
        body('status').optional().isIn(['pending', 'in_progress', 'completed', 'cancelled']),
        body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
    ]
};

module.exports = { validate, userValidations };