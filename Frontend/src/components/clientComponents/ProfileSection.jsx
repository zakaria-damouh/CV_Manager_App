import axiosClient from "@/api/axios";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileElements/ProfileCard";


function ProfileSection() {
    const [profileData, setProfileData] = useState(null);

    const fetchProfileData = async () => {
        try {
            const res = await axiosClient.get("/profile");
            setProfileData(res.data);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);
  return (
    <div className="profile-section">
      <h2>Profile Section</h2>
      {/* Add profile details and settings here */}
      <ProfileCard profile={profileData} />
    </div>
  );
}

export default ProfileSection;