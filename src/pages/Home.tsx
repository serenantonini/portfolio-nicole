import Layout from "@/components/Layout";
import sfondo from "@/assets/sfondo4.jpeg";

const Home = () => {
  return (
    <Layout className="pt-0">
      <div
        className="w-full flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-73px-56px)]"
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
