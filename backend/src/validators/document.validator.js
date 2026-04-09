import { body } from 'express-validator';

export const generateDocumentValidator = [
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['CV', 'cover_letter', 'profile_summary', 'application_email'])
    .withMessage('Type must be one of: CV, cover_letter, profile_summary, application_email'),
  body('offreId')                          
    .optional()
    .isInt({ min: 1 })
    .withMessage('offreId must be a positive integer'),
];

export const updateDocumentValidator = [
  body('content')
    .notEmpty()
    .withMessage('Content is required'),
];