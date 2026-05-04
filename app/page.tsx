import Activity from "@/Components/Activity";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
import Herosection from "../Components/Herosection";
import Contact from "@/Components/Contact";
import Skills from "@/Components/Skills";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <>
      <section id="hero">
        <Herosection />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="activity" className="relative">
        <Activity />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
}
