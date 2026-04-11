import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userCompetenceValidator, updateUserCompetenceValidator } from "../validators/userCompetence.validator.js";
import {
    createUserCompetence,
    deleteUserCompetence,
    getUserCompetenceById,
    getUserCompetences,
    updateUserCompetence
} from "../controllers/userCompetence.controller.js";

const router = Router();

router.post('/', authenticate, userCompetenceValidator, validate, createUserCompetence);
router.get('/', authenticate, getUserCompetences);
router.get('/:competenceId', authenticate, getUserCompetenceById);
router.put('/:competenceId', authenticate, updateUserCompetenceValidator, validate, updateUserCompetence);
router.delete('/:competenceId', authenticate, deleteUserCompetence);

export default router;