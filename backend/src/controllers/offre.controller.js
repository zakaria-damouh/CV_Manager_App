import { createOffreService, deleteOffreService, getOffreByIdService, getOffresService, updateOffreService } from "../services/offre.service.js";


export const getOffers = async (req, res) => {
    try {
        const offers = await getOffresService(req.user.userId);
        res.json(offers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOfferById = async (req, res) => {
    try {
        const offerId = parseInt(req.params.id);
        const offer = await getOffreByIdService(req.user.userId, offerId);
        res.json(offer);
    } catch (error) {
        if (error.message === 'Offre not found') {
            res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized to access this offre') {
            res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const createOffer = async (req, res) => {
    try {
        const offer = await createOffreService(req.user.userId, req.body);  
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteOffer = async (req, res) => {
    try {
        const offerId = parseInt(req.params.id);
        await deleteOffreService(req.user.userId, offerId);
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        if (error.message === 'Offer not found') {
        return res.status(404).json({ message: error.message });
        }
        if (error.message === "Unauthorized to delete this offer") {
        return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};