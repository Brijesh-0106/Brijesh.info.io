import Activity from "@/Components/Activity";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
import Herosection from "../Components/Herosection";

export default function Home() {
  return (
    <>
      {/* <div className="relative"> */}
      <Herosection />
      <Experience />
      <Projects />
      {/* </div> */}
      {/* <Exp />
      <Skills /> */}
      {/* <Works /> */}
      <div className="relative">
        <Activity />
      </div>
      {/* <QnA />
      <Contact /> */}
    </>
  );
}
