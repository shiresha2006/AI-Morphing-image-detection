import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingParticles from '../components/3d/FloatingParticles'
import StatsCard from '../components/dashboard/StatsCard'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import { Shield, AlertTriangle, CheckCircle, Users, TrendingUp, Activity, Zap, Globe, Clock, Database } from 'lucide-react'
import GlassmorphCard from '../components/3d/GlassmorphCard'
import TiltCard from '../components/3d/TiltCard'
import RealtimeChart from '../components/dashboard/RealtimeChart'
import AgentStatus from '../components/dashboard/AgentStatus'
import SocialMediaIntegration from '../components/dashboard/SocialMediaIntegration'
import ThreatMap from '../components/dashboard/ThreatMap'

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'integrations'>('overview')
  
  const stats = [
    { 
      title: 'Total Scans Today', 
      value: 1247, 
      icon: Shield, 
      trend: '+12.5%',
      change: 156,
      color: 'blue'
    },
    { 
      title: 'Threats Blocked', 
      value: 234, 
      icon: AlertTriangle, 
      trend: '+8.2%',
      change: 18,
      color: 'red'
    },
    { 
      title: 'Images Approved', 
      value: 989, 
      icon: CheckCircle, 
      trend: '+15.3%',
      change: 131,
      color: 'green'
    },
    { 
      title: 'Active Users', 
      value: 156, 
      icon: Users, 
      trend: '+5.1%',
      change: 8,
      color: 'purple'
    },
  ]

  const advancedStats = [
    { label: 'Avg Response Time', value: '847ms', icon: Clock, color: 'text-cyan-400' },
    { label: 'Detection Accuracy', value: '94.2%', icon: Activity, color: 'text-green-400' },
    { label: 'API Uptime', value: '99.8%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Data Processed', value: '1.2TB', icon: Database, color: 'text-purple-400' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-black-bg">
      <FloatingParticles />
      
      <div className="relative z-10 p-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-6xl font-bold gradient-text mb-2">
                  Command Center
                </h1>
                <p className="text-gray-400 text-lg">
                  Real-time deepfake detection & threat monitoring
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/upload')}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 rounded-xl text-white font-bold text-lg shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all flex items-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Scan Image
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-white/5 rounded-xl p-2 backdrop-blur-xl border border-white/10">
              {['overview', 'agents', 'integrations'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <StatsCard key={i} {...stat} delay={i * 0.1} />
                  ))}
                </div>

                {/* Advanced Stats Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassmorphCard>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {advancedStats.map((stat, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-4"
                          >
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                              <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">{stat.label}</p>
                              <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </GlassmorphCard>
                </motion.div>

                {/* Charts & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Real-time Chart */}
                  <div className="lg:col-span-2">
                    <RealtimeChart />
                  </div>

                  {/* Activity Feed */}
                  <div>
                    <GlassmorphCard>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-primary" />
                          Live Activity
                        </h3>
                        <ActivityFeed />
                      </div>
                    </GlassmorphCard>
                  </div>
                </div>

                {/* Threat Map */}
                <ThreatMap />
              </motion.div>
            )}

            {activeTab === 'agents' && (
              <motion.div
                key="agents"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <AgentStatus />
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <SocialMediaIntegration />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}