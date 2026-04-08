import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { competenceValidator } from "../validators/competence.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCompetence, deleteCompetence, getCompetenceById, getCompetences, updateCompetence } from "../controllers/competence.controller.js";


const router = Router();

router.post('/' , authenticate , competenceValidator , validate , createCompetence);
router.get('/' , authenticate , getCompetences);
router.get('/:id' , authenticate , getCompetenceById);
router.put('/:id' , authenticate , competenceValidator , validate , updateCompetence);
router.delete('/:id' , authenticate , deleteCompetence);

export default router;