import { motion } from "framer-motion";

export default function AppLoading() {
  return (
    <div
      className="
        relative
        flex
        h-screen
        w-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-cyan-100
        via-blue-200
        to-blue-500
      "
    >
      {/* Background glow lớn */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-[600px]
          w-[600px]
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      {/* Vòng sáng ngoài */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
          border-2
          border-white/20
        "
      />

      {/* Vòng dashed */}
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          border-[3px]
          border-dashed
          border-cyan-100/40
        "
      />

      {/* Particle glow */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[340px] w-[340px]"
      >
        <div className="absolute left-0 top-1/2 h-5 w-5 rounded-full bg-white shadow-[0_0_40px_15px_rgba(255,255,255,0.9)]" />
      </motion.div>

      {/* Logo rồng */}
      <motion.img
        src="/logo.png"
        alt="Dragon Logo"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.03, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          z-10
          h-[320px]
          w-[320px]
          object-contain
          drop-shadow-[0_0_60px_rgba(255,255,255,0.9)]
        "
      />

      {/* Text loading */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-24
          text-2xl
          font-semibold
          tracking-[0.3em]
          text-white
        "
      >
        LOADING...
      </motion.div>
    </div>
  );
}