import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react'

interface Props {
  decision: 'BLOCKED' | 'FLAGGED' | 'ALLOWED'
}

export default function DecisionBadge({ decision }: Props) {
  const configs = {
    BLOCKED: {
      icon: Shield,
      text: 'UPLOAD BLOCKED',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500',
      textColor: 'text-red-500',
      iconColor: 'text-red-500',
      shadow: 'shadow-red-500/50'
    },
    FLAGGED: {
      icon: AlertTriangle,
      text: 'REQUIRES REVIEW',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-500',
      iconColor: 'text-orange-500',
      shadow: 'shadow-orange-500/50'
    },
    ALLOWED: {
      icon: CheckCircle,
      text: 'UPLOAD APPROVED',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500',
      textColor: 'text-green-500',
      iconColor: 'text-green-500',
      shadow: 'shadow-green-500/50'
    }
  }

  const config = configs[decision]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.8 }}
      className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${config.bgColor} border-2 ${config.borderColor} ${config.shadow} animate-glow`}
    >
      <Icon className={`w-8 h-8 ${config.iconColor}`} />
      <span className={`text-2xl font-bold ${config.textColor}`}>{config.text}</span>
    </motion.div>
  )
}