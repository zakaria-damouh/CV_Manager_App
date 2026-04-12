import axiosClient from "@/api/axios";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileElements/ProfileCard";
import ExperienceList from "./ProfileElements/ExperienceList";
import FormationList from "./ProfileElements/FormationList";
import LanguageList from "./ProfileElements/LanguageList";
import CompetenceList from "./ProfileElements/CompetenceList";
import { FaUser } from "react-icons/fa";


function ProfileSection({userData , experiences, formations, competences, langues , setUserData, setExperiences, setFormations, setCompetences, setLangues}) {
   
  return (
<div className="min-h-screen  py-10 px-4">
 <h1 className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
  <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
    <FaUser />
  </span>
  Profile
</h1>
  <div className="max-w-full mx-auto space-y-6">

    <div className="bg-white rounded-2xl ">
      <ProfileCard 
        user={userData}
        setUserData={setUserData}
        profile={userData?.profile}
      />
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <CompetenceList competences={competences} setCompetences={setCompetences} />
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <ExperienceList experiences={experiences} setExperiences={setExperiences} />
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <FormationList formations={formations} setFormations={setFormations} />
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <LanguageList languages={langues} setLangues={setLangues} />
    </div>

  </div>
</div>
  );
}

export default ProfileSection;