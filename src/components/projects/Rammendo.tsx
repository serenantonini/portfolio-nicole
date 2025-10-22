import { FC, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Trans, useTranslation } from "react-i18next";

import rammendo01 from "../../assets/rammendo1.jpg";
import rammendo02 from "../../assets/rammendo2.jpg";
import rammendo03 from "../../assets/rammendo3.jpg";
import rammendo04 from "../../assets/rammendo4.jpg";
import rammendo05 from "../../assets/rammendo5.jpg";
import rammendo06 from "../../assets/rammendo6.jpg";
import rammendo07 from "../../assets/rammendo7.jpg";
import rammendo08 from "../../assets/rammendo8.jpg";
import rammendo09 from "../../assets/rammendo9.jpg";
import rammendo10 from "../../assets/rammendo10.jpg";
import rammendo11 from "../../assets/rammendo11.jpg";
import rammendo12 from "../../assets/rammendo12.jpg";
import rammendo13 from "../../assets/rammendo13.jpg";
import rammendo14 from "../../assets/rammendo14.jpg";
import rammendo15 from "../../assets/rammendo15.jpg";
import rammendo16 from "../../assets/rammendo16.jpg";
import rammendo17 from "../../assets/rammendo17.jpg";
import rammendo18 from "../../assets/rammendo18.jpg";
import rammendo19 from "../../assets/rammendo19.jpg";
import rammendo20 from "../../assets/rammendo20.jpg";
import rammendo21 from "../../assets/rammendo21.jpg";
import rammendo22 from "../../assets/rammendo22.jpg";

const slideshowDuration = 3000; // Durata visualizzazione immagine
const slideshowTransition = 1500; // Durata transizione in ms

const Rammendo: FC = () => {
  const { t } = useTranslation();

  const allImages = [
    rammendo01, rammendo02, rammendo03,
    rammendo04, rammendo05, rammendo06,
    rammendo07, rammendo08, rammendo09,
    rammendo10, rammendo11, rammendo12,
    rammendo13, rammendo14, rammendo15,
    rammendo16, rammendo17, rammendo18,
    rammendo19, rammendo20, rammendo21,
    rammendo22
  ];

  const firstSlideshowImages = allImages.slice(0, 16);
  const secondSlideshowImages = allImages.slice(16);

  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- Rilevamento mobile ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Slideshow mobile 1 ---
  useEffect(() => {
    if (!isMobile || isPaused) return;
    const interval = setInterval(() => {
      setFirstIndex((prev) => (prev + 1) % firstSlideshowImages.length);
    }, slideshowDuration);
    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  // --- Slideshow mobile 2 ---
  useEffect(() => {
    if (!isMobile || isPaused) return;
    const interval = setInterval(() => {
      setSecondIndex((prev) => (prev + 1) % secondSlideshowImages.length);
    }, slideshowDuration);
    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  // --- Modale ---
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % allImages.length);
  };
  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + allImages.length) % allImages.length);
  };

  // --- Touch ---
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    setTouchStartX(null);
  };

  // --- Tastiera ---
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;
    switch (e.key) {
      case "ArrowRight": handleNext(); break;
      case "ArrowLeft": handlePrev(); break;
      case "Escape": handleCloseModal(); break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedIndex]);

  return (
    <div className="flex justify-start">
      <div className="flex flex-col gap-4 p-3 font-scritte text-[14px] text-white md:mr-20 md:w-[85%] w-full">

        {/* ---------------- MOBILE ---------------- */}
        {isMobile && (
          <>
            {/* Slideshow 1 */}
            <div
              className="w-80 h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer"
              onClick={() => handleImageClick(firstIndex)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform"
                style={{
                  transform: `translateX(-${firstIndex * 100}%)`,
                  transitionDuration: `${slideshowTransition}ms`,
                }}
              >
                {firstSlideshowImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Rammendo ${i + 1}`}
                    className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"
                      loading="lazy"

                  />
                ))}
              </div>
            </div>

            {/* Testo */}
            <div className="p-2 bg-black bg-opacity-50 rounded-md mt-4">
              <h2 className="italic font-bold mb-2">Rammendo, 2025</h2>
              <p
                className="whitespace-pre-line text-justify"
                dangerouslySetInnerHTML={{
                  __html: t("rammendo.description").replace(/Rammendo/g, "<em>Rammendo</em>"),
                }}
              />
              <p className="text-gray-400 mt-2 whitespace-pre-line text-justify">
                <Trans
                  i18nKey="rammendo.credits"
                  components={{
                    7: <a href="https://www.lacomposizione.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                    8: <a href="https://www.legatoriaborghimilano.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                  }}
                />
              </p>
            </div>

            {/* Slideshow 2 */}
            <div
              className="w-80 h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer mt-4"
              onClick={() => handleImageClick(15)}
            >
              <div
                className="flex transition-transform"
                style={{
                  transform: `translateX(-${secondIndex * 100}%)`,
                  transitionDuration: `${slideshowTransition}ms`,
                }}
              >
                {secondSlideshowImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Rammendo ${i + 16}`}
                    className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"
                      loading="lazy"

                  />
                ))}
              </div>
            </div>

          {/* Video per mobile */}
          <div className="mt-4 w-full">
            <div className="w-full aspect-video overflow-hidden rounded-md">
              <iframe
                src="https://player.vimeo.com/video/1030332622?h=8b5c373717&autoplay=1&muted=1&controls=1&title=0&byline=0&portrait=0"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          </>
        )}

        {/* ---------------- DESKTOP ---------------- */}
        {!isMobile && (
          <>
            {/* Griglia 3x5 */}
            <div className="grid grid-cols-3 gap-5">
              {allImages.slice(0, 15).map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={img}
                    alt={`Rammendo ${index + 1}`}
                    className="object-cover w-full h-[35vh]"
                      loading="lazy"

                  />
                </div>
              ))}
            </div>

            {/* Sesta riga: foto + testo */}
            <div className="grid grid-cols-3 gap-4 mt-2 relative">
              <div className="cursor-pointer" onClick={() => handleImageClick(15)}>
                <img src={allImages[15]} alt="Rammendo 16" className="object-cover w-full h-[30vh]"   loading="lazy"/>
              </div>
              <div className="col-span-2 flex flex-col p-4">
                <div className="relative font-scritte text-[14px] text-white">
                  <h2 className="italic font-bold mb-2">Rammendo, 2025</h2>
                  <p
                    className="whitespace-pre-line text-justify"
                    dangerouslySetInnerHTML={{
                      __html: t("rammendo.description").replace(/Rammendo/g, "<em>Rammendo</em>"),
                    }}
                  />
                  <p className="whitespace-pre-line text-justify text-gray-400">
                    <Trans
                      i18nKey="rammendo.credits"
                      components={{
                        7: <a href="https://www.lacomposizione.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                        8: <a href="https://www.legatoriaborghimilano.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Due righe successive 3x2 = 6 foto */}
            <div className="grid grid-cols-3 gap-5 mt-2">
              {allImages.slice(16, 22).map((img, index) => (
                <div
                  key={index + 16}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(index + 16)}
                >
                  <img
                    src={img}
                    alt={`Rammendo ${index + 17}`}
                    className="object-cover w-full h-[35vh]"
                      loading="lazy"

                  />
                </div>
              ))}
            </div>

          {/* Video finale */}
          <div className="grid grid-cols-3 gap-0 mt-0 p-0 m-0">
            <div className="col-span-3 p-0 m-0">
              <div className="w-full aspect-video overflow-hidden">
                <iframe
                  src="https://player.vimeo.com/video/1030332622?h=8b5c373717&autoplay=1&muted=1&controls=1&title=0&byline=0&portrait=0"
                  className="w-full h-full p-0 m-0 border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>


          </>
        )}

        {/* ---------------- MODALE ---------------- */}
        {isModalOpen && selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn"
            onClick={handleCloseModal}
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
              src={allImages[selectedIndex]}
              alt={`Rammendo ${selectedIndex + 1}`}
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
    </div>
  );
};

export default Rammendo;
