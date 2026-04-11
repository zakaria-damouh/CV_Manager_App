import prisma from '../config/db.js';

export const createProfileService = async (userId, data) => {

  // 1 - check if profile already exists
  const existingProfile = await prisma.profile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error('Profile already exists');
  }

  // 2 - create profile
  const profile = await prisma.profile.create({
    data: {
      userId,
      ...data
    }
  });

  return profile;
};

export const getUserService = async (userId) => {
    const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      profile: true,
      experiences: {
        include: {
          experienceCompetences: {
            include: { competence: true }
          }
        }
      },
      formations: true,
      langues: true,
      userCompetences: {
        include: { competence: true }
      },
    }
  });

  if (!user) throw new Error('User not found');

  return user;
};

export const getProfileService = async (userId) => {

  const profile = await prisma.profile.findUnique({
    where: { userId }
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
};

export const updateProfileService = async (userId, data) => {

  // 1 - check if profile exists
  const existingProfile = await prisma.profile.findUnique({
    where: { userId }
  });
  if (!existingProfile) {
    throw new Error('Profile not found');
  }

  // 2 - update profile
  const profile = await prisma.profile.update({
    where: { userId },
    data
  });

  return profile;
};