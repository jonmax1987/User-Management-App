const { body, validationResult } = require('express-validator');
const  ApiResponse  = require('../utils/ApiResponse');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const errorArray = errors.array().map(err => ({
            type: 'field',
            value: err.value,
            msg: err.msg,
            path: err.path,
            location: err.location
        }));

        return res.status(400).json(new ApiResponse('fail', 'Validation failed', null, errorArray));
    }
    next(); 
};


const validateRegister = [
    body('firstname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long')
        .matches(/^[א-תa-zA-Z0-9\s]+$/).withMessage('First name contains invalid characters'),
    body('lastname')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .matches(/^[א-תa-zA-Z0-9\s]+$/).withMessage('Last name contains invalid characters'),
    body('email')
        .trim()
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/^[א-תa-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/).withMessage('Password contains invalid characters'),
    handleValidationErrors 
];

const validateLogin = [
    body('email')
        .trim()
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .matches(/^[א-תa-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/).withMessage('Password contains invalid characters'),
    handleValidationErrors
];

const validateUpdateUser = [
    body('firstname')
        .optional()
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long')
        .matches(/^[א-תa-zA-Z0-9\s]+$/).withMessage('First name contains invalid characters'),
    body('lastname')
        .optional()
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .matches(/^[א-תa-zA-Z0-9\s]+$/).withMessage('Last name contains invalid characters'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),
    handleValidationErrors
];

const validateCreateUser = [
    body('firstname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long')
        .matches(/^[א-תa-zA-Z0-9\s]+$/).withMessage('First name contains invalid characters'),
    body('lastname')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .matches(/^[א-תa-zA-Z0-9\s]+$/).withMessage('Last name contains invalid characters'),
    body('email')
        .trim()
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail()
];

module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateUser,
    validateCreateUser
};
