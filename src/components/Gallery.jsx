import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Gallery() {
  const images = [
    { src: "images/soli1.jpg", caption: "Shining Bright!" },
    { src: "images/soli2.jpg", caption: "Best Sister Ever!" },
    { src: "images/soli3.jpg", caption: "Party Queen!" },
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => clearInterval(autoScrollRef.current);
  }, [isPaused, images.length]);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const captionVariants = {
    float: {
      y: [0, -8, 0],
      opacity: [0.8, 1, 0.8],
      transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
    },
  };

  return (
    <section
      className="reveal"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 6000)}
    >
      <h2 className="text-2xl sm:text-4xl font-birthday text-glowYellow text-center mb-2 sm:mb-3 ">
        Soliyana’s Spotlight
      </h2>
      <div className="relative flex justify-center items-center">
        <motion.img
          key={currentImage}
          src={images[currentImage].src}
          alt={images[currentImage].caption}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          className="w-auto max-h-[60vh] sm:max-h-[50vh] object-contain rounded-lg shadow-neon"
          whileHover={{ scale: 1.03 }}
          onError={(e) => {
            console.error(`Failed to load image: ${images[currentImage].src}`);
            e.target.src = "/assets/images/fallback.jpg";
          }}
        />
        <motion.p
          variants={captionVariants}
          animate="float"
          className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-neon text-glowYellow bg-black/60 px-2 sm:px-3 py-1 rounded-md shadow-glow break-words max-w-[90%] sm:max-w-[80%]"
        >
          {images[currentImage].caption}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handlePrevious}
          className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 btn-neon p-1 sm:p-2"
          aria-label="Previous Image"
        >
          <FaArrowLeft className="text-sm sm:text-base" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleNext}
          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 btn-neon p-1 sm:p-2"
          aria-label="Next Image"
        >
          <FaArrowRight className="text-sm sm:text-base" />
        </motion.button>
      </div>
      <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full cursor-pointer ${
              index === currentImage ? "bg-neonPink" : "bg-white/40"
            }`}
            whileHover={{ scale: 1.3 }}
            onClick={() => {
              setCurrentImage(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 6000);
            }}
          ></motion.div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
