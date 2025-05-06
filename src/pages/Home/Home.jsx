import Navbar from "../../global/components/Navbar.jsx";
import AboutSection from "./components/AboutSection.jsx";
import GuidanceSection from "./components/GuidanceSection.jsx";
import Hero from "./components/Hero.jsx";
import StepsSection from "./components/StepsSection.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <GuidanceSection />
      <AboutSection />
      <StepsSection />
    </>
  );
}
