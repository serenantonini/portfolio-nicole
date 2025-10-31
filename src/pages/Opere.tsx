import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// --- Gallerie principali ---
import gallery1 from "../assets/gallery/print1.png";
import gallery2 from "../assets/gallery/print2.png";
import gallery3 from "../assets/gallery/print3.png";
import gallery4 from "../assets/gallery/print4.png";
import gallery5 from "../assets/gallery/print5.png";
import gallery6 from "../assets/gallery/print6.png";
import gallery7 from "../assets/gallery/print7.png";
import gallery8 from "../assets/gallery/print8.png";
import gallery9 from "../assets/gallery/print9.png";
import gallery10 from "../assets/gallery/rammendo.jpg";
import gallery11 from "../assets/gallery/miserere.jpg";

// --- Sotto-gallerie ---
import subgallery1 from "../assets/gallery/subprint1.png";
import subgallery2 from "../assets/gallery/subprint2.png";
import subgallery3 from "../assets/gallery/subprint3.png";
import subgallery4 from "../assets/gallery/subprint4.png";
import subgallery5 from "../assets/gallery/subprint5.png";
import subgallery6 from "../assets/gallery/subprint6.jpg";
import subgallery7 from "../assets/gallery/subprint7.jpg";
import subgallery8 from "../assets/gallery/subprint8.jpg";
import subgallery9 from "../assets/gallery/subprint9.jpg";
import subrammendo1 from "../assets/gallery/subrammendo1.jpg";
import subrammendo2 from "../assets/gallery/subrammendo2.jpg";
import subrammendo3 from "../assets/gallery/subrammendo3.jpg";
import subrammendo4 from "../assets/gallery/subrammendo4.jpg";
import subrammendo5 from "../assets/gallery/subrammendo5.jpg";
import subrammendo6 from "../assets/gallery/subrammendo6.jpg";
import subrammendo7 from "../assets/gallery/subrammendo7.jpg";
import submiserere1 from "../assets/gallery/submiserere1.jpg";
import submiserere2 from "../assets/gallery/submiserere2.jpg";
import submiserere3 from "../assets/gallery/submiserere3.jpg";
import submiserere4 from "../assets/gallery/submiserere4.jpg";
import submiserere5 from "../assets/gallery/submiserere5.jpg";
import submiserere6 from "../assets/gallery/submiserere6.jpg";
import submiserere7 from "../assets/gallery/submiserere7.jpg";

interface ImageItem {
  src: string;
  title: string;
  price: string;
  notes?: string;
  gallery: string[];
  descriptionKey: string;
}

const Opere: FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // --- Costanti note ---
  const NOTES = {
    UNICA: t("opere.notes.edizione_unica"),
    VENTI: t("opere.notes.edizione_20"),
    CINQUE: t("opere.notes.edizione_5"),
    DIECI: t("opere.notes.edizione_10"),
  };

  // --- Funzione per rendere cliccabili "works" e "about" ---
  const parseDescription = (text: string) => {
    // regex per works/about con punteggiatura vicina
    const regex = /(works|about)([.,;!?\s]?)/gi;
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      if (/^works$/i.test(part)) {
        return (
          <Link key={idx} to="/works" className="hover:text-gray-600">
            {part}
          </Link>
        );
      } else if (/^about$/i.test(part)) {
        return (
          <Link key={idx} to="/about" className="hover:text-gray-600">
            {part}
          </Link>
        );
      } else {
        return part;
      }
    });
  };

  // --- Funzione per evidenziare la prima parola del titolo e usare parseDescription ---
  const renderDescription = (description: string, firstWord: string) => {
    const parts = description.split(new RegExp(`(${firstWord})`, "gi"));
    return parts.map((part, idx) => {
      if (part.toLowerCase() === firstWord.toLowerCase()) {
        return <span key={idx} className="italic">{part}</span>;
      }
      return parseDescription(part);
    });
  };

  // --- Dati immagini ---
  const images: ImageItem[] = [
    { src: gallery1, title: "Paths, 1", price: "€300", notes: NOTES.UNICA, gallery: [gallery1, subgallery1], descriptionKey: "opere.paths1" },
    { src: gallery2, title: "Paths, 2", price: "€300", notes: NOTES.UNICA, gallery: [gallery2, subgallery2], descriptionKey: "opere.paths2" },
    { src: gallery3, title: "Paths, 3", price: "€300", notes: NOTES.UNICA, gallery: [gallery3, subgallery3], descriptionKey: "opere.paths3" },
    { src: gallery4, title: "Paths, 4", price: "€300", notes: NOTES.UNICA, gallery: [gallery4, subgallery4], descriptionKey: "opere.paths4" },
    { src: gallery5, title: "Paths, 5", price: "€300", notes: NOTES.UNICA, gallery: [gallery5, subgallery5], descriptionKey: "opere.paths5" },
    { src: gallery6, title: "Miserere, 1", price: "€50", notes: NOTES.VENTI, gallery: [gallery6, subgallery6], descriptionKey: "opere.miserere1" },
    { src: gallery7, title: "Miserere, 2", price: "€50", notes: NOTES.VENTI, gallery: [gallery7, subgallery7], descriptionKey: "opere.miserere2" },
    { src: gallery8, title: "Miserere, 3", price: "€50", notes: NOTES.VENTI, gallery: [gallery8, subgallery8], descriptionKey: "opere.miserere3" },
    { src: gallery9, title: "Miserere, 4", price: "€250", notes: NOTES.CINQUE, gallery: [gallery9, subgallery9], descriptionKey: "opere.miserere4" },
    { src: gallery10, title: "Rammendo", price: "€900", notes: NOTES.UNICA, gallery: [gallery10, subrammendo1, subrammendo2, subrammendo3, subrammendo4, subrammendo5, subrammendo6, subrammendo7], descriptionKey: "opere.rammendo" },
    { src: gallery11, title: "Miserere", price: "€800", notes: NOTES.DIECI, gallery: [gallery11, submiserere1, submiserere2, submiserere3, submiserere4, submiserere5, submiserere6, submiserere7], descriptionKey: "opere.miserere_totale" },
  ];

  // --- Gestione tastiera ---
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCarouselIndex(
          (prev) =>
            (prev - 1 + images[activeIndex].gallery.length) %
            images[activeIndex].gallery.length
        );
      } else if (e.key === "ArrowRight") {
        setCarouselIndex(
          (prev) => (prev + 1) % images[activeIndex].gallery.length
        );
      } else if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images]);

  // --- Render ---
  return (
    <Layout>
      <div className="bg-black min-h-screen p-4 md:p-6 font-scritte text-[14px] text-white">
        {/* --- Griglia immagini principali --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => {
                setActiveIndex(index);
                setCarouselIndex(0);
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 bg-gradient-to-t from-black/90 via-transparent to-white/0">
                <div className="flex justify-between w-full">
                  <span className="text-white font-scritte text-[14px]">{img.title}</span>
                  <div className="text-right">
                    <p className="text-white text-[14px] font-scritte">{img.price}</p>
                    {img.notes && <p className="text-gray-300 text-[12px]">{img.notes}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

{/* --- Modal / Lightbox --- */}
<AnimatePresence>
  {activeIndex !== null && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setActiveIndex(null)} // chiudi cliccando fuori
    >
      <motion.div
        className="relative bg-white bg-opacity-100 p-4 md:p-6 rounded-lg shadow-lg 
                   w-full max-w-2xl md:max-w-3xl flex flex-col gap-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // evita chiusura cliccando dentro
      >
        {/* Bottone X per chiudere */}
        <button
          className="absolute top-2 right-2 text-black text-xl md:text-2xl font-bold 
                     hover:text-gray-600 transition z-10"
          onClick={() => setActiveIndex(null)}
          aria-label="Chiudi"
        >
          ✕
        </button>

        {/* Carousel immagini */}
        <div className="flex justify-center items-center relative">
          <img
            src={images[activeIndex].gallery[carouselIndex]}
            className="w-auto max-h-[60vh] object-contain rounded-lg"
            alt={`${images[activeIndex].title} - ${carouselIndex + 1}`}
            loading="lazy"
          />
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold 
                       bg-black/40 p-2 rounded-full hover:bg-black/70 transition"
            onClick={() =>
              setCarouselIndex(
                (prev) =>
                  (prev - 1 + images[activeIndex].gallery.length) %
                  images[activeIndex].gallery.length
              )
            }
          >
            ‹
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold 
                       bg-black/40 p-2 rounded-full hover:bg-black/70 transition"
            onClick={() =>
              setCarouselIndex(
                (prev) =>
                  (prev + 1) % images[activeIndex].gallery.length
              )
            }
          >
            ›
          </button>
        </div>

        {/* Descrizione */}
        <div className="overflow-y-auto text-black font-scritte text-[14px] whitespace-pre-line">
          {images[activeIndex].title && (
            <h2 className="font-bold mb-2 italic">{images[activeIndex].title}</h2>
          )}
          <p className="mb-2">
            {renderDescription(
              t(`${images[activeIndex].descriptionKey}`),
              images[activeIndex].title.split(" ")[0]
            )}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      </div>
    </Layout>
  );
};

export default Opere;
