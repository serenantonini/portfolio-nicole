import Layout from "@/components/Layout";
import sfondo from "@/assets/sfondo4.jpeg"; // importa l'immagine

const Home = () => {
  return (
    <Layout className="pt-0">
      <div
        className="h-screen w-full relative bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${sfondo})` }} // usa l'immagine come sfondo
      >
        
      </div>
    </Layout>
  );
};

export default Home;

