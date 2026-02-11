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
        className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-[0.03]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* Bottom-left texture */}
      <motion.img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-[0.03]"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
