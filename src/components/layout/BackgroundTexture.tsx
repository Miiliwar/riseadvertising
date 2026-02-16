import { motion } from "framer-motion";
import textureBg from "@/assets/rise-texture-bg.png";

export function BackgroundTexture() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top-right texture */}
      <motion.img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-[0.06] dark:opacity-[0.04]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* Bottom-left texture */}
      <motion.img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-28 -left-28 w-[500px] h-[500px] opacity-[0.06] dark:opacity-[0.04]"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      {/* Center-right subtle */}
      <motion.img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 -right-40 w-[350px] h-[350px] opacity-[0.04] dark:opacity-[0.03]"
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
