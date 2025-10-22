import React, { useState } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
  width?: string;  // es: "w-64"
  height?: string; // es: "h-48"
};

type Project = {
  id: number;
  title: string;
  year: number;
  description: string;
  media: MediaItem[];
};

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const openImage = (src: string): void => {
    setFullscreenImage(src);
  };

  const closeImage = (): void => {
    setFullscreenImage(null);
  };

  // Splitta description in paragrafi
  const paragraphs = project.description
    ? project.description.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    : [];

  // Splitta titolo in più righe
  const titleLines = project.title
    ? project.title.split("\n").map(line => line.trim()).filter(Boolean)
    : [];

  return (
    <div className="relative flex w-full h-full font-scritte bg-black text-white">
      {/* Media a sinistra */}
      <div className="w-1/2 h-full flex flex-col justify-center p-4">
        {project.media.length === 1 ? (
          project.media[0].type === "image" ? (
            <img
              src={project.media[0].src}
              alt={project.title}
              onClick={() => openImage(project.media[0].src)}
              className={`${project.media[0].width || "w-full"} ${project.media[0].height || "h-full"} object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105`}
            />
          ) : (
            <video
              src={project.media[0].src}
              controls
              className={`${project.media[0].width || "w-full"} ${project.media[0].height || "h-full"} rounded-lg shadow-md object-cover`}
            />
          )
        ) : (
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.media.map((m, index) =>
              m.type === "image" ? (
                <img
                  key={index}
                  src={m.src}
                  alt={`${project.title}-${index}`}
                  onClick={() => openImage(m.src)}
                  className={`${m.width || "w-full"} ${m.height || "h-full"} object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105`}
                />
              ) : (
                <video
                  key={index}
                  src={m.src}
                  controls
                  className={`${m.width || "w-full"} ${m.height || "h-full"} rounded-lg shadow-md object-cover`}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Testo a destra */}
      <div className="w-1/2 h-full p-4 flex flex-col">
        {/* Titolo splittato */}
        <h1 className="text-2xl font-bold">
          {titleLines.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="text-sm italic">{project.year}</p>

        {/* Description splittata */}
        <div className="mt-3">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, idx) => (
              <p key={idx} className="text-sm leading-relaxed mb-4">
                {para}
              </p>
            ))
          ) : (
            <p className="text-sm leading-relaxed">{project.description}</p>
          )}
        </div>
      </div>

      {/* Overlay fullscreen */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 animate-fadeIn cursor-pointer"
          onClick={closeImage}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-[90%] max-h-[90%] rounded-lg object-contain opacity-0 animate-fadeInSlow"
          />
        </div>
      )}

      {/* Animazioni personalizzate */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in forwards;
        }
        .animate-fadeInSlow {
          animation: fadeIn 0.6s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
