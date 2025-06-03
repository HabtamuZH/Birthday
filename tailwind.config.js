/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonPink: "#ff2d55", // Vibrant pink for buttons and highlights
        neonBlue: "#00f0ff", // Electric blue for accents
        neonPurple: "#8b00ff", // Party purple for backgrounds
        glowYellow: "#f4e285", // Glowing yellow for text
      },
      fontFamily: {
        birthday: ['"Dancing Script"', "cursive"],
        neon: ['"Orbitron"', "sans-serif"],
        sans: ['"Poppins"', "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 10px #ff2d55, 0 0 20px #ff2d55, 0 0 30px #00f0ff",
        glow: "0 0 15px #f4e285, 0 0 25px #f4e285",
      },
      animation: {
        pulseGlow: "pulseGlow 1.5s ease-in-out infinite",
        bounceIn: "bounceIn 0.6s ease-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px #ff2d55, 0 0 20px #ff2d55" },
          "50%": { boxShadow: "0 0 20px #00f0ff, 0 0 30px #00f0ff" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "60%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
