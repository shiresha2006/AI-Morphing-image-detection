import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp } from 'lucide-react'
import TiltCard from '../3d/TiltCard'
import GlassmorphCard from '../3d/GlassmorphCard'

interface Props {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  delay?: number
}

export default function StatsCard({ title, value, icon: Icon, trend, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <TiltCard>
        <GlassmorphCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">{title}</p>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{value}</p>
            {trend && (
              <p className="text-sm text-green-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{trend}</span>
              </p>
            )}
          </div>
        </GlassmorphCard>
      </TiltCard>
    </motion.div>
  )
}