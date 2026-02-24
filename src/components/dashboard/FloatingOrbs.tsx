import { motion } from "framer-motion";

const orbs = [
  { color: "hsl(221 83% 53% / 0.15)", size: 200, x: "10%", y: "20%", delay: 0 },
  { color: "hsl(263 70% 58% / 0.12)", size: 160, x: "75%", y: "60%", delay: 2 },
  { color: "hsl(174 70% 45% / 0.10)", size: 180, x: "50%", y: "10%", delay: 4 },
  { color: "hsl(38 92% 50% / 0.08)", size: 140, x: "85%", y: "15%", delay: 1 },
  { color: "hsl(292 84% 61% / 0.08)", size: 120, x: "20%", y: "75%", delay: 3 },
];

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            filter: "blur(60px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
