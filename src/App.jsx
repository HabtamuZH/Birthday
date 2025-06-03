import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "scrollreveal";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
import Header from "./components/Header";
import Message from "./components/Message";
import Gallery from "./components/Gallery";
import AudioPlayer from "./components/AudioPlayer";
import Footer from "./components/Footer";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    const sr = ScrollReveal({
      origin: "top",
      distance: "30px",
      duration: 800,
      delay: 200,
      reset: false,
    });
    sr.reveal(".reveal", { interval: 200 });

    const handleClick = () => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff2d55", "#00f0ff", "#f4e285"],
      });
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-neonPurple via-black to-neonBlue">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={100}
        colors={["#ff2d55", "#00f0ff", "#f4e285", "#8b00ff"]}
      />
      <Header />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center my-4 sm:my-6 reveal"
        >
          <h2 className="text-2xl sm:text-3xl font-neon text-glowYellow">
            Soliyana is{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-neonPink"
            >
              21
            </motion.span>{" "}
            Today!
          </h2>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-start reveal">
          <div className="w-full md:w-1/3">
            <Message />
          </div>
          <div className="w-full md:w-1/3">
            <Gallery />
          </div>
          <div className="w-full md:w-1/3">
            <AudioPlayer />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
