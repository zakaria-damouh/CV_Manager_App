import AboutUs from "@/components/homeComponents/AboutUs";
import HeroSection from "@/components/homeComponents/HeroSection";
import Roadmap from "@/components/homeComponents/Roadmap";
import ProfileForm from "@/components/profilFormComponents/ProfileForm";



function HomePage() {
  return (
    <div >
      <HeroSection />
      <Roadmap />
      <AboutUs />
    </div>
  );
}

export default HomePage;