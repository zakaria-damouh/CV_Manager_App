import { body } from 'express-validator';

export const profileValidator = [
  body('professionalTitle')
    .notEmpty()
    .withMessage('Professional title is required'),

  body('summary')
    .notEmpty()
    .withMessage('Summary is required'),

  body('contact')
    .notEmpty()
    .withMessage('Contact is required'),

];