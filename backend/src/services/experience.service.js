import prisma from "../config/db.js";

export const getExperiencesService = async (userId) => {

    const experiences = await prisma.experience.findMany({
        where: { userId }
    });

    return experiences;
};


export const getExperienceByIdService = async (experienceId, userId) => {

    const experience = await prisma.experience.findUnique({
        where: { id: experienceId }
    });

    if (!experience) {
        throw new Error('Experience not found');
    }

    if (experience.userId !== userId) {
        throw new Error('Unauthorized');
    }

    return experience;
};


export const createExperienceService = async (userId, data) => {
    const experience = await prisma.experience.create({
        data: {
            userId,
            ...data
        }
    });

    return experience;
};


export const updateExperienceService = async (experienceId, userId, data) => {

    // 1 - check if experience exists
    const existingExperience = await prisma.experience.findUnique({
        where: { id: experienceId }
    });
    if (!existingExperience) {
        throw new Error('Experience not found');
    }

    // 2 - check if experience belongs to user
    if (existingExperience.userId !== userId) {
        throw new Error('Unauthorized');
    }

    // 3 - update experience
    const experience = await prisma.experience.update({
        where: { id: experienceId },
        data
    });

    return experience;
}


export const deleteExperienceService = async (experienceId, userId) => {

    // 1 - check if experience exists   
    const existingExperience = await prisma.experience.findUnique({
        where: { id: experienceId }
    });
    if (!existingExperience) {
        throw new Error('Experience not found');
    }

    // 2 - check if experience belongs to user
    if (existingExperience.userId !== userId) {
        throw new Error('Unauthorized');
    }   

    // 3 - delete experience
    await prisma.experience.delete({
        where: { id: experienceId }
    });
}  