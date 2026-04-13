import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

import {
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function DocumentCard({ doc, onDelete }) {
  if (!doc) return null;

  const { type, aiModelUsed, createdAt } = doc;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const navigate = useNavigate();

    const handleView = () => {
        navigate(`/dashboard/documents/${doc.id}`);
    }

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-white hover:shadow-sm transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <HiOutlineDocumentText size={20} />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {type}
          </p>

            <Badge variant="outline">
              {aiModelUsed}
            </Badge>

            <div className="flex items-center gap-1 pt-2">
              <HiOutlineClock size={14} className="text-gray-500" />
              <span className="text-xs text-gray-500 ml-1">
                {formatDate(createdAt)}
              </span>
            </div>
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2">

        {/* View */}
        <Button
        className={"cursor-pointer"}
          size="icon"
          variant="secondary"
          onClick={handleView}
        >
          <HiOutlineEye size={18} />
        </Button>

        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-red-100 cursor-pointer"
            >
              <HiOutlineTrash  className="text-red-600" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete document?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this document.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={() => onDelete?.(doc)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}

export default DocumentCard;