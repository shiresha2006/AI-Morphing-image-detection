import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  score: number
  label: string
  color: 'danger' | 'warning' | 'success'
}

const colorMap = {
  danger: '#ff0050',
  warning: '#ff9500',
  success: '#00ff88'
}

export default function ScoreRing({ score, label, color }: Props) {
  const [displayScore, setDisplayScore] = useState(0)
  const radius = 60
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={colorMap[color]}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (displayScore / 100) * circumference }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeDasharray={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            {Math.round(displayScore)}%
          </motion.span>
        </div>
      </div>
      <p className="mt-4 text-gray-400 font-medium">{label}</p>
    </div>
  )
}
