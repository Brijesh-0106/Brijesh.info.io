"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <nav className="text-white w-2xl bg-indigo-600 rounded-lg mx-auto p-3 mt-6 px-8">
        <ul className="flex justify-around">
          <Link href="/experience">Experience</Link>
          <Link href="/info/projects">Projects</Link>
          <Link href="/activity">Activity</Link>
          <Link href="/qa">Q&A</Link>
          <Link href="/contact">Contact</Link>
        </ul>
      </nav>
    </>
  );
}
