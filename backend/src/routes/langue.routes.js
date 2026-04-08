import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { langueValidator } from "../validators/langue.validator.js";
import { createLangue, deleteLangue, getLangueById, getLangues, updateLangue } from "../controllers/langue.controller.js";
import { validate } from "../middlewares/validate.middleware.js";


const router = Router();

router.post('/',authenticate ,langueValidator, validate , createLangue);
router.get('/', authenticate , getLangues);
router.get('/:id', authenticate , getLangueById);
router.put('/:id', authenticate , langueValidator   , validate , updateLangue);
router.delete('/:id', authenticate , deleteLangue);

export default router;