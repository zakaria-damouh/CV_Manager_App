import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { formationValidator } from "../validators/formation.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createFormation, deleteFormation, getFormationById, getFormations, updateFormation } from "../controllers/formation.controller.js";


const router = Router();

router.get('/', authenticate, getFormations);
router.get('/:id', authenticate, getFormationById);
router.post('/' , authenticate , formationValidator, validate, createFormation);
router.put('/:id', authenticate, formationValidator, validate, updateFormation);
router.delete('/:id', authenticate, deleteFormation);

export default router;
