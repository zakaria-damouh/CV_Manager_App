import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { profileValidator } from '../validators/profile.validator.js';
import { createProfile, getProfile, updateProfile } from '../controllers/profile.controller.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/', authenticate, profileValidator, validate , createProfile);
router.get('/', authenticate, getProfile);
router.put('/', authenticate, profileValidator, validate, updateProfile);

export default router;