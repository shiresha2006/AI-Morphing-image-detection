import { motion } from 'framer-motion'

export default function HeatmapOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none bg-gradient-to-t from-danger/20 via-warning/20 to-success/20 mix-blend-overlay"
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
  )
}
