import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

interface Step {
  id: string
  title: string
  status: 'pending' | 'processing' | 'complete'
}

interface Props {
  steps: Step[]
  progress: number
}

export default function AnalysisLoader({ steps, progress }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center">
      <div className="max-w-2xl w-full px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          ANALYZING IMAGE...
        </motion.h2>

        {/* Progress bar */}
        <div className="mb-12 h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-danger"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Percentage */}
        <div className="text-center mb-8">
          <motion.span 
            className="text-6xl font-bold text-white"
            key={Math.round(progress)}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                step.status === 'processing' 
                  ? 'bg-primary/20 border-2 border-primary scale-105' 
                  : step.status === 'complete'
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-white/5 border border-white/10'
              }`}
            >
              {/* Icon */}
              <div className="w-6 h-6 flex items-center justify-center">
                {step.status === 'complete' && (
                  <Check className="w-6 h-6 text-green-500" />
                )}
                {step.status === 'processing' && (
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                )}
                {step.status === 'pending' && (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-500" />
                )}
              </div>
              
              {/* Text */}
              <span className={`font-medium ${
                step.status === 'complete' ? 'text-green-400' :
                step.status === 'processing' ? 'text-primary' :
                'text-gray-400'
              }`}>
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}