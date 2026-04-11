import prisma from "../config/db.js";

export const getUserCompetencesService = async (userId) => {
    return await prisma.userCompetence.findMany({
        where: { userId },
        include: { competence: true }
    });
};

export const getUserCompetenceByIdService = async (userId, competenceId) => {
    const userCompetence = await prisma.userCompetence.findUnique({
        where: { userId_competenceId: { userId, competenceId } },
        include: { competence: true }
    });

    if (!userCompetence) {
        throw new Error('UserCompetence not found');
    }

    return userCompetence;
};

export const createUserCompetenceService = async (userId, data) => {
    const { competenceId, level } = data;

    // Check competence exists
    const competence = await prisma.competence.findUnique({
        where: { id: competenceId }
    });

    if (!competence) {
        throw new Error('Competence not found');
    }

    // Check not already linked
    const existing = await prisma.userCompetence.findUnique({
        where: { userId_competenceId: { userId, competenceId } }
    });

    if (existing) {
        throw new Error('Competence already added to profile');
    }

    return await prisma.userCompetence.create({
        data: { userId, competenceId, level },
        include: { competence: true }
    });
};

export const updateUserCompetenceService = async (userId, competenceId, data) => {
    const existing = await prisma.userCompetence.findUnique({
        where: { userId_competenceId: { userId, competenceId } }
    });

    if (!existing) {
        throw new Error('UserCompetence not found');
    }

    return await prisma.userCompetence.update({
        where: { userId_competenceId: { userId, competenceId } },
        data: { level: data.level },
        include: { competence: true }
    });
};

export const deleteUserCompetenceService = async (userId, competenceId) => {
    const existing = await prisma.userCompetence.findUnique({
        where: { userId_competenceId: { userId, competenceId } }
    });

    if (!existing) {
        throw new Error('UserCompetence not found');
    }

    await prisma.userCompetence.delete({
        where: { userId_competenceId: { userId, competenceId } }
    });
};