import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePlus, HiOutlineBriefcase } from "react-icons/hi";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "@/components/profilFormComponents/ExperienceForm";

function ExperienceList({
  experiences = [],
  setExperiences,
}) {
  const [open, setOpen] = useState(false);
  const sortedExperiences = [...experiences].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="space-y-6 mt-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HiOutlineBriefcase className="text-gray-600" size={22} />
          <h2 className="text-2xl font-bold text-gray-900">
            Experience
          </h2>
        </div>

        {/* Add Experience */}
        {sortedExperiences.length > 0 &&
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl flex items-center gap-2">
                <HiOutlinePlus size={18} />
                Add Experience
              </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-4xl">
              <ExperienceForm
                setExperiences={setExperiences}
                setOpen={setOpen}
              />
            </DialogContent>
          </Dialog>
        }
      </div>

      {/* Empty State */}
      {sortedExperiences.length === 0 && (
        <Card className="border-dashed border-2 border-gray-200 rounded-2xl">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            <HiOutlineBriefcase size={40} className="text-gray-400 mb-3" />

            <h3 className="text-lg font-semibold text-gray-700">
              No experiences yet
            </h3>

            <p className="text-gray-500 text-sm mt-1 mb-4">
              Start adding your work experience to build your profile.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl flex items-center gap-2">
                  <HiOutlinePlus size={18} />
                  Add your first experience
                </Button>
              </DialogTrigger>

              <DialogContent className="!max-w-4xl">
                <ExperienceForm
                  setExperiences={setExperiences}
                  setOpen={setOpen}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

    {/* List */}
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch">
    {sortedExperiences.map((exp) => (
        <div
        key={exp.id}
         className="h-full transition-all duration-300 "
        >
        <ExperienceCard
            experience={exp}
            setExperiences={setExperiences}
        />
        </div>
    ))}
    </div>

    </div>
  );
}

export default ExperienceList;