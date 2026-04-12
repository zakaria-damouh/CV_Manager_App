import axiosClient from "@/api/axios";
import ProfileSection from "@/components/clientComponents/Profile/ProfileSection";
import ProfileForm from "@/components/profilFormComponents/ProfileForm";
import { useEffect, useState } from "react";


function ProfilePage() {
   const [userData, setUserData] = useState(null);
   const [experiences, setExperiences] = useState([]);
   const [formations, setFormations] = useState([]);
   const [competences, setCompetences] = useState([]);
   const [langues, setLangues] = useState([]);
   const [loading, setLoading] = useState(false);

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const res = await axiosClient.get("/profile/user");
            setUserData(res.data);
                setExperiences(res.data.experiences || []);
                setFormations(res.data.formations || []);
                setCompetences(res.data.userCompetences || []);
                setLangues(res.data.langues || []);
        } catch (error) {
            console.error("Erreur:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <>
    {userData?.profile ?
     <ProfileSection userData={userData} 
        experiences={experiences} 
        formations={formations} 
        competences={competences} 
        langues={langues}
        setUserData={setUserData}
        setExperiences={setExperiences}
        setFormations={setFormations}
        setCompetences={setCompetences}
        setLangues={setLangues}
        />
     :
     <ProfileForm  />
    }

    </>
  )
}
export default ProfilePage;