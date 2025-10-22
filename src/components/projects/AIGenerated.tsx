import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import AI_01 from "../../assets/AI_01.jpg";
import AI_02 from "../../assets/AI_02.jpg";
import AI_03 from "../../assets/AI_03.jpg";
import AI_04 from "../../assets/AI_04.jpg";
import AI_05 from "../../assets/AI_05.jpg";
import AI_06 from "../../assets/AI_06.jpg";
import AI_07 from "../../assets/AI_07.jpg";
import AI_08 from "../../assets/AI_08.jpg";
import AI_09 from "../../assets/AI_09.jpg";
import AI_10 from "../../assets/AI_10.jpg";

const images = [
  AI_01, AI_02, AI_03, AI_04, AI_05,
  AI_06, AI_07, AI_08, AI_09, AI_10
];

interface SlideshowConfig {
  interval?: number;          // tempo tra le immagini in ms
  transitionDuration?: number; // durata transizione in ms
  reverse?: boolean;           // direzione autoplay
}



const AIGenerated: FC = () => {
  const { t } = useTranslation();

  const config: SlideshowConfig = {
    interval: 3000,
    transitionDuration: 1500,
    reverse: false,
  };



  const handleKeyDown = (e: KeyboardEvent) => {
  if (!isModalOpen) return; // agisci solo se la modale è aperta
  switch (e.key) {
    case "ArrowRight":
      handleNext();
      break;
    case "ArrowLeft":
      handlePrev();
      break;
    case "Escape":
      handleCloseModal();
      break;
  }
};


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // --- Rilevamento mobile ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Slideshow automatico mobile ---
  useEffect(() => {
    if (!isMobile || isPaused || isModalOpen) return;

    const interval = setInterval(() => {
      setSelectedIndex(prev => config.reverse ? (prev - 1 + images.length) % images.length : (prev + 1) % images.length);
    }, config.interval);

    return () => clearInterval(interval);
  }, [isMobile, isPaused, isModalOpen, config.interval, config.reverse]);

  useEffect(() => {
  if (!isModalOpen) return;

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isModalOpen, selectedIndex]);


  // --- Modale ---
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleNext = () => setSelectedIndex((selectedIndex + 1) % images.length);
  const handlePrev = () => setSelectedIndex((selectedIndex - 1 + images.length) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    setTouchStartX(null);
  };

  return (
    <div className="p-3">
      {isMobile ? (
        <>
          {/* Mobile slideshow con translateX */}
          <div
            className="w-80 h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
            onClick={() => handleImageClick(selectedIndex)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform ease-in-out"
              style={{
                transform: `translateX(-${selectedIndex * 100}%)`,
                transitionDuration: `${config.transitionDuration}ms`,
              }}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`AI ${i + 1}`}
                  className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Blocco testo */}
          <div className="p-2 font-scritte text-[14px] text-white bg-black bg-opacity-50 rounded-md">
            <h2 className="font-scritte text-[14px] italic font-bold mb-2">
              AI Generated Memory, 2025
            </h2>
            <p className="whitespace-pre-line text-justify">{t("aigenerated.description")}</p>
          </div>
        </>
      ) : (
        // Desktop invariato
        <div className="grid grid-cols-3 gap-5 h-auto md:h-[160vh] mr-20 w-[95%]">
          <div className="cursor-pointer" onClick={() => handleImageClick(0)}>
            <img src={images[0]} alt="AI 1" className="object-cover w-full h-full" />
          </div>
          <div className="cursor-pointer" onClick={() => handleImageClick(1)}>
            <img src={images[1]} alt="AI 2" className="object-cover w-full h-full" />
          </div>
          <div className="col-span-2 sm:col-span-3 md:col-span-1 md:row-span-2 p-0 overflow-y-auto font-scritte text-[14px] text-white w-[110%]">
            <h2 className="font-scritte text-[14px] italic font-bold mb-2">AI Generated Memory, 2024</h2>
            <p className="font-scritte text-[14px] whitespace-pre-line text-justify">{t("aigenerated.description")}</p>
          </div>
          {images.slice(2).map((img, i) => (
            <div key={i + 2} className="cursor-pointer" onClick={() => handleImageClick(i + 2)}>
              <img src={img} alt={`AI ${i + 3}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}

      {/* Modale */}
{isModalOpen && selectedIndex !== null && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn"
  >
    {/* Sfondo cliccabile per chiudere la modale */}
    <div
      className="absolute inset-0"
      onClick={handleCloseModal}
    />

    {/* Frecce e immagine */}
    <button
      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
      className="absolute left-6 text-white text-4xl font-bold z-10 "
    >
      ‹
    </button>

    <img
      src={images[selectedIndex]}
      alt={`AI ${selectedIndex + 1}`}
      className="max-h-[90vh] max-w-[90vw] object-contain z-10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => e.stopPropagation()} // evita chiusura cliccando sull’immagine
    />

    <button
      onClick={(e) => { e.stopPropagation(); handleNext(); }}
      className="absolute right-6 text-white text-4xl font-bold z-10"
    >
      ›
    </button>

    <button
      onClick={handleCloseModal}
      className="absolute top-6 right-6 text-white text-3xl font-bold z-10"
    >
      ✕
    </button>
  </div>
)}

    </div>
  );
};

export default AIGenerated;
