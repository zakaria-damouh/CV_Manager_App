import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiOutlinePencil, HiOutlineCode } from "react-icons/hi";
import CompetenceForm from "@/components/profilFormComponents/Competence";

function CompetenceCard({ item, onSubmit, loading }) {
  if (!item) return null;

  const { competence, level } = item;

  const levelColor = {
    Beginner: "bg-gray-100 text-gray-600",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-green-100 text-green-700",
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-white hover:shadow-sm transition">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
          <HiOutlineCode size={20} />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {competence.name}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{competence.category}</Badge>
            <Badge className={levelColor[level]}>
              {level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Edit */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <HiOutlinePencil size={18} />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <CompetenceForm
            initialData={item}
            onSubmit={onSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CompetenceCard;