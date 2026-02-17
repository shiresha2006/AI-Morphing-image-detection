import { motion } from 'framer-motion'
import GlassmorphCard from '../3d/GlassmorphCard'
import { Globe, MapPin } from 'lucide-react'

export default function ThreatMap() {
  const threats = [
    { location: 'New York, US', count: 23, severity: 'high' },
    { location: 'London, UK', count: 15, severity: 'medium' },
    { location: 'Tokyo, Japan', count: 8, severity: 'low' },
    { location: 'Mumbai, India', count: 31, severity: 'high' },
    { location: 'Berlin, Germany', count: 12, severity: 'medium' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <GlassmorphCard>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Global Threat Detection
          </h3>
          <div className="space-y-3">
            {threats.map((threat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${
                    threat.severity === 'high' ? 'text-red-400' :
                    threat.severity === 'medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`} />
                  <span className="text-white font-medium">{threat.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{threat.count} threats</span>
                  <div className={`w-2 h-2 rounded-full ${
                    threat.severity === 'high' ? 'bg-red-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  } animate-pulse`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassmorphCard>
    </motion.div>
  )
}