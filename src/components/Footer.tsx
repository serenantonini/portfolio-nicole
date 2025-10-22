const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-3 w-full border-t border-gray-400 relative z-50">
      <div className="flex justify-between items-center px-4">

        {/* Sinistra: Copyright */}
        <div className="text-gray-400 font-scritte text-[14px]">
          © 2025 Nicole Pagliuca <br />
          All rights reserved.
        </div> 

        {/* Destra: Website designer */}
        <div className="text-gray-400 font-scritte text-[14px] text-right">
          Website designer<br />
          <a
            href="https://serenantonini.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Serena Antonini
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
