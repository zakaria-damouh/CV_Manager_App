import { body } from "express-validator";


export const competenceValidator = [
    body('name')
        .notEmpty()
        .withMessage('Competence name is required'),
    body('category')
        .notEmpty()
        .withMessage('Competence category is required')
];