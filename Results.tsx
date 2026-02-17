import { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import DecisionBadge from '../components/results/DecisionBadge'
import ScoreRing from '../components/results/ScoreRing'
import HeatmapOverlay from '../components/results/HeatmapOverlay'
import GlassmorphCard from '../components/3d/GlassmorphCard'

export default function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const state = location.state as any
  const result = state?.result?.data || state?.result
  const imageUrl = state?.imageUrl || '/placeholder.png'

  const decision: 'BLOCKED' | 'FLAGGED' | 'ALLOWED' = result?.decision || 'ALLOWED'
  const morphing = result?.morphing_score || 0
  const deepfake = result?.deepfake_score || 0
  const confidence = result?.confidence || 0
  const reasons: string[] = result?.reasons || ['No data available']

  useEffect(() => {
    if (!id) navigate('/upload')
  }, [id, navigate])

  return (
    <div className="min-h-screen bg-black-bg p-8 relative overflow-hidden">
      <HeatmapOverlay />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Decision Badge */}
        <div className="flex justify-center">
          <DecisionBadge decision={decision} />
        </div>

        {/* Score Rings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-8 justify-center"
        >
          <ScoreRing score={morphing} label="Morphing Detection" color="warning" />
          <ScoreRing score={deepfake} label="Deepfake Detection" color="danger" />
          <ScoreRing score={confidence} label="Overall Confidence" color="success" />
        </motion.div>

        {/* Image Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlassmorphCard hover={false}>
            <img 
              src={imageUrl} 
              alt="analyzed" 
              className="w-full h-96 object-cover rounded-2xl" 
            />
          </GlassmorphCard>
        </motion.div>

        {/* Detailed Findings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassmorphCard hover={false}>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Detailed Findings</h3>
              <ul className="space-y-2">
                {reasons.map((reason, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-danger mt-1">•</span>
                    <span>{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </GlassmorphCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center"
        >
          <button 
            onClick={() => navigate('/upload')}
            className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Analyze Another Image
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  )
}