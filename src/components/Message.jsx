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
      particleCount: 40,
      spread: 50,
      origin: { y: 0.4 },
      colors: ["#ff2d55", "#00f0ff", "#f4e285"],
    });
  };

  const emojiVariants = {
    bounce: (i) => ({
      y: [0, -6, 0],
      rotate: [0, i % 2 === 0 ? 8 : -8, 0],
      transition: {
        y: { repeat: Infinity, duration: 1, delay: i * 0.15 },
        rotate: { repeat: Infinity, duration: 1, delay: i * 0.15 },
      },
    }),
  };

  return (
    <section className="reveal w-full">
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg sm:text-4xl font-birthday text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonBlue mb-1 sm:mb-2 text-center"
      >
        A Special Note
      </motion.h2>
      <Tilt
        className="tilt-card p-2 sm:p-3"
        options={{ max: 15, speed: 400, glare: true, "glare-prerender": true }}
      >
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 0 10px #00f0ff" }}
          className="text-center"
        >
          <p className="text-[11px] sm:text-sm font-sans text-glowYellow bg-black/50 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md break-words">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
          <p className="mt-1 sm:mt-1.5 text-neonBlue font-neon text-[12px] sm:text-[16px]">
            {timeLeft}
          </p>
          <div className="mt-1.5 sm:mt-2 flex justify-center gap-1.5 sm:gap-2">
            <motion.span
              custom={0}
              variants={emojiVariants}
              animate="bounce"
              className="text-base sm:text-lg"
            >
              🎉
            </motion.span>
            <motion.span
              custom={1}
              variants={emojiVariants}
              animate="bounce"
              className="text-base sm:text-lg"
            >
              🎂
            </motion.span>
            <motion.span
              custom={2}
              variants={emojiVariants}
              animate="bounce"
              className="text-base sm:text-lg"
            >
              🎈
            </motion.span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHeartClick}
            onTouchStart={() => {}}
            className="mt-1.5 sm:mt-2 btn-neon text-[10px] sm:text-xs flex items-center gap-1 sm:gap-1.5 mx-auto px-2 sm:px-3 py-0.5 sm:py-1 rounded-md"
            aria-label="Send Love"
          >
            <FaHeart className="text-neonPink text-[18px] sm:text-xl" /> Send
            Love
          </motion.button>
        </motion.div>
      </Tilt>
    </section>
  );
}

export default Message;
