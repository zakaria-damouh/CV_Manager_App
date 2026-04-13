import { FaFileAlt } from "react-icons/fa";
import DocumentList from "@/components/clientComponents/Doc/DocList";
import DocumentForm from "@/components/profilFormComponents/DocumentForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axiosClient from "@/api/axios";

function DocumentPage() {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchDocuments = async () => {
    try {
      const res = await axiosClient.get("/documents");
      setDocuments(res.data);
    } catch (error) {
      setError("Failed to fetch documents.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">

        <h1 className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
          <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <FaFileAlt />
          </span>
          Documents
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="" className="flex items-center gap-2 rounded-lg">
              + Add New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new document.
              </DialogDescription>
            </DialogHeader>
            <DocumentForm setDocuments={setDocuments} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <DocumentList documents={documents} setDocuments={setDocuments} loading={loading} error={error} />
    </div>
  );
}

export default DocumentPage;