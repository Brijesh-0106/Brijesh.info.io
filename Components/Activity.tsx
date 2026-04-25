"use client";
import dynamic from "next/dynamic";
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);
export default function Activity() {
  return (
    <>
      <div
        style={{ padding: "20px", position: "relative" }}
        className="flex flex-col gap-4 items-center"
      >
        <h2 style={{ marginBottom: "10px" }} className="text-white">
          GitHub
        </h2>
        <GitHubCalendar
          username="Brijesh-0106"
          showColorLegend={false}
          className="text-white"
          year={2026}
          colorScheme="dark"
        />
        Hi
      </div>
    </>
  );
}
