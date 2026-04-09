import { createFormationService, deleteFormationService, getFormationByIdService, getFormationsService, updateFormationService } from "../services/formation.service.js";


export const getFormations = async (req, res) => {
  try {
    const formations = await getFormationsService(req.user.userId);
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFormationById = async (req, res) => {
  try {
    const formationId = parseInt(req.params.id);    
    const formation = await getFormationByIdService(formationId, req.user.userId);
    res.status(200).json(formation);
  } catch (error) {
    if (error.message === "Formation not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const createFormation = async (req, res) => {
  try {
    const formation = await createFormationService(req.user.userId, req.body);
    res.status(201).json({ message: "Formation created successfully", formation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFormation = async (req, res) => {
  try {
    const formationId = parseInt(req.params.id);
    const formation = await updateFormationService(formationId, req.user.userId, req.body);
    res.status(200).json({ message: "Formation updated successfully", formation });
  } catch (error) {
    if (error.message === "Formation not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};


export const deleteFormation = async (req, res) => {
  try {
    const formationId = parseInt(req.params.id);
    await deleteFormationService(formationId, req.user.userId);
    res.status(200).json({ message: "Formation deleted successfully" });
  } catch (error) {
    if (error.message === "Formation not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};