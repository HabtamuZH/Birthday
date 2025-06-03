import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-neonPink/50 py-3 sm:py-4 text-center reveal"
    >
      <p className="text-xs sm:text-sm font-neon text-white">
        Crafted with ❤️ by Habtamu for Soliyana’s Epic Birthday | © 2025
      </p>
    </motion.footer>
  );
}

export default Footer;
