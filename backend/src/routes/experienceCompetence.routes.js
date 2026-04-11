import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { experienceCompetenceValidator } from "../validators/experienceCompetence.validator.js";
import {
    createExperienceCompetence,
    deleteExperienceCompetence,
    getExperienceCompetences
} from "../controllers/experienceCompetence.controller.js";

const router = Router({ mergeParams: true }); // important for nested params

router.post('/', authenticate, experienceCompetenceValidator, validate, createExperienceCompetence);
router.get('/', authenticate, getExperienceCompetences);
router.delete('/:competenceId', authenticate, deleteExperienceCompetence);

export default router;