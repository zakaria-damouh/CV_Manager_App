import { createExperienceService, deleteExperienceService, getExperienceByIdService, getExperiencesService, updateExperienceService } from "../services/experience.service.js";


export const getExperience = async (req, res) => {
  try {
    const experiences = await getExperiencesService(req.user.userId);

    res.status(200).json(experiences);
  } catch (error) {
     if (error.message === "Experiences not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};


export const getExperienceById = async (req, res) => {
  try {
    const experienceId = parseInt(req.params.id);

    const experience = await getExperienceByIdService(
      experienceId,
      req.user.userId
    );

    res.status(200).json(experience);
  } catch (error) {
    if (error.message === "Experience not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};


export const createExperience = async (req, res) => {
  try {
    const experience = await createExperienceService(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};


export const updateExperience = async (req, res) => {
  try {
    const experienceId = parseInt(req.params.id);

    const experience = await updateExperienceService(
      experienceId,
      req.user.userId,
      req.body
    );

    res.status(200).json({
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    if (error.message === "Experience not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};


export const deleteExperience = async (req, res) => {
  try {
    const experienceId = parseInt(req.params.id);

    await deleteExperienceService(
      experienceId,
      req.user.userId
    );

    res.status(200).json({
      message: "Experience deleted successfully",
    });
  } catch (error) {
    if (error.message === "Experience not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};