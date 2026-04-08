import prisma from "../config/db.js";


export const getOffresService = async () => {
    const offres = await prisma.offre.findMany();
    return offres;
}

export const getOffreByIdService = async (offreId) => {
    const offre = await prisma.offre.findUnique({
        where: { id: offreId }
    });
    if (!offre) {
        throw new Error('Offre not found');
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

export const updateOffreService = async (userId, offreId, data) => {
    const existingOffre = await prisma.offre.findUnique({
        where: { id: offreId }
    });
    if (!existingOffre) {
        throw new Error('Offre not found');
    }
    if (existingOffre.userId !== userId) {
        throw new Error('Unauthorized to update this offre');
    }

    const updatedOffre = await prisma.offre.update({
        where: { id: offreId },
        data
    });
    return updatedOffre;
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