import { createOffreService, deleteOffreService, getOffreByIdService, getOffresService, updateOffreService } from "../services/offre.service.js";


export const getOffers = async (req, res) => {
    try {
        const offers = await getOffresService(req.user.id);
        res.json(offers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOfferById = async (req, res) => {
    try {
        const offer = await getOffreByIdService(req.params.id);
        res.json(offer);
    } catch (error) {
        if (error.message === 'Offer not found') {
            res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const createOffer = async (req, res) => {
    try {
        const offer = await createOffreService(req.user.id, req.body);  
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOffer = async (req, res) => {
    try {
        const offer = await updateOffreService(req.params.id, req.user.id, req.body);
        res.json(offer);
    } catch (error) {
        if (error.message === 'Offer not found') {
            res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
            res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        await deleteOffreService(req.params.id, req.user.id);
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        if (error.message === 'Offer not found') {
        return res.status(404).json({ message: error.message });
        }
        if (error.message === "Unauthorized") {
        return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};