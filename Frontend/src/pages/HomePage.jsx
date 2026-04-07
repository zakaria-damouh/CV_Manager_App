import AboutUs from "@/components/homeComponents/AboutUs";
import HeroSection from "@/components/homeComponents/HeroSection";
import Roadmap from "@/components/homeComponents/Roadmap";



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