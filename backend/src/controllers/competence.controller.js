import { createCompetenceService, deleteCompetenceService, getCompetenceByIdService, getCompetencesService, updateCompetenceService } from "../services/competence.service.js";


export const getCompetences = async (req, res) => {
    try {
        const competences = await getCompetencesService(req.user.id); 
        res.json(competences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCompetenceById = async (req, res) => {
    try {
         const competenceId = parseInt(req.params.id);
        const competence = await getCompetenceByIdService(competenceId);
        res.json(competence);
    } catch (error) {
        if (error.message === 'Competence not found') {
            res.status(404).json({ error: error.message });
        }

        res.status(500).json({ error: error.message });
    }
};

export const createCompetence = async (req, res) => {
    try {
        const competence = await createCompetenceService(req.user.id, req.body);
        res.status(201).json(competence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCompetence = async (req, res) => {
    try {
         const competenceId = parseInt(req.params.id);
        const competence = await updateCompetenceService(competenceId, req.user.id, req.body); 
        res.json(competence);
    } catch (error) {
        if (error.message === 'Competence not found') {
            res.status(404).json({ error: error.message });
        } 
        if (error.message === 'Unauthorized') {
            res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};


export const deleteCompetence = async (req, res) => {
    try {
        const competenceId = parseInt(req.params.id);
        await deleteCompetenceService(competenceId, req.user.id);
        res.json({ message: 'Competence deleted successfully' });
    } catch (error) {
        if (error.message === 'Competence not found') {
            res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
            res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};