import {
    createUserCompetenceService,
    deleteUserCompetenceService,
    getUserCompetenceByIdService,
    getUserCompetencesService,
    updateUserCompetenceService
} from "../services/userCompetence.service.js";

export const getUserCompetences = async (req, res) => {
    try {
        const competences = await getUserCompetencesService(req.user.userId);
        res.json(competences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserCompetenceById = async (req, res) => {
    try {
        const competenceId = parseInt(req.params.competenceId);
        const userCompetence = await getUserCompetenceByIdService(req.user.userId, competenceId);
        res.json(userCompetence);
    } catch (error) {
        if (error.message === 'UserCompetence not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const createUserCompetence = async (req, res) => {
    try {
        const userCompetence = await createUserCompetenceService(req.user.userId, req.body);
        res.status(201).json(userCompetence);
    } catch (error) {
        if (error.message === 'Competence not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Competence already added to profile') {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const updateUserCompetence = async (req, res) => {
    try {
        const competenceId = parseInt(req.params.competenceId);
        const userCompetence = await updateUserCompetenceService(req.user.userId, competenceId, req.body);
        res.json(userCompetence);
    } catch (error) {
        if (error.message === 'UserCompetence not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteUserCompetence = async (req, res) => {
    try {
        const competenceId = parseInt(req.params.competenceId);
        await deleteUserCompetenceService(req.user.userId, competenceId);
        res.json({ message: 'Competence removed from profile successfully' });
    } catch (error) {
        if (error.message === 'UserCompetence not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};