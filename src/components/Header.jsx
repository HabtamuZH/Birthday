import { motion } from "framer-motion";
import { FaGift, FaBirthdayCake } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import confetti from "canvas-confetti";

function Header() {
  const balloonVariants = {
    float: {
      y: [0, -15, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  const handleIconClick = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.4 },
      colors: ["#ff2d55", "#00f0ff", "#f4e285"],
    });
  };

  return (
    <header className="relative bg-gradient-to-r from-neonPink to-neonBlue py-6 sm:py-8 text-center reveal overflow-hidden">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-birthday text-white drop-shadow-lg shadow-glow"
      >
        Happy Birthday, Soliyana!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-2 text-sm sm:text-lg md:text-sm font-medium text-white"
      >
        Let’s Celebrate Your Special Day!
      </motion.p>
      <div className="flex justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
        <motion.div
          variants={balloonVariants}
          animate="float"
          onClick={handleIconClick}
          className="cursor-pointer"
        >
          <FaBirthdayCake className="text-2xl sm:text-3xl text-green-500 hover:text-gray-100 transition" />
        </motion.div>
        <motion.div
          variants={balloonVariants}
          animate="float"
          onClick={handleIconClick}
          className="cursor-pointer"
        >
          <FaGift className="text-2xl sm:text-3xl text-yellow-500 hover:text-gray-100 transition" />
        </motion.div>
        <motion.div
          variants={balloonVariants}
          animate="float"
          onClick={handleIconClick}
          className="cursor-pointer"
        >
          <FiGift className="text-2xl sm:text-3xl text-red-500 hover:text-gray-100 transition" />
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
