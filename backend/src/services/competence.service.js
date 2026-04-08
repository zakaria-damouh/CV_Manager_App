import prisma from "../config/db.js";


export const getCompetencesService = async (userId) => {
    const competences = await prisma.competence.findMany({
        where: { userId }
    });

    return competences;
}

export const getCompetenceByIdService = async (competenceId) => {

    const competence = await prisma.competence.findUnique({
        where: { id: competenceId }
    });

    if (!competence) {
        throw new Error('Competence not found');
    }

    return competence;
}

export const createCompetenceService = async (userId, data) => {


    const competence = await prisma.competence.create({
        data: {
            ...data,
            userId
        }
    });

    return competence;
};

export const updateCompetenceService = async (competenceId, userId, data) => {

    // 1 - check if competence exists
    const existingCompetence = await prisma.competence.findUnique({
        where: { id: competenceId }
    });

    if (!existingCompetence) {
        throw new Error('Competence not found');
    }

    if (existingCompetence.userId !== userId) {
        throw new Error('Unauthorized');
    }

    const updatedCompetence = await prisma.competence.update({
        where: { id: competenceId },
        data: {
            ...data
        }
    });

    return updatedCompetence;
};

export const deleteCompetenceService = async (competenceId, userId) => {
    // 1 - check if competence exists
    const existingCompetence = await prisma.competence.findUnique({
        where: { id: competenceId }
    });

    if (!existingCompetence) {
        throw new Error('Competence not found');
    }

    if (existingCompetence.userId !== userId) {
        throw new Error('Unauthorized');
    }
    await prisma.competence.delete({
        where: { id: competenceId }
    });
};