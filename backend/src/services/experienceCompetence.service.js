import prisma from "../config/db.js";

export const getExperienceCompetencesService = async (experienceId) => {
    return await prisma.experienceCompetence.findMany({
        where: { experienceId },
        include: { competence: true }
    });
};

export const createExperienceCompetenceService = async (userId, experienceId, competenceId) => {
    // Check experience exists and belongs to user
    const experience = await prisma.experience.findUnique({
        where: { id: experienceId }
    });

    if (!experience) {
        throw new Error('Experience not found');
    }

    if (experience.userId !== userId) {
        throw new Error('Unauthorized');
    }

    // Check competence exists
    const competence = await prisma.competence.findUnique({
        where: { id: competenceId }
    });

    if (!competence) {
        throw new Error('Competence not found');
    }

    // Check not already linked
    const existing = await prisma.experienceCompetence.findUnique({
        where: { experienceId_competenceId: { experienceId, competenceId } }
    });

    if (existing) {
        throw new Error('Competence already linked to this experience');
    }

    return await prisma.experienceCompetence.create({
        data: { experienceId, competenceId },
        include: { competence: true }
    });
};

export const deleteExperienceCompetenceService = async (userId, experienceId, competenceId) => {
    // Check experience exists and belongs to user
    const experience = await prisma.experience.findUnique({
        where: { id: experienceId }
    });

    if (!experience) {
        throw new Error('Experience not found');
    }

    if (experience.userId !== userId) {
        throw new Error('Unauthorized');
    }

    // Check link exists
    const existing = await prisma.experienceCompetence.findUnique({
        where: { experienceId_competenceId: { experienceId, competenceId } }
    });

    if (!existing) {
        throw new Error('ExperienceCompetence not found');
    }

    await prisma.experienceCompetence.delete({
        where: { experienceId_competenceId: { experienceId, competenceId } }
    });
};