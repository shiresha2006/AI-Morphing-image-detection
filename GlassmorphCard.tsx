import React from 'react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassmorphCard({ children, className = '', hover = true }: Props) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-2xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
