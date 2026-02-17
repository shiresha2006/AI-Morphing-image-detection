import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import GlassmorphCard from '../3d/GlassmorphCard'
import { Brain, Eye, Shield, Search, Zap, Activity, CheckCircle, Loader2 } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'processing' | 'idle'
  icon: any
  color: string
  metrics: {
    tasksCompleted: number
    accuracy: number
    avgTime: string
  }
  currentTask?: string
  progress?: number
}

export default function AgentStatus() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Visual Analyzer',
      role: 'Analyzes image pixels and detects visual artifacts',
      status: 'processing',
      icon: Eye,
      color: 'from-blue-500 to-cyan-600',
      metrics: { tasksCompleted: 1247, accuracy: 94.2, avgTime: '234ms' },
      currentTask: 'Analyzing facial symmetry patterns',
      progress: 67
    },
    {
      id: '2',
      name: 'Metadata Inspector',
      role: 'Examines EXIF data and compression artifacts',
      status: 'active',
      icon: Search,
      color: 'from-purple-500 to-pink-600',
      metrics: { tasksCompleted: 1198, accuracy: 91.8, avgTime: '145ms' },
      currentTask: 'Checking camera fingerprints',
      progress: 43
    },
    {
      id: '3',
      name: 'Pattern Recognition',
      role: 'Identifies manipulation patterns using ML',
      status: 'idle',
      icon: Brain,
      color: 'from-green-500 to-emerald-600',
      metrics: { tasksCompleted: 1156, accuracy: 96.5, avgTime: '567ms' }
    },
    {
      id: '4',
      name: 'Decision Maker',
      role: 'Combines all agent reports and makes final call',
      status: 'active',
      icon: Shield,
      color: 'from-orange-500 to-red-600',
      metrics: { tasksCompleted: 1247, accuracy: 98.1, avgTime: '89ms' },
      currentTask: 'Aggregating detection results',
      progress: 89
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'processing' && agent.progress) {
          const newProgress = agent.progress + Math.random() * 10
          if (newProgress >= 100) {
            return { ...agent, status: 'idle', progress: undefined, currentTask: undefined }
          }
          return { ...agent, progress: Math.min(newProgress, 100) }
        }
        return agent
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassmorphCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">AI Agent Network</h2>
                <p className="text-gray-400">Multi-agent system working together for comprehensive detection</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">System Health</p>
                  <p className="text-2xl font-bold text-green-400 flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Optimal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphCard>
      </motion.div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassmorphCard>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                      <agent.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{agent.role}</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    {agent.status === 'processing' && (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    )}
                    {agent.status === 'active' && (
                      <Zap className="w-5 h-5 text-yellow-400" />
                    )}
                    {agent.status === 'idle' && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    <span className={`text-sm font-medium capitalize ${
                      agent.status === 'processing' ? 'text-primary' :
                      agent.status === 'active' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>

                {/* Current Task */}
                {agent.currentTask && (
                  <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-sm text-gray-400 mb-2">Current Task:</p>
                    <p className="text-white font-medium mb-3">{agent.currentTask}</p>
                    {agent.progress !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-bold">{Math.round(agent.progress)}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${agent.color}`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${agent.progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Tasks</p>
                    <p className="text-lg font-bold text-white">{agent.metrics.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Accuracy</p>
                    <p className="text-lg font-bold text-green-400">{agent.metrics.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Avg Time</p>
                    <p className="text-lg font-bold text-cyan-400">{agent.metrics.avgTime}</p>
                  </div>
                </div>
              </div>
            </GlassmorphCard>
          </motion.div>
        ))}
      </div>

      {/* Agent Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassmorphCard>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Detection Workflow</h3>
            <div className="flex items-center justify-between">
              {agents.map((agent, i) => (
                <div key={agent.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">{agent.name.split(' ')[0]}</p>
                  </div>
                  {i < agents.length - 1 && (
                    <div className="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </GlassmorphCard>
      </motion.div>
    </div>
  )
}