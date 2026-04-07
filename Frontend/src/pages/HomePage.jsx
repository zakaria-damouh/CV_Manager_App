import AboutUs from "@/components/homeComponents/AboutUs";
import HeroSection from "@/components/homeComponents/HeroSection";
import Roadmap from "@/components/homeComponents/Roadmap";



function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Roadmap />
    </div>
  );
}

export default HomePage;