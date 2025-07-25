//express validation middleware

import { body, validationResult } from "express-validator";

const userNameValidator = body('userName')
    .notEmpty().withMessage('Name is required').bail()
    .matches(/^[A-Za-z]+$/).withMessage('Name must contain only letters')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
    .trim();

const emailValidator = body('email')
    .notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Enter a valid email id')
    .normalizeEmail();

const passwordValidator = body('password')
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[@#$?_-]/).withMessage('Password must contain at least one special character');

const confirmPasswordValidator = body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required').bail()
    .custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password is not matching');
    }
    return true;
});

function handleValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateSignup = [
    userNameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    handleValidation,
];

export const validateLogin = [
    emailValidator,
    passwordValidator,
    handleValidation,
];


