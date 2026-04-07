import { body } from "express-validator";

export const formationValidator = [
    body('institution') 
        .notEmpty()
        .withMessage('Institution is required'),
    body('degree')
        .notEmpty()
        .withMessage('Degree is required'),
    body('specialty')
        .notEmpty()
        .withMessage('Specialty is required'),
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

];