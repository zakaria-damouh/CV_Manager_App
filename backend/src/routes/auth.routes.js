import { Router } from "express";
import { loginValidator, registerValidator, updateAccountValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { deleteAccount, login, register, updateAccount } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router();

router.post('/register' , registerValidator , validate , register );
router.post('/login' , loginValidator , validate , login);
router.put('/account', authenticate, updateAccountValidator, validate, updateAccount);
router.delete('/account', authenticate, deleteAccount);

export default router;