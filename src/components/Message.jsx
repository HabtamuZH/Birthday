import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-vanilla-tilt";
import confetti from "canvas-confetti";
import { FaHeart } from "react-icons/fa";

function Message() {
  const [timeLeft, setTimeLeft] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const fullText =
    "Soliyana, you’re our shining star! Your laughter and kindness light up every moment. Here’s to a birthday full of joy! 🎉 From your brother Habtamu & the crew!";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextBirthday = new Date(now.getFullYear() + 1, 5, 3); // June 3
      const diff = nextBirthday - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${days}d ${hours}h ${minutes}m until next birthday!`);
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleHeartClick = () => {
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.4 },
      colors: ["#333", "#00f0ff", "#f4e4bc"],
    });
  };

  const emojiVariants = {
    bounce: (i) => ({
      y: [0, -8, 0],
      rotate: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        y: { repeat: Infinity, duration: 1.2, delay: i * 0.2 },
        rotate: { repeat: Infinity, duration: 1.2, delay: i * 0.2 },
      },
    }),
  };

  return (
    <section className="reveal">
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-4xl font-birthday text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonBlue mb-2 sm:mb-3 text-center"
      >
        A Special Note
      </motion.h2>
      <Tilt
        className="tilt-card p-3 sm:p-4"
        options={{ max: 20, speed: 400, glare: true, "glare-prerender": true }}
      >
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 15px #00f0ff" }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm font-sans text-glowYellow bg-black/40 px-2 sm:px-3 py-1 sm:py-2 rounded-lg break-words">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
          <p className="mt-1 sm:mt-2 text-neonBlue font-neon text-[10px] sm:text-xs">
            {timeLeft}
          </p>
          <div className="mt-2 sm:mt-3 flex justify-center gap-2 sm:gap-3">
            <motion.span
              custom={0}
              variants={emojiVariants}
              animate="bounce"
              className="text-lg sm:text-xl"
            >
              🎉
            </motion.span>
            <motion.span
              custom={1}
              variants={emojiVariants}
              animate="bounce"
              className="text-lg sm:text-xl"
            >
              🎂
            </motion.span>
            <motion.span
              custom={2}
              variants={emojiVariants}
              animate="bounce"
              className="text-lg sm:text-xl"
            >
              🎈
            </motion.span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
            className="mt-2 sm:mt-3 btn-neon text-xs sm:text-sm flex items-center gap-1 sm:gap-2 mx-auto px-3 sm:px-4 py-1 sm:py-2"
            aria-label="Send Love"
          >
            <FaHeart className="text-neonPink text-sm sm:text-base" /> Send Love
          </motion.button>
        </motion.div>
      </Tilt>
    </section>
  );
}

export default Message;
