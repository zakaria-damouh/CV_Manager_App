import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { generateDocumentValidator, updateDocumentValidator } from "../validators/document.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { deleteDocument, generateDocument, getDocumentById, getDocuments, updateDocument } from "../controllers/document.controller.js";


const router = Router();

router.post('/generate' , authenticate , generateDocumentValidator , validate , generateDocument);
router.get('/', authenticate , getDocuments);
router.get('/:id', authenticate, getDocumentById);
router.put('/:id', authenticate, updateDocumentValidator, validate, updateDocument);
router.delete('/:id', authenticate, deleteDocument);

export default router;