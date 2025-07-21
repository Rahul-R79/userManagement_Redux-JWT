import { body, validationResult } from "express-validator";

export const validateSignin = [
    body('userName')
        .notEmpty().withMessage('Name is required').bail()
        .matches(/^[A-Za-z]+$/).withMessage('Name must contain only letters')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
        .trim(),
    body('email')
        .notEmpty().withMessage('Email id is required').bail()
        .isEmail().withMessage('Enter a valid email id')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({min: 6}).withMessage('Password must be at least 6 characters')
        .matches(/[a-z]/).withMessage('Passsword contains at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password contains at least one uppercase letter')
        .matches(/[@#$?_-]/).withMessage('Password contain at least one speacial character')
        .matches(/[0-9]/).withMessage('Password contains atleast one number'),
    body('confirmPassword')
        .notEmpty().withMessage('Confirm password is required').bail()
        .custom((value, {req})=>{
            if(value !== req.body.password) throw new Error ('Password is not matching');
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
