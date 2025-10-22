import { FC, useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

import areyou_01 from "../../assets/areyou_01.jpg";
import areyou_02 from "../../assets/areyou_02.jpg";
import areyou_03 from "../../assets/areyou_03.jpg";
import areyou_04 from "../../assets/areyou_04.jpg";
import areyou_05 from "../../assets/areyou_05.jpg";
import areyou_06 from "../../assets/areyou_06.jpg";
import areyou_07 from "../../assets/areyou_07.jpg";
import areyou_08 from "../../assets/areyou_08.png";

const images = [
  areyou_01, areyou_02, areyou_03,
  areyou_04, areyou_05, areyou_06,
  areyou_07, areyou_08
];

const AreYou: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const TRANSITION_DURATION = 1500; // ms
  const SLIDESHOW_INTERVAL = 3000; // ms

  // --- Rilevamento mobile ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Slideshow mobile ---
  useEffect(() => {
    if (!isMobile || isPaused || isModalOpen) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, SLIDESHOW_INTERVAL);
    return () => clearInterval(interval);
  }, [isMobile, isPaused, isModalOpen]);

  // --- Modale ---
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleNext = () => setSelectedIndex((selectedIndex + 1) % images.length);
  const handlePrev = () => setSelectedIndex((selectedIndex - 1 + images.length) % images.length);

  // --- Swipe ---
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

  // URL Vimeo
  const vimeoUrl = "https://player.vimeo.com/video/1030332622?h=8b5c373717&autoplay=1&muted=1&controls=1&title=0&byline=0&portrait=0";

  return (
    <div className="flex justify-start">
      <div className="flex flex-col gap-4 p-3 font-scritte text-[14px] text-white md:mr-20 md:w-[85%] w-full">
        {isMobile ? (
          <>
            {/* Slideshow mobile */}
            <div
              className="w-full h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
              onClick={() => handleImageClick(selectedIndex)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform ease-in-out"
                style={{ transform: `translateX(-${selectedIndex * 100}%)`, transitionDuration: `${TRANSITION_DURATION}ms` }}
              >
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`AreYou ${i + 1}`} className="w-full h-60 object-cover flex-shrink-0 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Testo */}
            <div className="p-2 bg-black bg-opacity-50 rounded-md mb-4">
              <h2 className="italic font-bold mb-2">Are you willing to look inside your soul?, 2024</h2>
              <p
                className="whitespace-pre-line text-justify"
                dangerouslySetInnerHTML={{
                  __html: t("areyou.description").replace(
                    /Are you willing to look inside your soul/g,
                    "<em>Are you willing to look inside your soul?</em>"
                  ),
                }}
              />
              <p className="whitespace-pre-line text-justify text-gray-400 mt-2">
                <Trans
                  i18nKey="areyou.credits"
                  components={{
                    9: <a href="https://thomasvoltan.art/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                    10: <a href="https://www.instagram.com/mart.phtt/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                    11: <a href="https://www.aliceantonetti.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                    12: <a href="https://www.instagram.com/cri.tif/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                    13: <a href="https://www.kilianagath-photography.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                  }}
                />
              </p>
            </div>

            {/* Video */}
            <div className="mb-4">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={vimeoUrl}
                  title={t("areyou.videoTitle", "AreYou video")}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Desktop: manteniamo la griglia come l’avevi scritta tu */}
            <div className="grid grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, cellIndex) => {
                if (cellIndex === 8) {
                  return (
                    <div key={cellIndex} className="relative">
                      <div className="absolute top-0 left-0 right-0 p-4">
                        <h2 className="italic font-bold mb-2">Are you willing to look inside your soul?, 2024</h2>
                        <p
                          className="whitespace-pre-line text-justify"
                          dangerouslySetInnerHTML={{
                            __html: t("areyou.description").replace(
                              /Are you willing to look inside your soul/g,
                              "<em>Are you willing to look inside your soul?</em>"
                            ),
                          }}
                        />
                        <p className="whitespace-pre-line text-justify text-gray-400 mt-2">
                          <Trans
                            i18nKey="areyou.credits"
                            components={{
                              9: <a href="https://thomasvoltan.art/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                              10: <a href="https://www.instagram.com/mart.phtt/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                              11: <a href="https://www.aliceantonetti.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                              12: <a href="https://www.instagram.com/cri.tif/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                              13: <a href="https://www.kilianagath-photography.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  );
                }
                const img = images[cellIndex];
                return (
                  <div key={cellIndex} className="cursor-pointer" onClick={() => handleImageClick(cellIndex)}>
                    <img src={img} alt={`AreYou ${cellIndex + 1}`} className="object-cover w-full h-[35vh]" />
                  </div>
                );
              })}
            </div>

            {/* Video desktop */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="col-span-2">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={vimeoUrl}
                    title={t("areyou.videoTitle", "AreYou video")}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modale */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn"
            onClick={handleCloseModal}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button onClick={handlePrev} className="absolute left-6 text-white text-4xl font-bold">‹</button>
            <img
              src={images[selectedIndex]}
              alt={`AreYou ${selectedIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button onClick={handleNext} className="absolute right-6 text-white text-4xl font-bold">›</button>
            <button onClick={handleCloseModal} className="absolute top-6 right-6 text-white text-3xl font-bold">✕</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreYou;
