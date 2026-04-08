

export const offreValidator = [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),
    body('company')
        .notEmpty()
        .withMessage('Company is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
];