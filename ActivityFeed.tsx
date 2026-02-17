import React from 'react'
import { motion } from 'framer-motion'

const dummy = [
  'User uploaded image',
  'Scan completed - image flagged',
  'New account registered',
]

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      {dummy.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-white/5 rounded-xl flex items-center gap-2"
        >
          <span className="text-gray-400 text-sm">{text}</span>
        </motion.div>
      ))}
    </div>
  )
}
