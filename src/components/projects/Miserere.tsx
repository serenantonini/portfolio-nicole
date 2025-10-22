import { FC, useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

// Prima parte immagini
import miserere_01 from "../../assets/miserere/miserere_01.jpg";
import miserere_02 from "../../assets/miserere/miserere_02.jpg";
import miserere_03 from "../../assets/miserere/miserere_03.jpg";
import miserere_04 from "../../assets/miserere/miserere_04.jpg";
import miserere_05 from "../../assets/miserere/miserere_05.jpg";
import miserere_06 from "../../assets/miserere/miserere_06.jpg";
import miserere_07 from "../../assets/miserere/miserere_07.jpg";
import miserere_08 from "../../assets/miserere/miserere_08.jpg";
import miserere_09 from "../../assets/miserere/miserere_09.jpg";
import miserere_10 from "../../assets/miserere/miserere_10.jpg";
import miserere_11 from "../../assets/miserere/miserere_11.jpg";
import miserere_12 from "../../assets/miserere/miserere_12.jpg";
import miserere_13 from "../../assets/miserere/miserere_13.jpg";
import miserere_14 from "../../assets/miserere/miserere_14.jpg";
import miserere_15 from "../../assets/miserere/miserere_15.jpg";
import miserere_16 from "../../assets/miserere/miserere_16.jpg";
import miserere_17 from "../../assets/miserere/miserere_17.jpg";
import miserere_18 from "../../assets/miserere/miserere_18.jpg";

// Seconda parte immagini
import miserere_19 from "../../assets/miserere/miserere_19.jpg";
import miserere_20 from "../../assets/miserere/miserere_20.jpg";
import miserere_21 from "../../assets/miserere/miserere_21.jpg";
import miserere_22 from "../../assets/miserere/miserere_22.jpg";
import miserere_23 from "../../assets/miserere/miserere_23.jpg";
import miserere_24 from "../../assets/miserere/miserere_24.jpg";
import miserere_25 from "../../assets/miserere/miserere_25.jpg";
import miserere_26 from "../../assets/miserere/miserere_26.jpg";
import miserere_27 from "../../assets/miserere/miserere_27.jpg";
import miserere_28 from "../../assets/miserere/miserere_28.jpg";



import miserere_29 from "../../assets/miserere/miserere_29.png";
import miserere_30 from "../../assets/miserere/miserere_30.png";  
import miserere_31 from "../../assets/miserere/miserere_31.png";
import miserere_32 from "../../assets/miserere/miserere_32.png";
import miserere_33 from "../../assets/miserere/miserere_33.png";
import miserere_34 from "../../assets/miserere/miserere_34.png";
import miserere_35 from "../../assets/miserere/miserere_35.png";
import miserere_36 from "../../assets/miserere/miserere_36.png";

const Miserere: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { t } = useTranslation();

  // --- Slideshow configuration ---
const MAIN_SLIDE_DURATION = 3000; // ms
const TRANSITION_DURATION = 1500; // ms
const SWIPE_THRESHOLD = 50; // px

const [isMobile, setIsMobile] = useState(false);
const [isPaused, setIsPaused] = useState(false);
const [mainIndex1, setMainIndex1] = useState(0);
const [mainIndex2, setMainIndex2] = useState(0);
const [mainIndex3, setMainIndex3] = useState(0);
const [touchStartX1, setTouchStartX1] = useState<number | null>(null);
const [touchStartX2, setTouchStartX2] = useState<number | null>(null);
const [touchStartX3, setTouchStartX3] = useState<number | null>(null);


  const firstImages = [
    miserere_01, miserere_02, miserere_03,
    miserere_04, miserere_05, miserere_06,
    miserere_07, miserere_08, miserere_09,
    miserere_10, miserere_11, miserere_12,
    miserere_13, miserere_14, miserere_15,
    miserere_16, miserere_17, miserere_18,
  ];

  const secondImages = [
    miserere_19, miserere_20, miserere_21,
    miserere_22, miserere_23, miserere_24,
    miserere_25, miserere_26, miserere_27, miserere_28,
  ];

  const thirdImages = [
    miserere_29, miserere_30, miserere_31,
    miserere_32, miserere_33, miserere_34,
    miserere_35, miserere_36,
  ];

  const allImages = [...firstImages, ...secondImages, ...thirdImages];

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const handleNext = (e?: React.MouseEvent | TouchEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % allImages.length);
  };

  const handlePrev = (e?: React.MouseEvent | TouchEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + allImages.length) % allImages.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "Escape") handleCloseModal();
  };

  const vimeoUrl = "https://player.vimeo.com/video/1126587103?h=8b5c373717&autoplay=1&muted=1&controls=1&title=0&byline=0&portrait=0";


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedIndex]);


  // --- Mobile detection ---
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// --- Automatic slideshows (mobile) ---
useEffect(() => {
  if (!isMobile || isPaused || isModalOpen) return;
  const interval = setInterval(() => {
    setMainIndex1(prev => (prev + 1) % firstImages.length);
  }, MAIN_SLIDE_DURATION);
  return () => clearInterval(interval);
}, [isMobile, isPaused, isModalOpen]);

useEffect(() => {
  if (!isMobile || isPaused || isModalOpen) return;
  const interval = setInterval(() => {
    setMainIndex2(prev => (prev + 1) % secondImages.length);
  }, MAIN_SLIDE_DURATION);
  return () => clearInterval(interval);
}, [isMobile, isPaused, isModalOpen]);

useEffect(() => {
  if (!isMobile || isPaused || isModalOpen) return;
  const interval = setInterval(() => {
    setMainIndex3(prev => (prev + 1) % thirdImages.length);
  }, MAIN_SLIDE_DURATION);
  return () => clearInterval(interval);
}, [isMobile, isPaused, isModalOpen]);


  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };


  // --- Touch handlers for mobile slideshows ---
const handleTouchStart1 = (e: React.TouchEvent) => setTouchStartX1(e.touches[0].clientX);
const handleTouchEnd1 = (e: React.TouchEvent) => {
  if (touchStartX1 === null) return;
  const diff = touchStartX1 - e.changedTouches[0].clientX;
  if (Math.abs(diff) > SWIPE_THRESHOLD)
    diff > 0
      ? setMainIndex1((mainIndex1 + 1) % firstImages.length)
      : setMainIndex1((mainIndex1 - 1 + firstImages.length) % firstImages.length);
  setTouchStartX1(null);
};

const handleTouchStart2 = (e: React.TouchEvent) => setTouchStartX2(e.touches[0].clientX);
const handleTouchEnd2 = (e: React.TouchEvent) => {
  if (touchStartX2 === null) return;
  const diff = touchStartX2 - e.changedTouches[0].clientX;
  if (Math.abs(diff) > SWIPE_THRESHOLD)
    diff > 0
      ? setMainIndex2((mainIndex2 + 1) % secondImages.length)
      : setMainIndex2((mainIndex2 - 1 + secondImages.length) % secondImages.length);
  setTouchStartX2(null);
};

const handleTouchStart3 = (e: React.TouchEvent) => setTouchStartX3(e.touches[0].clientX);
const handleTouchEnd3 = (e: React.TouchEvent) => {
  if (touchStartX3 === null) return;
  const diff = touchStartX3 - e.changedTouches[0].clientX;
  if (Math.abs(diff) > SWIPE_THRESHOLD)
    diff > 0
      ? setMainIndex3((mainIndex3 + 1) % thirdImages.length)
      : setMainIndex3((mainIndex3 - 1 + thirdImages.length) % thirdImages.length);
  setTouchStartX3(null);
};


return (
  <div className="p-3 font-scritte text-[14px] text-white">
    {isMobile ? (
      <>
        {/* --- SLIDE 1 --- */}
        <div
          className="w-80 h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
          onClick={() => handleImageClick(mainIndex1)}
          onTouchStart={handleTouchStart1}
          onTouchEnd={handleTouchEnd1}
        >
          <div
            className="flex transition-transform ease-in-out"
            style={{ transform: `translateX(-${mainIndex1 * 100}%)`, transitionDuration: `${TRANSITION_DURATION}ms` }}
          >
            {firstImages.map((img, i) => (
              <img key={i} src={img} alt={`Miserere ${i + 1}`} className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"   loading="lazy"/>
            ))}
          </div>
        </div>

        {/* --- TESTO 1 --- */}
        <div className="p-2 bg-black bg-opacity-50 rounded-md mb-4">
          <h2 className="italic font-bold mb-2">Miserere, 2025</h2>
          <p className="whitespace-pre-line text-justify"
            dangerouslySetInnerHTML={{ __html: t("miserere.description_01").replace(/Miserere/g, "<em>Miserere</em>") }}
          />
        </div>

        {/* --- SLIDE 2 --- */}
        <div
          className="w-80 h-60 mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
          onClick={() => handleImageClick(firstImages.length + mainIndex2)}
          onTouchStart={handleTouchStart2}
          onTouchEnd={handleTouchEnd2}
        >
          <div
            className="flex transition-transform ease-in-out"
            style={{ transform: `translateX(-${mainIndex2 * 100}%)`, transitionDuration: `${TRANSITION_DURATION}ms` }}
          >
            {secondImages.map((img, i) => (
              <img key={i} src={img} alt={`Miserere ${i + 19}`} className="w-80 h-60 object-cover flex-shrink-0 rounded-lg"   loading="lazy"/>
            ))}
          </div>
        </div>

        {/* --- TESTO 2 --- */}
        <div className="p-2 bg-black bg-opacity-50 rounded-md mb-4">
          <p className="whitespace-pre-line text-justify"
            dangerouslySetInnerHTML={{ __html: t("miserere.description_02").replace(/Miserere/g, "<em>Miserere</em>") }}
          />
          <p className="text-gray-400 mt-2 whitespace-pre-line text-justify">
            <Trans
              i18nKey="miserere.credits"
              components={{
                14: <a href="https://www.lacomposizione.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
                15: <a href="https://www.legatoriaborghimilano.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
              }}
            />
          </p>
        </div>

        {/* --- VIDEO --- */}
        <div className="mb-4">
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={vimeoUrl}
              title={t("miserere.videoTitle", "Miserere video")}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0 rounded-md"
            />
          </div>
        </div>

        {/* --- SLIDE 3 --- */}
        <div
          className="h-full mx-auto overflow-hidden relative rounded-lg cursor-pointer mb-4"
          onClick={() => handleImageClick(firstImages.length + secondImages.length + mainIndex3)}
          onTouchStart={handleTouchStart3}
          onTouchEnd={handleTouchEnd3}
        >
          <div
            className="flex transition-transform ease-in-out"
            style={{ transform: `translateX(-${mainIndex3 * 100}%)`, transitionDuration: `${TRANSITION_DURATION}ms` }}
          >
            {thirdImages.map((img, i) => (
              <img key={i} src={img} alt={`Miserere ${i + 29}`} className="h-full object-cover flex-shrink-0 rounded-lg"   loading="lazy"/>
            ))}
          </div>
        </div>
      </>
    ) : (
      // --- DESKTOP: ---
      <div className="flex justify-start">
        <div className="flex flex-col gap-4 p-3 font-scritte text-[14px] text-white mr-20 w-[85%]">

        {/* Prima parte: griglia 3x6 */}
        <div className="grid grid-cols-3 gap-5">
          {firstImages.map((img, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleImageClick(index)}>
              <img src={img} alt={`Miserere ${index + 1}`} className="object-cover w-full h-[35vh]"   loading="lazy"/>
            </div>
          ))}
        </div>

        {/* Testo prima parte */}
        <div className="mt-6 font-scritte text-[14px] text-white w-[110%] mr-20">
          <h2 className="italic font-bold mb-2">Miserere, 2025</h2>
          <p className="whitespace-pre-line text-justify" dangerouslySetInnerHTML={{
            __html: t("miserere.description_01").replace(/Miserere/g, "<em>Miserere</em>")
          }}></p>
        </div>

        {/* Seconda parte: griglia 10 immagini */}
        <div className="mt-6 flex flex-col gap-4">

          {/* Prima fila: 3 immagini */}
          <div className="grid grid-cols-3 gap-4">
            {secondImages.slice(0,3).map((img, i) => (
              <div key={i+18} className="cursor-pointer" onClick={() => handleImageClick(i+18)}>
                <img src={img} alt={`Miserere ${i + 19}`} className="object-cover w-full h-[30vh]"   loading="lazy"/>
              </div>
            ))}
          </div>

          {/* Seconda fila: 3 immagini */}
          <div className="grid grid-cols-3 gap-4">
            {secondImages.slice(3,6).map((img, i) => (
              <div key={i+21} className="cursor-pointer" onClick={() => handleImageClick(i+21)}>
                <img src={img} alt={`Miserere ${i + 22}`} className="object-cover w-full h-[30vh]"   loading="lazy"/>
              </div>
            ))}
          </div>

          {/* Terza fila: 2 immagini + testo */}
          <div className="grid grid-cols-3 gap-6">
  {/* Colonna sinistra: 2/3 */}
  <div className="col-span-2 flex flex-col gap-4">
    {/* Sotto-griglia immagini 2x2 */}
    <div className="grid grid-cols-2 gap-4">
      {secondImages.slice(0,4).map((img, i) => (
        <div key={i} className="cursor-pointer" onClick={() => handleImageClick(i)}>
          <img src={img} alt={`Miserere ${i}`} className="object-cover w-full h-[30vh]"   loading="lazy"/>
        </div>
      ))}
    </div>

    {/* Video sotto la griglia immagini */}
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

  {/* Colonna destra: 1/3, testo fisso */}
  <div className="font-scritte text-[14px] text-white text-justify whitespace-pre-line w-[120%]">
    <p dangerouslySetInnerHTML={{
      __html: t("miserere.description_02").replace(/Miserere/g, "<em>Miserere</em>")
    }}></p>
    <p className="text-gray-400 mt-2 whitespace-pre-line text-justify">
      <Trans
        i18nKey="miserere.credits"
        components={{
          14: <a href="https://www.lacomposizione.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
          15: <a href="https://www.legatoriaborghimilano.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
        }}
      />
    </p>
  </div>
</div>

        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 w-[110%] align-items-center">
          {thirdImages.map((img, i) => (
            <div key={i+27} className="cursor-pointer" onClick={() => handleImageClick(i+28)}>
              <img src={img} alt={`Miserere ${i + 1}`} className="object-cover w-full h-full"   loading="lazy"/>
            </div>
          ))}
        </div>



      </div>        
      </div>
    )}

    {/* --- MODALE invariata --- */}
    {isModalOpen && selectedIndex !== null && (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-modalFadeIn">
        <div className="absolute inset-0" onClick={handleCloseModal} />
        <button onClick={e => { e.stopPropagation(); handlePrev(e); }} className="absolute left-6 text-white text-4xl font-bold z-10">‹</button>
        <img
          src={allImages[selectedIndex]}
          alt={`Miserere ${selectedIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain z-10"
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
            loading="lazy"

        />
        <button onClick={e => { e.stopPropagation(); handleNext(e); }} className="absolute right-6 text-white text-4xl font-bold z-10">›</button>
        <button onClick={handleCloseModal} className="absolute top-6 right-6 text-white text-3xl font-bold z-10">✕</button>
      </div>
    )}
  </div>
);




};

export default Miserere;






