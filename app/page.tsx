import Exp from "@/Components/Exp";
import Skills from "@/Components/Skills";
import Works from "@/Components/Works";
import Activity from "../Components/Activity";
import Contact from "../Components/Contact";
import Herosection from "../Components/Herosection";
import QnA from "../Components/QnA";

export default function Home() {
  return (
    <>
      <Herosection />

      <Exp />
      <Skills />
      <Works />
      <Activity />
      <QnA />
      <Contact />
    </>
  );
}
