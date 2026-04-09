import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { offreValidator } from "../validators/offre.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createOffer, deleteOffer, getOfferById, getOffers } from "../controllers/offre.controller.js";


const router = Router();

router.post('/' , authenticate , offreValidator , validate , createOffer);
router.get('/' , authenticate , getOffers);
router.get('/:id', authenticate, getOfferById);
router.delete('/:id', authenticate, deleteOffer);

export default router;