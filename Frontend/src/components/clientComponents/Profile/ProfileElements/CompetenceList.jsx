import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi";
import CompetenceCard from "./CompetenceCard";
import CompetenceForm from "@/components/profilFormComponents/Competence";
import CompetenceSelector from "@/components/profilFormComponents/CompetenceSelector";

function CompetenceList({ competences = [], setUserCompetences }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 mt-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Skills
        </h2>

        {competences.length > 0 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2 rounded-lg">
                <HiOutlinePlus size={16} />
                Add Skills
              </Button>
            </DialogTrigger>

            <DialogContent >
              <CompetenceSelector setUserCompetences={setUserCompetences} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Empty State */}
      {competences.length === 0 && (
        <Card className="border-dashed border-2 border-gray-200 rounded-2xl">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            <HiOutlineSparkles size={40} className="text-gray-400 mb-3" />

            <h3 className="text-lg font-semibold text-gray-700">
              No skills yet
            </h3>

            <p className="text-gray-500 text-sm mt-1 mb-4">
              Add your skills to highlight your strengths.
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl flex items-center gap-2">
                  <HiOutlinePlus size={18} />
                  Add your first skill
                </Button>
              </DialogTrigger>

              <DialogContent>
                <CompetenceSelector setUserCompetences={setUserCompetences} setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* Skills List */}
      {competences.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {competences.map((item) => (
            <div
              key={item.competenceId}
              className="w-full sm:w-[48%] lg:w-[32%]"
            >
              <CompetenceCard
                item={item}
                setUserCompetences={setUserCompetences}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CompetenceList;