import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

// --- Import immagini ---
import commerciale1 from "../assets/commerciale/1.jpg";
import commerciale2 from "../assets/commerciale/2.jpg";
import commerciale3 from "../assets/commerciale/3.png";
import commerciale4 from "../assets/commerciale/4.jpg";
import commerciale5 from "../assets/commerciale/5.jpg";
import commerciale6 from "../assets/commerciale/6.png";

import personale1 from "../assets/personale/1.jpg";
import personale2 from "../assets/personale/2.jpg";
import personale3 from "../assets/personale/3.jpg";
import personale4 from "../assets/personale/4.jpeg";
import personale5 from "../assets/personale/5.jpg";
import personale6 from "../assets/personale/6.jpeg";
import personale7 from "../assets/personale/7.jpg";

// --- Array immagini ---
const imagesCommerciale = [commerciale1, commerciale2, commerciale3, commerciale4, commerciale5, commerciale6];
const imagesPersonale = [personale1, personale2, personale3, personale4, personale5, personale6, personale7];

const ScaricaPortfolio = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const sovratitoloCommerciale = t("scaricaPortfolio.sovratitolo_commerciale");
  const sovratitoloPersonale = t("scaricaPortfolio.sovratitolo_personale");
  const titoloCommerciale = t("scaricaPortfolio.titolo_commerciale");
  const titoloPersonale = t("scaricaPortfolio.titolo_personale");
  const sottotitoloCommerciale = t("scaricaPortfolio.sottotitolo_commerciale");
  const sottotitoloPersonale = t("scaricaPortfolio.sottotitolo_personale");

  // --- Download PDF ---
const handleDownload = (type: "commercial" | "personal") => {
  const pdfUrl =
    type === "commercial"
      ? "public/portfolio_commerciale.pdf"
      : "public/portfolio_personale.pdf";

  // --- 1️⃣ Apri il PDF in una nuova scheda ---
  window.open(pdfUrl, "_blank");

  // --- 2️⃣ Avvia anche il download automatico ---
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download =
    type === "commercial" ? "public/portfolio_commerciale.pdf" : "public/portfolio_personale.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // --- 3️⃣ Mostra il messaggio di conferma ---
  toast({
    title: t("scaricaPortfolio.downloadAvviato"),
    description: t(
      `scaricaPortfolio.downloadDescrizione.${
        type === "commercial" ? "commerciale" : "personale"
      }`
    ),
  });
};


// --- Funzione carosello infinito con immagini strette ---
  const renderCarousel = (images: string[]) => {
    return (
      <div className="overflow-hidden w-full rounded-xl relative" style={{ height: "45vh" }}>
        <div className="flex animate-scroll gap-2" style={{ height: "100%" }}>
          {[...images, ...images, ...images].map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width: "280px", height: "100%" }}
            >
              <img
                src={img}
                className="w-full h-full object-cover rounded-lg"
                alt={`Slide ${idx + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-280px * ${images.length} - ${images.length * 8}px)); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 90s linear infinite;
          }
        `}</style>
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">

          {/* Portfolio Commerciale */}
          <Card className="border border-white bg-transparent text-center p-10 flex flex-col items-center rounded-3xl shadow-lg">
            <p className="text-xs tracking-widest mb-2 text-white font-scritte">{sovratitoloCommerciale}</p>
            <h2 className="text-4xl mb-2 font-light flex items-center justify-center gap-3 text-white font-scritte">
              <span className="text-white text-lg">●</span>
              {titoloCommerciale}
              <span className="text-white text-lg">●</span>
            </h2>
            <p className="text-white mb-8 text-xs max-w-md">{sottotitoloCommerciale}</p>
            <div className="mb-8 w-full">{renderCarousel(imagesCommerciale)}</div>
            <Button
              onClick={() => handleDownload("commercial")}
              className="px-4 py-2 text-sm rounded-full transition-all duration-300 font-scritte bg-white text-black hover:bg-gray-400"
            >
              Download
            </Button>
          </Card>

          {/* Portfolio Personale */}
          <Card className="border border-white bg-transparent text-center p-10 flex flex-col items-center rounded-3xl shadow-lg">
            <p className="text-xs tracking-widest mb-2 text-white font-scritte">{sovratitoloPersonale}</p>
            <h2 className="text-4xl mb-2 font-light flex items-center justify-center gap-3 text-white font-scritte">
              <span className="text-white text-lg">●</span>
              {titoloPersonale}
              <span className="text-white text-lg">●</span>
            </h2>
            <p className="text-white mb-8 text-xs max-w-md">{sottotitoloPersonale}</p>
            <div className="mb-8 w-full">{renderCarousel(imagesPersonale)}</div>
            <Button
              onClick={() => handleDownload("personal")}
              className="px-4 py-2 text-sm rounded-full transition-all duration-300 font-scritte bg-white text-black hover:bg-gray-400"
            >
              Download
            </Button>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default ScaricaPortfolio;
