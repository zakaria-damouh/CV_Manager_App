import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { adaptValidator, reformulateValidator } from "../validators/ai.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { adaptDocument, reformulateExperience, suggestImprovements } from "../controllers/ai.controller.js";


const router = Router();

router.post('/reformulate', authenticate, reformulateValidator , validate, reformulateExperience);
router.post('/adapt', authenticate, adaptValidator , validate, adaptDocument);
router.get('/suggest', authenticate, suggestImprovements);

export default router;