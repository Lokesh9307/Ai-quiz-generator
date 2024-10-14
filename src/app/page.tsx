import Image from "next/image";
import QuizGenerator from "./components/QuizGenerator";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <section className="p-3 relative">
        <h1 className="flex items-center justify-center md:text-5xl text-2xl font-extrabold bg-gradient-text">Quizify.AI</h1>
        <h4 className="text-center md:text-2xl text-md">✦ An AI powered quiz Generator ✦</h4>
        <QuizGenerator />   
          <Footer />
      </section>
    </>
  );
}
