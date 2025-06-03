import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
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

  // Caption animation
  const captionVariants = {
    float: {
      y: [0, -8, 0],
      opacity: [0.8, 1, 0.8],
      transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
    },
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <section
      className="reveal w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 6000)}
    >
      <h2 className="text-2xl sm:text-4xl font-birthday text-glowYellow text-center mb-1 sm:mb-2 ">
        Soliyana’s Spotlight
      </h2>
      <div className="relative flex justify-center items-center overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentImage * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center items-center"
            >
              <motion.img
                src={image.src}
                alt={image.caption}
                className="w-auto max-h-[40vh] sm:max-h-[60vh] object-contain rounded-lg m-2 shadow-neon"
                whileHover={{ scale: 1.03 }}
                onError={(e) => {
                  console.error(`Failed to load image: ${image.src}`);
                  e.target.src = "/assets/images/fallback.jpg";
                }}
              />
            </div>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentImage}
            variants={captionVariants}
            initial="initial"
            animate={["animate", "float"]}
            exit="exit"
            className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 text-[11px] sm:text-xs font-neon text-glowYellow bg-black/60 px-2 sm:px-2.5 py-1 rounded-md shadow-glow break-words max-w-[90%] sm:max-w-[80%]"
          >
            {images[currentImage].caption}
          </motion.p>
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handlePrevious}
          className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 btn-neon p-1 sm:p-1.5 rounded-full"
          aria-label="Previous Image"
        >
          <FaArrowLeft className="text-[10px] sm:text-sm" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleNext}
          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 btn-neon p-1 sm:p-1.5 rounded-full"
          aria-label="Next Image"
        >
          <FaArrowRight className="text-[10px] sm:text-sm" />
        </motion.button>
      </div>
      <div className="flex justify-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full cursor-pointer ${
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
