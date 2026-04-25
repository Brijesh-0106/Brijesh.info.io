import Image from "next/image";
import img from "../app/Utils/ChatGPT Image Apr 25, 2026, 04_50_59 PM.png";
import HeroBackground from "./HeroBackground";
import Navbar from "./Navbar";

export default function Herosection() {
  return (
    <>
      <div className="flex justify-center text-white relative h-screen w-100%">
        <div className="w-[80%]">
          <Navbar />
          <div className="z-11 top-50 flex flex-col left-110 absolute">
            <div className="backdrop-blur-md flex gap-20 h-74 justify-center items-center bg-white/5 p-6 rounded-xl border border-white/10">
              <div>
                <h1 className=" text-4xl font-semibold font-[montserrat_alternates]">
                  Hi, I'm{" "}
                  <div className="text-transparent my-2 font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Shah Brijesh
                  </div>
                </h1>
                <p className="text-3xl font-semibold mb-10 mt-2 font-[montserrat_alternates]">
                  Software Engineer.
                </p>
                <span className="badge px-4 py-2 text-xl mt-8 border rounded-2xl font-extrabold z-11 text-green-700 font-[montserrat_alternates]">
                  available for Work
                </span>
              </div>
              <div className="z-111 top-40 right-100">
                <Image
                  width={284}
                  height={284}
                  alt="Profile Image"
                  src={img}
                  className="w-[224px] h-62 object-cover rounded-md border"
                />{" "}
                {/* Glow */}
                <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 rounded-2xl"></div>
              </div>
            </div>
          </div>

          <HeroBackground />
        </div>
      </div>
    </>
  );
}
