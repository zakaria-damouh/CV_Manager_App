import prisma from "../config/db.js";

export const getFormationsService = async (userId) => {
    const formations = await prisma.formation.findMany({
        where: { userId }
    });


    return formations;
};

export const getFormationByIdService = async (formationId, userId) => {
    const formation = await prisma.formation.findUnique({
        where: { id: formationId }
    });
    if (!formation) {
        throw new Error('Formation not found');
    }
    if (formation.userId !== userId) {
        throw new Error('Unauthorized');
    }
    return formation;
};


export const createFormationService = async (userId, formationData) => {

    const formation = await prisma.formation.create({
        data: { 
            userId,
            ...formationData
        }
    });
    return formation;
};

export const updateFormationService = async (formationId, userId, formationData) => {

    // 1 - check if formation exists
    const existingFormation = await prisma.formation.findUnique({
        where: { id: formationId }
    });
    if (!existingFormation) {
        throw new Error('Formation not found');
    }

    // 2 - check if formation belongs to user
    if (existingFormation.userId !== userId) {
        throw new Error('Unauthorized');
    }

    // 3 - update formation
    const formation = await prisma.formation.update({
        where: { id: formationId },
        data: formationData
    });
    return formation;
};

export const deleteFormationService = async (formationId, userId) => {

    // 1 - check if formation exists   
    const existingFormation = await prisma.formation.findUnique({
        where: { id: formationId }
    });
    if (!existingFormation) {
        throw new Error('Formation not found');
    }

    // 2 - check if formation belongs to user
    if (existingFormation.userId !== userId) {
        throw new Error('Unauthorized');
    }   
    // 3 - delete formation
    await prisma.formation.delete({
        where: { id: formationId }
    });

};
