import { FC, useState } from "react";
import { ProjectInfo } from "@/pages/Progetti"; // importa il tipo corretto

interface DropdownProps {
  projects: ProjectInfo[];
  selectedProject: ProjectInfo;
  onSelect: (project: ProjectInfo) => void;
}

const ProjectDropdown: FC<DropdownProps> = ({
  projects,
  selectedProject,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const years = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => b - a
  );

  return (
    <div className="relative w-full max-w-[250px]">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full bg-black border border-gray-700 text-gray-300 rounded-sm
          font-scritte text-[14px] px-2 py-1.5
          flex justify-between items-center
          hover:border-gray-500 transition-colors
        "
      >
        <span>{selectedProject.title}</span>
        <span className="text-xs text-gray-500">▼</span>
      </button>

      {open && (
        <div
          className="
            absolute left-0 right-0 mt-1 bg-black border border-gray-700 rounded-sm
            max-h-60 overflow-y-auto z-40 shadow-lg
          "
        >
          {years.map((year) => (
            <div key={year} className="border-b border-gray-800 last:border-none">
              <div className="px-2 py-1 text-[12px] text-gray-500 italic font-scritte">
                {year}
              </div>
              {projects
                .filter((p) => p.year === year)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelect(p);
                      setOpen(false);
                    }}
                    className={`
                      block w-full text-left px-2 py-1 text-[14px] font-scritte
                      ${
                        p.id === selectedProject.id
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }
                    `}
                  >
                    {p.title}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDropdown;
