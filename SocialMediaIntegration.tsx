import { motion } from 'framer-motion'
import { useState } from 'react'
import GlassmorphCard from '../3d/GlassmorphCard'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, CheckCircle, XCircle, Settings, ExternalLink, Shield, AlertTriangle } from 'lucide-react'

interface Platform {
  name: string
  icon: any
  connected: boolean
  status: 'active' | 'inactive' | 'pending'
  stats: {
    postsScanned: number
    threatsBlocked: number
    lastScan: string
  }
  color: string
}

export default function SocialMediaIntegration() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      name: 'Instagram',
      icon: Instagram,
      connected: true,
      status: 'active',
      stats: { postsScanned: 1247, threatsBlocked: 34, lastScan: '2 min ago' },
      color: 'from-pink-500 to-purple-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      connected: true,
      status: 'active',
      stats: { postsScanned: 892, threatsBlocked: 21, lastScan: '5 min ago' },
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      connected: false,
      status: 'inactive',
      stats: { postsScanned: 0, threatsBlocked: 0, lastScan: 'Never' },
      color: 'from-sky-400 to-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      connected: true,
      status: 'pending',
      stats: { postsScanned: 456, threatsBlocked: 12, lastScan: '1 hour ago' },
      color: 'from-blue-700 to-blue-900'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      connected: false,
      status: 'inactive',
      stats: { postsScanned: 0, threatsBlocked: 0, lastScan: 'Never' },
      color: 'from-red-600 to-red-800'
    },
  ])

  const handleConnect = (platformName: string) => {
    // Simulate connection (UI only)
    setPlatforms(platforms.map(p => 
      p.name === platformName 
        ? { ...p, connected: !p.connected, status: !p.connected ? 'active' : 'inactive' }
        : p
    ))
  }

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
                <h2 className="text-3xl font-bold text-white mb-2">Social Media Protection</h2>
                <p className="text-gray-400">Connect your accounts to automatically scan and block deepfakes before posting</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Protection</p>
                  <p className="text-2xl font-bold text-green-400">
                    {platforms.filter(p => p.connected).length}/{platforms.length} Platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphCard>
      </motion.div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform, i) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassmorphCard>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                      <platform.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {platform.connected ? (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle className="w-3 h-3" />
                            Connected
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <XCircle className="w-3 h-3" />
                            Not Connected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {platform.status === 'active' && (
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Stats */}
                {platform.connected && (
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Posts Scanned</span>
                      <span className="text-lg font-bold text-white">{platform.stats.postsScanned}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Threats Blocked</span>
                      <span className="text-lg font-bold text-red-400">{platform.stats.threatsBlocked}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Last Scan</span>
                      <span className="text-sm text-gray-300">{platform.stats.lastScan}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {platform.connected ? (
                    <>
                      <button
                        onClick={() => handleConnect(platform.name)}
                        className="flex-1 px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-medium hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Disconnect
                      </button>
                      <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        <Settings className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnect(platform.name)}
                      className={`flex-1 px-4 py-3 bg-gradient-to-r ${platform.color} rounded-lg text-white font-bold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Connect {platform.name}
                    </button>
                  )}
                </div>
              </div>
            </GlassmorphCard>
          </motion.div>
        ))}
      </div>

      {/* Auto-Post Protection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassmorphCard>
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Auto-Protection Enabled</h3>
                <p className="text-gray-400 mb-4">
                  All connected platforms are monitored in real-time. Any attempt to post deepfake or morphed content will be automatically blocked before publication.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Pre-upload scanning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Real-time detection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Zero false posting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Privacy protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphCard>
      </motion.div>

      {/* Recent Blocks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <GlassmorphCard>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Recent Blocked Attempts
            </h3>
            <div className="space-y-3">
              {[
                { platform: 'Instagram', user: '@john_doe', time: '2 min ago', reason: 'Morphed face detected (92%)' },
                { platform: 'Facebook', user: 'Sarah Miller', time: '15 min ago', reason: 'Deepfake signature found (87%)' },
                { platform: 'LinkedIn', user: 'Mike Johnson', time: '1 hour ago', reason: 'Celebrity face morphing (94%)' },
              ].map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-white">{block.platform} - {block.user}</p>
                    <p className="text-sm text-red-400">{block.reason}</p>
                  </div>
                  <span className="text-xs text-gray-400">{block.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassmorphCard>
      </motion.div>
    </div>
  )
}