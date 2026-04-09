import prisma from "../config/db.js";


export const getOffresService = async (userId) => {
    const offres = await prisma.offre.findMany({
        where: { userId: userId }
    });
    return offres;
}

export const getOffreByIdService = async (userId, offreId) => {
    const offre = await prisma.offre.findUnique({
        where: { id: offreId }
    });
    if (!offre) {
        throw new Error('Offre not found');
    }
    if (offre.userId !== userId) {
        throw new Error('Unauthorized to access this offre');
    }
    return offre;
}

export const createOffreService = async (userId, data) => {
    const offre = await prisma.offre.create({
        data: {
            ...data,
            userId
        }
    });
    return offre;
}


export const deleteOffreService = async (userId, offreId) => {
    const existingOffre = await prisma.offre.findUnique({
        where: { id: offreId }
    });

    if (!existingOffre) {
        throw new Error('Offre not found');
    }
    if (existingOffre.userId !== userId) {
        throw new Error('Unauthorized to delete this offre');
    }

    await prisma.offre.delete({
        where: { id: offreId }
    });
    return;
}