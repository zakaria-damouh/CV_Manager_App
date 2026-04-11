import axiosClient from "@/api/axios";
import ProfileSection from "@/components/clientComponents/Profile/ProfileSection";
import ProfileForm from "@/components/profilFormComponents/ProfileForm";
import { useEffect, useState } from "react";


function ProfilePage() {
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(false);

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const res = await axiosClient.get("/profile/user");
            setUserData(res.data);
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
     <ProfileSection userData={userData} />
     :
     <ProfileForm userData={userData} />
    }

    </>
  )
}
export default ProfilePage;