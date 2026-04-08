import { body } from "express-validator";


export const langueValidator = [
    body('name')
        .notEmpty()
        .withMessage('Language name is required'),
    body('level')
        .notEmpty()
        .withMessage('Language level is required')
]; 