import { body } from "express-validator";

export const userCompetenceValidator = [
    body('competenceId')
        .notEmpty().withMessage('Competence ID is required')
        .isInt().withMessage('Competence ID must be an integer'),
    body('level')
        .notEmpty().withMessage('Level is required')
];

export const updateUserCompetenceValidator = [
    body('level')
        .notEmpty().withMessage('Level is required')
];