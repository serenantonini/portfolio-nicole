import { FC, useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

import Somnium_01 from "../../assets/somnium_01.jpg";
import Somnium_02 from "../../assets/somnium_02.jpg";
import Somnium_03 from "../../assets/somnium_03.jpg";
import Somnium_04 from "../../assets/somnium_04.jpg";
import Somnium_05 from "../../assets/somnium_05.jpg";
import Somnium_06 from "../../assets/somnium_06.jpg";
import Somnium_07 from "../../assets/somnium_07.jpg";

const images = [
  Somnium_01,
  Somnium_02,
  Somnium_03,
  Somnium_04,
  Somnium_05,
  Somnium_06,
  Somnium_07,
];

interface SlideshowConfig {
  interval?: number;
  transitionDuration?: number;
  reverse?: boolean;
}

const Somnium: FC = () => {
  const { t } = useTranslation();

  const config: SlideshowConfig = {
    interval: 3000,
    transitionDuration: 1400,
    reverse: false,
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
    if (!isMobile || isPaused) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, config.interval);
    return () => clearInterval(interval);
  }, [isMobile, isPaused, config.interval]);

  // --- Modal handlers ---
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  // --- Swipe handling ---
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    setTouchStartX(null);
  };

  // --- Keyboard navigation for modal ---
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "Escape") handleCloseModal();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedIndex]);

  return (
    <div className="p-3 text-white font-scritte text-[14px]">
      {isMobile ? (
        <>
          {/* MOBILE: slideshow con transizione fluida */}
          <div
            className="mb-4 w-80 h-60 mx-auto cursor-pointer overflow-hidden relative rounded-lg"
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
                  alt={`Somnium ${i + 1}`}
                  className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* testo */}
          <div className="p-3 bg-black bg-opacity-50 rounded-md mb-4">
            <h2 className="italic font-bold mb-2">Somnium, 2024</h2>
            <p className="whitespace-pre-line text-justify font-scritte text-[14px]">
              {t("somnium.description")}
            </p>
            <br />
            <p className="text-gray-400 mt-2 whitespace-pre-line text-justify font-scritte text-[14px]">
              <Trans
                i18nKey="somnium.credits"
                components={{
                  1: (
                    <a
                      href="https://thomasvoltan.art"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    />
                  ),
                  2: (
                    <a
                      href="https://www.instagram.com/arielepaccalini/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    />
                  ),
                  3: (
                    <a
                      href="https://www.instagram.com/asialocatellimua/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    />
                  ),
                }}
              />
            </p>
          </div>
        </>
      ) : (
        <>
          {/* DESKTOP invariato */}
          <div className="grid grid-rows-[auto_auto_auto] gap-2 p-3 text-white font-scritte text-[14px] h-auto">
            <div className="grid grid-cols-5 gap-4">
              {images.slice(0, 5).map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={img}
                    alt={`Somnium ${index + 1}`}
                    className="object-cover w-full h-[35vh]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div
                className="cursor-pointer row-span-2"
                onClick={() => handleImageClick(5)}
              >
                <img
                  src={images[5]}
                  alt="Somnium 6"
                  className="object-cover w-full h-full max-h-[80vh]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col">
                <div
                  className="cursor-pointer"
                  onClick={() => handleImageClick(6)}
                >
                  <img
                    src={images[6]}
                    alt="Somnium 7"
                    className="object-cover w-full h-[40vh]"
                    loading="lazy"
                  />
                </div>

                <div className="p-3 overflow-y-visible mt-2">
                  <h2 className="font-scritte italic font-bold mb-2">
                    Somnium, 2024
                  </h2>
                  <p className="whitespace-pre-line text-justify">
                    {t("somnium.description")}
                  </p>
                  <br />
                  <p className="whitespace-pre-line text-justify text-gray-400">
                    <Trans
                      i18nKey="somnium.credits"
                      components={{
                        1: (
                          <a
                            href="https://thomasvoltan.art"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200 hover:text-white"
                          />
                        ),
                        2: (
                          <a
                            href="https://www.instagram.com/arielepaccalini/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200 hover:text-white"
                          />
                        ),
                        3: (
                          <a
                            href="https://www.instagram.com/asialocatellimua/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200 hover:text-white"
                          />
                        ),
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODALE */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={handlePrev}
            className="absolute left-6 text-white text-4xl font-bold"
          >
            ‹
          </button>

          <img
            src={images[selectedIndex]}
            alt={`Somnium ${selectedIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            loading="lazy"
          />

          <button
            onClick={handleNext}
            className="absolute right-6 text-white text-4xl font-bold"
          >
            ›
          </button>

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

export default Somnium;
