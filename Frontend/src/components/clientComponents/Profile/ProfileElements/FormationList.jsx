import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePlus } from "react-icons/hi";
import FormationCard from "./FormationCard";
import FormationForm from "@/components/profilFormComponents/FormationForm";

function FormationList({ formations = [], setFormations }) {
  const [open, setOpen] = useState(false);
  const sorted = [...formations].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  return (
    <div className="space-y-8 mt-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Education
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 rounded-xl">
              <HiOutlinePlus size={18} />
              Add formation
            </Button>
          </DialogTrigger>

          <DialogContent className="!max-w-4xl">
            <FormationForm setOpen={setOpen} setFormations={setFormations} />
          </DialogContent>
        </Dialog>
      </div>

      {/* TIMELINE */}
      <div className="relative border-l border-gray-200 pl-6 space-y-6">

        {sorted.map((formation) => (
          <div key={formation.id} className="relative">

            {/* Dot */}
            <div className="absolute -left-[9px] top-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />

            {/* Card */}
            <FormationCard
              formation={formation}
              setFormations={setFormations}
            />
          </div>
        ))}

        {/* Empty */}
        {sorted.length === 0 && (
          <p className="text-gray-500 text-sm">
            No education added yet.
          </p>
        )}
      </div>

    </div>
  );
}

export default FormationList;