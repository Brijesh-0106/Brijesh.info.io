"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    //  <div className="backdrop-blur-md  h-96 bg-white/5 p-6 rounded-xl border border-white/10"></div>
    <>
      <nav className="text-white absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 ">
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl rounded-xl px-10 py-3 flex gap-10">
            {[
              { name: "Experience", path: "/experience" },
              { name: "Projects", path: "/info/projects" },
              { name: "Activity", path: "/activity" },
              { name: "Q&A", path: "/qa" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative hover:text-purple-400 transition`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
