import { body } from 'express-validator';

export const reformulateValidator = [
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
];

export const adaptValidator = [
  body('documentId')
    .notEmpty()
    .withMessage('Document ID is required')
    .isInt()
    .withMessage('Document ID must be a number'),
  body('offreId')
    .notEmpty()
    .withMessage('Offre ID is required')
    .isInt()
    .withMessage('Offre ID must be a number'),
];