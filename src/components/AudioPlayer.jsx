import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
} from "react-icons/fa";

function AudioPlayer() {
  const songs = [
    { title: "Happy Birthday", src: "songs/music1.mp3" },
    { title: "Sweet Birthday", src: "songs/music2.mp3" },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(songs[0].src));

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].src;
    audioRef.current.volume = volume;
    if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    const updateProgress = () => {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    };
    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () => {
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentSongIndex, volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <section className="reveal">
      <h2 className="text-2xl sm:text-4xl font-birthday text-glowYellow mb-2 sm:mb-3 text-center">
        Party Playlist
      </h2>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-neon w-full"
      >
        <p className="text-xs sm:text-sm font-neon text-glowYellow mb-2 text-center">
          {songs[currentSongIndex].title}
        </p>
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 sm:h-2 bg-neonBlue rounded-lg appearance-none cursor-pointer mb-2 sm:mb-3"
          aria-label="Song Progress"
        />
        <div className="flex justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handlePrevious}
            className="btn-neon p-1 sm:p-2"
            aria-label="Previous Song"
          >
            <FaBackward className="text-sm sm:text-base" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={togglePlay}
            className="btn-neon p-1 sm:p-2"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <FaPause className="text-sm sm:text-base" />
            ) : (
              <FaPlay className="text-sm sm:text-base" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleNext}
            className="btn-neon p-1 sm:p-2"
            aria-label="Next Song"
          >
            <FaForward className="text-sm sm:text-base" />
          </motion.button>
        </div>
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <FaVolumeUp className="text-neonPink text-sm sm:text-base" />
          <input
            type="range"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-16 sm:w-20 h-1 sm:h-2 bg-neonBlue rounded-lg appearance-none cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default AudioPlayer;
