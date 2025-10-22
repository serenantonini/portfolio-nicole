import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";
import bioImage from "../assets/bio.jpg";

const Bio = () => {
  const { t } = useTranslation();

  // --- Costanti testo per traduzione ---
  const sottotitolo = t("bio.sottotitolo");
  const paragrafo1 = t("bio.paragrafo1");
  const mostre = t("bio.mostre");
  const paragrafo2 = t("bio.paragrafo2");
  const labelNome = t("bio.labelNome");
  const labelEmail = t("bio.labelEmail");
  const labelSubject = t("bio.labelSubject");
  const labelMessage = t("bio.labelMessage");
  const bottoneInvio = t("bio.bottoneInvio");
  const staInviando = t("bio.isSubmitting");
  const Inviato = t("bio.isSent");

  // --- Stato invio form ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xeornkgo", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSent(true);
        form.reset();
        setTimeout(() => setIsSent(false), 4000); // torna "Send message" dopo 4s
      } else {
        alert("Errore durante l'invio. Riprova.");
      }
    } catch (error) {
      alert("Errore di connessione. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
<div className="bg-black text-white min-h-screen flex flex-col md:flex-row font-scritte text-[14px] overflow-hidden pt-8">
  {/* --- IMMAGINE SINISTRA --- */}
  <div className="w-full md:w-1/3 h-[40vh] md:h-full flex justify-center bg-black">
    <img
      src={bioImage}
      alt="Bio"
      className="h-auto w-[65%] object-cover md:h-full"
      loading="lazy"
    />
  </div>

  {/* --- TESTO CENTRALE --- */}
  <div className="w-full md:w-1/3 flex flex-col p-4 md:p-6 text-white font-scritte text-justify text-[14px] whitespace-pre-line">
    <h1 className="md:text-left">Nicole Pagliuca</h1>
    <p className="italic md:text-left">{sottotitolo}</p>

    <p className="mt-4 leading-relaxed text-[14px]">{paragrafo1}</p>
    <p className="mt-4 text-gray-400 leading-relaxed italic">{mostre}</p>

    <p className="text-gray-400 leading-relaxed pl-4 italic mb-4">
      <Trans
        i18nKey="bio.paragrafo2"
        components={{
          20: <a href="https://artisnotdead.it/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
          21: <a href="https://www.fabbricadelvapore.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white" />,
        }}
      />
    </p>

    {/* --- CONTATTI --- */}
    <div className="space-y-2 mt-4 text-gray-200">
      <div className="flex items-center gap-2">
        <img src="/telefono.png" alt="Telefono" className="w-4 h-4" loading="lazy"/>
        <p>+39 345 164 2142</p>
      </div>

      <div className="flex items-center gap-2">
        <img src="/email.png" alt="Email" className="w-4 h-4" loading="lazy"/>
        <p>nicolepagliucaphoto@gmail.com</p>
      </div>

      <div className="flex items-center gap-2">
        <img src="/instagram.png" alt="Instagram" className="w-4 h-4" loading="lazy"/>
        <a
          href="https://instagram.com/nikolephoto_"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          @nikolephoto_
        </a>
      </div>
    </div>
  </div>

  {/* --- FORM CONTATTO DESTRA --- */}
  <div className="w-full md:w-1/3 flex justify-center items-start p-6 md:p-6">
    <div className="border border-white rounded-2xl p-6 bg-black/50 backdrop-blur-sm w-full max-w-sm">
      <h2 className="text-[18px] font-semibold mb-6 text-center">
        • KEEP IN <span className="text-red-600">TOUCH</span> •
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 italic text-gray-400">{labelNome}</label>
            <Input
              name="name"
              required
              className="bg-transparent border border-white text-white text-[14px] rounded-2xl h-8"
            />
          </div>
          <div>
            <label className="block mb-1 italic text-gray-400">{labelEmail}</label>
            <Input
              name="email"
              type="email"
              required
              className="bg-transparent border border-white text-white text-[14px] rounded-2xl h-8"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 italic text-gray-400">{labelSubject}</label>
          <Input
            name="subject"
            className="bg-transparent border border-white text-white text-[14px] rounded-2xl h-8"
          />
        </div>

        <div>
          <label className="block mb-1 italic text-gray-400">{labelMessage}</label>
          <Textarea
            name="message"
            required
            className="bg-transparent border border-white text-white text-[14px] rounded-2xl min-h-[80px]"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || isSent}
            className={`rounded-2xl px-4 py-1 text-[14px] transition-all ${
              isSent
                ? "bg-gray-300 text-black"
                : "bg-white text-black hover:bg-gray-300"
            }`}
          >
            {isSubmitting ? staInviando : isSent ? Inviato : bottoneInvio}
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Bio;
