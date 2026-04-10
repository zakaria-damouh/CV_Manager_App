import { adaptService, reformulateService, suggestService } from "../services/ai.service.js";


export const reformulateExperience =  async (req , res) => {
  try {
    const { description } = req.body;
    const result = await reformulateService(description);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reformulate experience' });
  }
};

export const adaptDocument = async (req, res) => {
  try {
    const userId = req.user.userId;
    const documentId = parseInt (req.body.documentId);
    const offreId = parseInt (req.body.offreId);
    const result = await adaptService(userId, documentId, offreId);
    res.json(result);
  } catch (error) {
    if (error.message === 'Document not found') {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ error: error.message });
    }
    if (error.message === 'Job offer not found') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Failed to adapt document' });
  }
};

export const suggestImprovements = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await suggestService(userId);
    res.json(result);
  } catch (error) {
    if (error.message === 'Please create your profile first') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Failed to suggest improvements' });
  }
};