import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePlus } from "react-icons/hi";
import CompetenceCard from "./CompetenceCard";
import CompetenceForm from "@/components/profilFormComponents/Competence";

function CompetenceList({ competences = [], onSubmit, loading }) {
  return (
    <div className="space-y-5 mt-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Skills
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2 rounded-lg">
              <HiOutlinePlus size={16} />
              Add
            </Button>
          </DialogTrigger>

          <DialogContent>
            <CompetenceForm onSubmit={onSubmit} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills Cloud */}
      <div className="flex flex-wrap gap-3">
        {competences.map((item) => (
          <div key={item.competenceId} className="w-full sm:w-[48%] lg:w-[32%]">
            <CompetenceCard
              item={item}
              onSubmit={onSubmit}
              loading={loading}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export default CompetenceList;