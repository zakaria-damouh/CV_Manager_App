import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiOutlinePencil, HiOutlineGlobe } from "react-icons/hi";
import LangueForm from "@/components/profilFormComponents/LanguageForm";

function LanguageCard({ language, onSubmit, loading }) {
  if (!language) return null;

const getLevelColor = (level) => {
  switch (level) {
    case "Native":
      return "bg-blue-100 text-blue-700";

    case "Basic":
      return "bg-gray-100 text-gray-600";

    case "Intermediate":
      return "bg-yellow-100 text-yellow-700";

    case "Advanced":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-white hover:shadow-sm transition">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <HiOutlineGlobe size={20} />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {language.name}
          </p>
          <Badge className={`mt-1 ${getLevelColor(language.level)}`}>
            {language.level}
          </Badge>
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
          <LangueForm
            initialData={language}
            onSubmit={onSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LanguageCard;