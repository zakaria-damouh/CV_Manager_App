import { body } from "express-validator";

export const experienceCompetenceValidator = [
    body('competenceId')
        .notEmpty().withMessage('Competence ID is required')
        .isInt().withMessage('Competence ID must be an integer')
];