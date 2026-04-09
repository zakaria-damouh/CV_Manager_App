import prisma from "../config/db.js";


export const getLanguesService = async (userId) => { 
    const langues = await prisma.langue.findMany({
        where: { userId: userId }
    });
    return langues;
}

export const getLangueByIdService = async (userId ,langueId) => {
    const langue = await prisma.langue.findUnique({
        where: { id: langueId }
    });
    if (!langue) {
        throw new Error('Langue not found');
    }

    if (langue.userId !== userId) {
        throw new Error('Unauthorized to access this langue');
    }
    return langue;
}

export const createLangueService = async (userId, data) => {
    const langue = await prisma.langue.create({
        data: {
            userId,
            ...data
        }
    });
    return langue;
}

export const updateLangueService = async (userId ,langueId, data) => {
    // 1 - check if langue exists
    const existingLangue = await prisma.langue.findUnique({
        where: { id: langueId }
    });
    if (!existingLangue) {
        throw new Error('Langue not found');
    }
    if (existingLangue.userId !== userId) {
        throw new Error('Unauthorized to update this langue');
    }

    const updatedLangue = await prisma.langue.update({
        where: { id: langueId },
        data
    });
    return updatedLangue;
}

export const deleteLangueService = async (userId, langueId) => {
    // 1 - check if langue exists
    const existingLangue = await prisma.langue.findUnique({
        where: { id: langueId }
    });

    if (!existingLangue) {
        throw new Error('Langue not found');
    }
    if (existingLangue.userId !== userId) {
        throw new Error('Unauthorized to delete this langue');
    }
    await prisma.langue.delete({
        where: { id: langueId }
    });
}