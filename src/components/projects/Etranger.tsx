import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

const Etranger: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleVideoClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const description = t("etranger.description").replace(
    /Étranger/g,
    "<i>Étranger</i>"
  );

  return (
<div className="flex flex-col md:flex-row h-screen m-0 p-0">
  {/* Video */}
  <div
    className="relative cursor-pointer flex-1 flex justify-center"
    onClick={handleVideoClick}
  >
    <iframe
      src="https://player.vimeo.com/video/1126601219?autoplay=1&loop=1&muted=1"
      className="w-full max-w-full max-h-[60vh] aspect-video object-contain"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title="Étranger"
    ></iframe>
  </div>

  {/* Testo */}
  <div className="flex-1 overflow-y-auto font-scritte text-[14px] text-white p-4 md:p-6">
    <h2 className="font-scritte text-[14px] italic font-bold mb-2">
      Étranger, 2025
    </h2>
    <div
      className="font-scritte text-[14px] whitespace-pre-line text-justify"
      dangerouslySetInnerHTML={{ __html: description }}
    />
    <br />
    <p className="whitespace-pre-line text-justify text-gray-400">
      Sound Designer:{" "}
      <a
        href="https://rafbriganti.bandcamp.com/"
        className="transition-colors duration-200 hover:text-white"
      >
        Raf Briganti
      </a>
    </p>
  </div>
</div>

  );
};

export default Etranger;
