import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import GlassmorphCard from '../3d/GlassmorphCard'
import { TrendingUp } from 'lucide-react'

export default function RealtimeChart() {
  const [data, setData] = useState<number[]>(Array(20).fill(0).map(() => Math.random() * 100))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), Math.random() * 100])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const maxValue = Math.max(...data)

  return (
    <GlassmorphCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Real-Time Detection Activity
            </h3>
            <p className="text-sm text-gray-400 mt-1">Live monitoring of scan requests</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>

        <div className="h-64 flex items-end gap-2">
          {data.map((value, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-purple-600 rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span>20s ago</span>
          <span>Now</span>
        </div>
      </div>
    </GlassmorphCard>
  )
}