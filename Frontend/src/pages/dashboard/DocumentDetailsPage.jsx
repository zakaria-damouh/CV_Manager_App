import axiosClient from "@/api/axios";
import ApplicationEmailPreview from "@/components/clientComponents/Doc/documentPreviews/ApplicationEmailPreview";
import CoverLetterPreview from "@/components/clientComponents/Doc/documentPreviews/CoverLetterPreview";
import CVPreview from "@/components/clientComponents/Doc/documentPreviews/CVPreview";
import ProfileSummaryPreview from "@/components/clientComponents/Doc/documentPreviews/ProfileSummaryPreview";

import { useEffect, useState } from "react";
import { FaFileAlt, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

// ✅ shadcn AlertDialog
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const previewMap = {
  CV: CVPreview,
  cover_letter: CoverLetterPreview,
  profile_summary: ProfileSummaryPreview,
  application_email: ApplicationEmailPreview,
};

function DocumentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [documentDetails, setDocumentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchDocumentDetails = async () => {
    try {
      const res = await axiosClient.get(`/documents/${id}`);
      setDocumentDetails(res.data);
    } catch (err) {
      setError(err.message || "Failed to fetch document details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axiosClient.delete(`/documents/${id}`);
      navigate("/dashboard/documents"); 
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const PreviewComponent = previewMap[documentDetails.type];

  return (
    <div className="min-h-screen py-10 px-4">
      
      {/* Header */}
        <h1 className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-6">
          <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <FaFileAlt />
          </span>
          Documents Details
        </h1>

    

      {/* Preview */}
      {PreviewComponent ? (
        <>
            <PreviewComponent document={documentDetails} />
            
            <div className="flex justify-end mt-6">
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    <FaTrash />
                    Supprimer
                    </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>
                        Supprimer ce document ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible. Le document sera définitivement supprimé.
                    </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleting}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {deleting ? "Suppression..." : "Supprimer"}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
      ) : (
        <div className="text-gray-500">
          No preview available for this document type.
        </div>
      )}

      
    </div>
  );
}

export default DocumentDetailsPage;