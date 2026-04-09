import { body } from "express-validator";


export const experienceValidator = [
    body('position')
        .notEmpty()
        .withMessage('Position is required'),
    body('company')
        .notEmpty()
        .withMessage('Company is required'),
    body('startDate')
        .notEmpty()
        .withMessage('Start date is required')
        .isISO8601()
        .withMessage('Start date must be a valid date'),
    body('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid date'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
    body('order')
        .notEmpty()
        .withMessage('Order is required')
        .isInt()
        .withMessage('Order must be a number'),
] 