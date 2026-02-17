import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock } from 'lucide-react'
import FloatingParticles from '../components/3d/FloatingParticles'
import GlassmorphCard from '../components/3d/GlassmorphCard'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple auth - just navigate to dashboard
    // In production, add Supabase auth here
    if (email && password) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-black-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassmorphCard hover={false}>
          <div className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', duration: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-danger to-purple-600 flex items-center justify-center"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white text-center mb-2">MorphGuard AI</h1>
            <p className="text-gray-400 text-center mb-8">Advanced Deepfake Detection</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary focus:outline-none transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary focus:outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all"
              >
                Sign In
              </motion.button>
              
              <p className="text-center text-sm text-gray-400 mt-4">
                Demo: Use any email/password to login
              </p>
            </form>
          </div>
        </GlassmorphCard>
      </motion.div>
    </div>
  )
}