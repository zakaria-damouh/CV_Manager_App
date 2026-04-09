import { deleteDocumentService, generateDocumentService, getDocumentByIdService, getDocumentsService, updateDocumentService } from "../services/document.service.js";



export const generateDocument = async (req, res) => {
  try {
    const { userId } = req.user;
    const { type, offreId } = req.body;

    const document = await generateDocumentService(userId, type, offreId);

    res.status(201).json(document);
  } catch (error) {
    if (error.message === "Please create your profile before generating documents") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "Job offer not found") {
      return res.status(404).json({ error: error.message });
    }
  
    res.status(500).json({ error: error.message });
  }
};

export const getDocuments = async (req, res) => {
    try {
        const documents = await getDocumentsService(req.user.userId);
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const documentId = parseInt(req.params.id);
        const document = await getDocumentByIdService(req.user.userId, documentId);
        res.json(document);
    } catch (error) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
            return res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};


export const updateDocument = async (req, res) => {
    try {
        const { userId } = req.user;
        const { content} = req.body;
        const documentId = parseInt(req.params.id);
        const document = await updateDocumentService(userId, documentId, content);
        res.json(document);
    } catch (error) {
        if (error.message === 'Document not found') {
           return  res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
           return  res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const documentId = parseInt(req.params.id);
        await deleteDocumentService(req.user.userId, documentId);
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        if (error.message === 'Document not found') {
           return  res.status(404).json({ error: error.message });
        }
        if (error.message === 'Unauthorized') {
           return  res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};