import { createLangueService, deleteLangueService, getLangueByIdService, getLanguesService, updateLangueService } from "../services/langue.service.js";


export const getLangues = async (req, res) => {

    try {
        const langues = await getLanguesService(req.user.id);
        res.json(langues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getLangueById = async (req, res) => {

    try {
        const langue = await getLangueByIdService(req.params.id);
        res.json(langue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createLangue = async (req, res) => {
    try {
        const langue = await createLangueService(req.body);
        res.status(201).json(langue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateLangue = async (req, res) => {
    try {
        const langue = await updateLangueService(req.user.id, req.params.id, req.body);
        res.json(langue);
    } catch (error) {
        if (error.message === 'Langue not found') {
            res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized to update this langue') {
            res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

export const deleteLangue = async (req, res) => {
    try {
        await deleteLangueService(req.user.id, req.params.id);
        res.json({ message: 'Langue deleted successfully' });
    } catch (error) {
        if (error.message === 'Langue not found') {
            res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized to delete this langue') {
            res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}
