import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { experienceValidator } from "../validators/experience.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createExperience, deleteExperience, getExperience, getExperienceById, updateExperience } from "../controllers/experience.controller.js";


const router = Router();

router.get('/', authenticate, getExperience);
router.get('/:id', authenticate, getExperienceById);
router.post('/', authenticate, experienceValidator, validate , createExperience);
router.put('/:id', authenticate, experienceValidator, validate, updateExperience);
router.delete('/:id', authenticate, deleteExperience);

export default router;  