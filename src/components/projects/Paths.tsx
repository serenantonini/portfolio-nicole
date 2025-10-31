import { FC, useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

import paths_01 from "../../assets/paths_01.jpeg";
import paths_02 from "../../assets/paths_02.jpeg";
import paths_03 from "../../assets/paths_03.jpeg";
import paths_04 from "../../assets/paths_04.jpeg";
import paths_05 from "../../assets/paths_05.jpeg";
import paths_06 from "../../assets/paths_06.jpeg";
import paths_07 from "../../assets/paths_07.jpg";
import paths_08 from "../../assets/paths_08.jpg";
import paths_09 from "../../assets/paths_09.jpeg";
import paths_10 from "../../assets/paths_10.jpg";
import paths_11 from "../../assets/paths_11.jpg";
import pathsGif from "../../assets/paths_12.mp4";

// --- Slideshow configuration ---
const MAIN_SLIDE_DURATION = 3000; // ms
const MINI_SLIDE_DURATION = 3000;
const SWIPE_THRESHOLD = 50; // px
const TRANSITION_DURATION = 1500; // ms

const images = [
  paths_01, paths_02, paths_03, paths_04, paths_05,
  paths_06, paths_07, paths_08, paths_09
];

const lastImages = [paths_10, paths_11];

const Paths: FC = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [miniTouchStart, setMiniTouchStart] = useState<number | null>(null);
  const [miniIndex, setMiniIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // --- Mobile detection ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Main slideshow mobile ---
  useEffect(() => {
    if (!isMobile || isPaused || isModalOpen) return;
    const interval = setInterval(() => {
      setSelectedIndex(prev => (prev + 1) % images.length);
    }, MAIN_SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isMobile, isPaused, isModalOpen]);

  // --- Mini-slideshow mobile ---
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setMiniIndex(prev => (prev + 1) % lastImages.length);
    }, MINI_SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isMobile]);

  // --- Modal navigation ---
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleNext = () => setSelectedIndex((selectedIndex + 1) % (images.length + lastImages.length));
  const handlePrev = () => setSelectedIndex((selectedIndex - 1 + (images.length + lastImages.length)) % (images.length + lastImages.length));

  // --- Touch handlers main slideshow ---
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) diff > 0 ? handleNext() : handlePrev();
    setTouchStartX(null);
  };

  // --- Touch handlers mini slideshow ---
  const handleMiniTouchStart = (e: React.TouchEvent) => setMiniTouchStart(e.touches[0].clientX);
  const handleMiniTouchEnd = (e: React.TouchEvent) => {
    if (miniTouchStart === null) return;
    const diff = miniTouchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      diff > 0 ? setMiniIndex((miniIndex + 1) % lastImages.length) : setMiniIndex((miniIndex - 1 + lastImages.length) % lastImages.length);
    }
    setMiniTouchStart(null);
  };

  // --- Keyboard navigation in modal ---
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
    <div className="p-3 font-scritte text-[14px] text-white">
      {isMobile ? (
        <>
          {/* Main mobile slideshow */}
          <div
            className="w-80 h-80 mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
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
                <img key={i} src={img} alt={`Paths ${i + 1}`} className="w-80 h-80 object-cover flex-shrink-0 rounded-lg"   loading="lazy"/>
              ))}
            </div>
          </div>

          {/* Text block */}
          <div className="p-2 bg-black bg-opacity-50 rounded-md mb-4">
            <h2 className="italic font-bold mb-2">Paths, 2025</h2>
            <p className="whitespace-pre-line text-justify" dangerouslySetInnerHTML={{ __html: t("paths.description").replace(/Paths/g, "<em>Paths</em>") }} />
            <p className="text-gray-400 mt-2 whitespace-pre-line text-justify">
              <Trans
                i18nKey="paths.credits"
                components={{
                  4: <a href="https://www.lacomposizione.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                  5: <a href="https://www.legatoriaborghimilano.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                  6: <a href="https://www.instagram.com/lara.marusic.376/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                }}
              />
            </p>
          </div>

          {/* Mini slideshow for last images */}
          <div
            className="w-80 h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
            onTouchStart={handleMiniTouchStart}
            onTouchEnd={handleMiniTouchEnd}
          >
            <div
              className="flex transition-transform ease-in-out"
              style={{ transform: `translateX(-${miniIndex * 100}%)`, transitionDuration: `${TRANSITION_DURATION}ms` }}
            >
              {lastImages.map((img, i) => (
                <img key={i} src={img} alt={`Paths last ${i + 1}`} className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"   loading="lazy"/>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="mb-4">
            <video src={pathsGif} autoPlay loop muted className="w-full h-[60vh] object-cover rounded-md" />
          </div>
        </>
      ) : (
        <>
          {/* Desktop layout unchanged */}
          <div className="grid grid-cols-3 gap-5 mr-20 w-[85%]">
            {images.map((img, i) => (
              <div key={i} className="cursor-pointer" onClick={() => handleImageClick(i)}>
                <img src={img} alt={`Paths ${i + 1}`} className="object-cover w-full h-[35vh]"   loading="lazy"/>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 relative mr-20 w-[85%]">
            {lastImages.map((img, i) => (
              <div key={i} className="cursor-pointer" onClick={() => handleImageClick(i + images.length)}>
                <img src={img} alt={`Paths last ${i + 1}`} className="object-cover w-full h-[30vh]"   loading="lazy"/>
              </div>
            ))}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0">
                <h2 className="italic font-bold mb-2">Paths, 2025</h2>
                <p className="whitespace-pre-line text-justify" dangerouslySetInnerHTML={{ __html: t("paths.description").replace(/Paths/g, "<em>Paths</em>") }} />
                <p className="text-gray-400 mt-2 whitespace-pre-line text-justify">
                  <Trans
                    i18nKey="paths.credits"
                    components={{
                      4: <a href="https://www.lacomposizione.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                      5: <a href="https://www.legatoriaborghimilano.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                      6: <a href="https://www.instagram.com/lara.marusic.376/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                    }}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 mr-20 w-[85%]">
            <div className="col-span-2">
              <video src={pathsGif} autoPlay loop muted className="object-cover w-full h-[60vh]" />
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn">
          <div className="absolute inset-0" onClick={handleCloseModal} />
          <button onClick={e => { e.stopPropagation(); handlePrev(); }} className="absolute left-6 text-white text-4xl font-bold z-10">‹</button>
          <img
            src={selectedIndex < images.length ? images[selectedIndex] : lastImages[selectedIndex - images.length]}
            alt={`Paths ${selectedIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain z-10"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
              loading="lazy"

          />
          <button onClick={e => { e.stopPropagation(); handleNext(); }} className="absolute right-6 text-white text-4xl font-bold z-10">›</button>
          <button onClick={handleCloseModal} className="absolute top-6 right-6 text-white text-3xl font-bold z-10">✕</button>
        </div>
      )}
    </div>
  );
};

export default Paths;
