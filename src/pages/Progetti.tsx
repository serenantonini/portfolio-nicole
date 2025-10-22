import React, { useState, FC } from "react";
import Layout from "@/components/Layout";

import Miserere from "@/components/projects/Miserere";
import Etranger from "@/components/projects/Etranger";
import Paths from "@/components/projects/Paths";
import Rammendo from "@/components/projects/Rammendo";
import AIGenerated from "@/components/projects/AIGenerated";
import Somnium from "@/components/projects/Somnium";
import Memoria from "@/components/projects/Memoria";
import Areyou from "@/components/projects/Areyou";
import ProjectDropdown from "@/components/ProjectDropDown";



export type ProjectInfo = {
  id: number;
  title: string;
  year: number;
  component: FC;
};

const projects: ProjectInfo[] = [
  { id: 1, title: "Miserere", year: 2025, component: Miserere },
  { id: 2, title: "Étranger", year: 2025, component: Etranger },
  { id: 3, title: "Paths", year: 2025, component: Paths },
  { id: 4, title: "Rammendo", year: 2025, component: Rammendo },
  { id: 5, title: "AI Generated Memory", year: 2025, component: AIGenerated },
  { id: 6, title: "Somnium", year: 2024, component: Somnium },
  { id: 7, title: "Memoria", year: 2024, component: Memoria },
  { id: 8, title: "Are you willing to look inside your soul?", year: 2024, component: Areyou },
];

const Progetti: FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectInfo>(projects[0]);
  const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a);

  const ProjectComponent = selectedProject.component;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen bg-black text-white font-scritte text-[14px]">

        {/* --- MENU MOBILE (dropdown) --- */}
<div className="md:hidden flex flex-col items-center p-4 border-b border-gray-800">
  <label
    htmlFor="project-select"
    className="text-gray-400 text-sm mb-2 font-scritte text-center"
  >
  </label>

  <ProjectDropdown
    projects={projects}
    selectedProject={selectedProject}
    onSelect={setSelectedProject}
  />
</div>


        {/* --- MENU DESKTOP (sidebar) --- */}
        <aside className="hidden md:block md:w-48 p-4 fixed top-30 left-0 h-screen overflow-y-auto bg-black">
          {years.map((year) => (
            <div key={year} className="mb-6">
              <h2 className="text-xs italic text-gray-400 mb-2">{year}</h2>
              <ul className="space-y-1">
                {projects
                  .filter((p) => p.year === year)
                  .map((project) => (
                    <li key={project.id}>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className={`block w-full text-left py-1 px-2 rounded text-sm transition-colors
                          ${selectedProject.id === project.id ? "text-white font-semibold" : "text-gray-300 hover:text-white"}
                        `}
                      >
                        {project.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* --- CONTENUTO PRINCIPALE --- */}
        <main className="flex-1 p-4 md:ml-48 overflow-y-auto">
          <ProjectComponent />
        </main>

      </div>
    </Layout>
  );
};

export default Progetti;
