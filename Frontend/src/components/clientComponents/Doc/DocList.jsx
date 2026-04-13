import axiosClient from "@/api/axios";
import { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import { RiLoader2Fill } from "react-icons/ri";

function DocumentList({ documents, setDocuments ,loading , error}) {



  const handleDelete = async (doc) => {
    try {
      await axiosClient.delete(`/documents/${doc.id}`);

      // update UI
      setDocuments((prev) =>
        prev.filter((d) => d.id !== doc.id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <RiLoader2Fill className="animate-spin text-3xl text-blue-600" />
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  // ✅ Empty state
  if (documents.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No documents found.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          doc={doc}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default DocumentList;