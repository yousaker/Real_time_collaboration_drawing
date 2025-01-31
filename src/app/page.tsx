import ClientCanvas from "@/components/canvas/ClientCanvas";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold mt-20 mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Bienvenue sur MyApp
      </h1>
      <p className="text-xl text-gray-300 mb-12">
        Découvrez une expérience unique et moderne
      </p>
      <ClientCanvas />
    </div>
  );
}