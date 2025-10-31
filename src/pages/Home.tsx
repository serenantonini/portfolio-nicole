import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import sfondo from "@/assets/sfondo4.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/progetti");
  };

  return (
    <Layout className="pt-0">
      <div
        onClick={handleClick}
        className="w-full flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-73px-56px)] cursor-pointer "
        style={{
          backgroundImage: `url(${sfondo})`,
        }}
      >
        {/* eventuale contenuto sopra l'immagine */}
      </div>
    </Layout>
  );
};

export default Home;
