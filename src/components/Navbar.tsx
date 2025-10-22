import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: t("projects"), path: "/progetti" },
    { name: t("works"), path: "/opere" },
    { name: t("bio"), path: "/bio" },
    { name: t("downloadPortfolio"), path: "/scarica" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const otherLanguage = i18n.language === "it" ? "en" : "it";
  const otherLanguageFlag = i18n.language ==="it" ? "en" : "it";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/50 backdrop-blur-sm">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            <span className="text-red-600">Tau</span>
            <span className="text-white">nik</span>{" "}

            <span className="text-white">Photo</span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-6 font-scritte">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm rounded-full transition-all duration-300 font-scritte",
                  location.pathname === item.path
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Lingua desktop */}
            <button
              onClick={() => changeLanguage(otherLanguage)}
              className="text-white px-3 py-2 rounded-full hover:bg-white hover:text-black transition-all font-scritte"
            >
              {otherLanguageFlag}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4 font-scritte">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 font-scritte",
                  location.pathname === item.path
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Lingua mobile elegante */}
            <button
              onClick={() => {
                changeLanguage(otherLanguage);
                setIsOpen(false);
              }}
              className="text-sm font-scritte px-4 py-2 rounded-full transition-all duration-300 text-white hover:bg-white hover:text-black"
            >
              {otherLanguageFlag}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
