import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
} from "react-icons/hi";

function DocumentCard({ doc, onView, onDelete }) {
  if (!doc) return null;

  const { type, aiModelUsed, createdAt } = doc;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Card className="group rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <CardContent className="p-5 flex flex-col h-full justify-between">

        {/* TOP */}
        <div className="flex items-start justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
              <HiOutlineDocumentText size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {type}
              </h2>

              <p className="text-xs text-gray-500">
                Generated with {aiModelUsed}
              </p>
            </div>
          </div>

          <Badge
            variant="secondary"
            className="text-xs bg-gray-100 text-gray-600"
          >
            AI
          </Badge>
        </div>

        {/* META */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <HiOutlineClock size={14} />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-5 flex items-center gap-2">

          <Button
            className="flex-1"
            size="sm"
            onClick={() => onView?.(doc)}
          >
            View
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                🗑
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

      </CardContent>
    </Card>
  );
}

export default DocumentCard;