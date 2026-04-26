import Image from "next/image";
import img from "../app/Utils/ChatGPT Image Apr 25, 2026, 04_50_59 PM.png";
import HeroBackground from "./HeroBackground";
import Navbar from "./Navbar";

export default function Herosection() {
  return (
    <>
      <div className="flex justify-center text-white relative h-screen w-100%">
        <div className="w-[70%]">
          <Navbar />
          <div
            className="z-11 top-50 flex flex-col absolute"
            style={{ left: "404px" }}
          >
            <div className="backdrop-blur-md flex gap-20 h-74 justify-center items-center bg-white/5 p-6 rounded-xl border border-white/10">
              <div>
                <h1 className=" text-5xl font-semibold font-[montserrat_alternates]">
                  Hi, I'm{" "}
                  <div className="text-transparent my-2 font-semibold bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                    Shah Brijesh
                  </div>
                </h1>
                <p className="text-4xl font-semibold mb-8 mt-2 font-[montserrat_alternates]">
                  Software Engineer.
                </p>
                <div className="text-green-500 gap-1 flex items-center font-xl rounded-2xl ">
                  <span className="bg-green-500 rounded-full w-2 h-2"></span>{" "}
                  <span className="text-md">Open for new Opportunities</span>
                </div>
                {/* <span className="badge px-4 py-2 items-center gap-1 text-md mt-8 border rounded-2xl font-extrabold flex flex-row z-11 text-green-700 font-[montserrat_alternates]">
                  <span className="bg-green-700 rounded-full w-[8px] h-[8px]"></span>{" "}
                  <span>open for New Opportunities</span>
                </span> */}
              </div>
              <div className="z-111 top-40 right-100">
                <Image
                  width={284}
                  height={284}
                  alt="Profile Image"
                  src={img}
                  className="w-56 h-62 object-cover rounded-md border"
                />{" "}
                {/* Glow */}
              </div>
            </div>
          </div>

          <HeroBackground />
        </div>
      </div>
    </>
  );
}
