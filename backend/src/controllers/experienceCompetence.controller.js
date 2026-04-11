import {
    createExperienceCompetenceService,
    deleteExperienceCompetenceService,
    getExperienceCompetencesService
} from "../services/experienceCompetence.service.js";

export const getExperienceCompetences = async (req, res) => {
    try {
        const experienceId = parseInt(req.params.experienceId);
        const competences = await getExperienceCompetencesService(experienceId);
        res.json(competences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createExperienceCompetence = async (req, res) => {
    try {
        const experienceId = parseInt(req.params.experienceId);
        const competenceId = parseInt(req.body.competenceId);
        const result = await createExperienceCompetenceService(req.user.userId, experienceId, competenceId);
        res.status(201).json(result);
    } catch (error) {
        if (error.message === 'Experience not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Competence not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
            return res.status(403).json({ error: error.message });
        }
        if (error.message === 'Competence already linked to this experience') {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteExperienceCompetence = async (req, res) => {
    try {
        const experienceId = parseInt(req.params.experienceId);
        const competenceId = parseInt(req.params.competenceId);
        await deleteExperienceCompetenceService(req.user.userId, experienceId, competenceId);
        res.json({ message: 'Competence removed from experience successfully' });
    } catch (error) {
        if (error.message === 'Experience not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
            return res.status(403).json({ error: error.message });
        }
        if (error.message === 'ExperienceCompetence not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};