import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import MemoriaImage from "../../assets/Memoria.jpg";

const Memoria: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="
        grid 
        grid-cols-1 
        md:grid-cols-[auto_1fr] 
        h-auto 
        md:h-screen 
        items-start
      "
    >
      {/* Immagine */}
      <div
        className="relative cursor-pointer flex justify-center items-center p-3"
        onClick={handleImageClick}
      >
        <img
          src={MemoriaImage}
          alt="Memoria"
          className="
            object-contain 
            w-full 
            h-auto 
            md:h-[85vh] 
            md:w-auto 
            transition-transform 
            duration-300
          "
        />
      </div>

      {/* Testo */}
      <div
        className="
          p-4 
          md:p-3 
          overflow-y-auto 
          font-scritte 
          text-[14px] 
          text-white
        "
      >
        <h2 className="font-scritte text-[14px] italic font-bold mb-2">
          Memoria, 2024
        </h2>
        <p className="font-scritte text-[14px] whitespace-pre-line text-justify">
          {t("memoria.description")}
        </p>
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn"
          onClick={handleCloseModal}
        >
          <img
            src={MemoriaImage}
            alt="Memoria"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            onClick={handleCloseModal}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Memoria;
