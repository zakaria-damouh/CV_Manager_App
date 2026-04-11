import { createProfileService, getProfileService, getUserService, updateProfileService } from "../services/profile.service.js";

export const createProfile = async (req, res) => {
  try {
    const profile = await createProfileService(req.user.userId, req.body);
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await getProfileService(req.user.userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await updateProfileService(req.user.userId, req.body);
    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};