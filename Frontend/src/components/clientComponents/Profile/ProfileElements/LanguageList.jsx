import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePlus } from "react-icons/hi";
import LanguageCard from "./LanguageCard";
import LangueForm from "@/components/profilFormComponents/LanguageForm";

function LanguageList({ languages = [], setLangues}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5 mt-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Languages
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2 rounded-lg">
              <HiOutlinePlus size={16} />
              Add Langue
            </Button>
          </DialogTrigger>

          <DialogContent>
            <LangueForm setLangues={setLangues} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {languages.map((lang) => (
          <LanguageCard
            key={lang.id}
            language={lang}
            setLangues={setLangues}
          />
        ))}
      </div>

    </div>
  );
}

export default LanguageList;